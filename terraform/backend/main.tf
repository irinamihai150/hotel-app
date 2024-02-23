
provider "aws" {
  region = var.aws_region
}

resource "aws_instance" "terraform_instance" {
  ami           = "ami-0905a3c97561e0b69"
  instance_type = "t2.micro"
  key_name      = "keyterraform"
  security_groups = [aws_security_group.mysecuritygroup.name]

  tags = {
    Name = "terraform_instance"
  }
}
#create a vpc and setting the cidr block of vpc
resource "aws_vpc" "my_vpc" {
  cidr_block = var.vpc_cidr_block
  enable_dns_hostnames = true

  tags= {
    Name ="connection_vpc_tag"
  }
  
}
#create an internet gateway and attach to the vpc
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.my_vpc.id
}
#create a group of public subnets
resource "aws_subnet" "my_rds_subnet" {
  count =var.subnet_count.public
  vpc_id = aws_vpc.my_vpc.id
  cidr_block = var.public_subnet_cidr_block[count.index]
  tags={
    Name="public subnet"
  }
}
#create a group of private subnet
resource "aws_subnet" "my_private_subnet" {
  count =var.subnet_count.private
  vpc_id = aws_vpc.my_vpc.id
  cidr_block = var.private_subnet_cidr_block[count.index]
  tags= {
    Name="my_privatesubnet_tag"
  }
}
#creating the route table
resource "aws_route_table" "my_route_table" {
  #put the route table in vpc
  vpc_id = aws_vpc.my_vpc.id
  #acces to internet
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }
}
#add the public subnets to the public route table
resource "aws_route_table_association" "public" {
  count = var.subnet_count.public
  route_table_id= aws_route_table.my_route_table.id
  subnet_id = aws_subnet.my_rds_subnet[count.index].id
  }
  #create private route
  resource "aws_route_table" "private_rt" {
    vpc_id = aws_vpc.my_vpc.id
  }
  resource "aws_route_table_association" "private" {
    count = var.subnet_count.private
    route_table_id = aws_route_table.private_rt.id
    subnet_id= aws_subnet.my_private_subnet[count.index].id
  }

resource "aws_security_group" "mysecuritygroup" {
  name        = "my-security-group"
  description = "Allow SSH, HTTP, HTTPS, and custom traffic inbound"
  vpc_id = aws_vpc.my_vpc.id
  // Inbound rule for SSH (port 22)
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  // Inbound rule for HTTP (port 80)
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  // Inbound rule for HTTPS (port 443)
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  // Inbound rule for custom port 5000
  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  // Inbound rule for custom port 3000
  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  // Inbound rule for custom port 5432
  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"

  }

  // Outbound rule (allow all traffic)
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags={
    Name="my_securit_group_tag"
  }
}

resource "aws_key_pair" "deployer" {
  key_name   = "keyterraform"
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQClTo9lz+28YjAefUeSLOB2dTLpn68jm+0rqGPbDDRshHSArah6SyQNK2ZkkpO/9BgJuu7ngeYS/1VEX61gLC/q3amooqAqmQTyMktoWsUzhJTkEVn5D7Be0jNfrmsbW5WbxyWKR0FrIwhylv3O5UyHn9uH/SYeYylvxaVl9A2opePSdzqpB0g8b1sfT6sQs/mcrQOVMdy3Djkzgr7NpBVHZq/nrmor2A9QOIP/5mW1r8BtUw8kMMC20nffqkwdFYPPI/HgUb1P1Ux1Lg1XeX2xuHPlfXX5h9keUCwWicTI3GmK4p4ouv2fEz7pDSLDbbLXcaKP7WTp7DtnWzjmuPgn irina@Irina-pc"
}


output "public_ip" {
  value       = aws_instance.terraform_instance.public_ip
  description = "The public IP address of the instance"
}

