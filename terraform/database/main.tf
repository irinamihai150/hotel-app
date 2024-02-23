
resource "aws_security_group" "rds_security_group" {
  name="rds_security_group"
  description = "Security Group for database"
  vpc_id = aws_vpc.my_vpc.id
  
}
resource "aws_security_group" "rds_sg" {
  name        = "rds-security-group"
  description = "Security group for RDS instance"

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.mysecuritygroup.id]
  }
tags={
  Name="rds_security_group_tag"
}
}

resource "aws_db_subnet_group" "rds_subnet_group" {
  name       = "my-db-subnet-group"
  subnet_ids = [for subnet in aws_subnet.my_private_subnet:subnet.id] 
}

output "address" {
  description = "The address to connect to the DB instance."
  value       = aws_db_instance.myrds.address
}
output "arn" {
  description = "The ARN of the DB instance."
  value       = aws_db_instance.myrds.arn

}

resource "aws_db_instance" "myrds" {
  engine               = var.db_engine
  engine_version       = var.db_engine_version
  allocated_storage    = 20
  storage_type         = "gp2"
  identifier           ="mydb"
  username             = var.db_username
  password             = var.db_password
  publicly_accessible = true
  instance_class       = var.db_class
  db_name              = var.db_name
  port                 = var.db_port
  multi_az             = false
  skip_final_snapshot  = true


  db_subnet_group_name   = aws_db_subnet_group.rds_subnet_group.id
  vpc_security_group_ids = [aws_security_group.rds_sg.id]

  tags = {
    Name = "MyRdsdb"
  }
}

