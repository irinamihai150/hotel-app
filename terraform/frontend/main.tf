terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.74"
    }
  }
}

variable "region" {
  default = "eu-west-2"
}

provider "aws" {
  region = var.region
}

# S3 static website bucket
resource "aws_s3_bucket" "my-static-page" {
  bucket = "hotel-terraf-bucket"

  tags = {
    Name = "HotelTerrafBucketdescription"
  }
}

resource "aws_s3_bucket_website_configuration" "my-static-page-website" {
  bucket = aws_s3_bucket.my-static-page.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

# S3 bucket ownership controls
resource "aws_s3_bucket_ownership_controls" "my-static-page-ownership-controls" {
  bucket = aws_s3_bucket.my-static-page.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

# S3 bucket public access block
resource "aws_s3_bucket_public_access_block" "my-static-page-public-access-block" {
  bucket                  = aws_s3_bucket.my-static-page.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# S3 bucket ACL access
resource "aws_s3_bucket_acl" "my-static-page-acl" {
  depends_on = [
    aws_s3_bucket_ownership_controls.my-static-page-ownership-controls,
    aws_s3_bucket_public_access_block.my-static-page-public-access-block
  ]

  bucket = aws_s3_bucket.my-static-page.id
  acl    = "public-read"
}

# S3 static website URL output

output "website_url" {
  value = "http://${aws_s3_bucket.my-static-page.bucket}.s3-website.${var.region}.amazonaws.com"
}


# S3 bucket versioning
resource "aws_s3_bucket_versioning" "versioning" {
  bucket = "hotel-terraf-bucket"

  versioning_configuration {
    status = "Disabled"
  }
}

# resource "aws_s3_bucket_object" "object" {
# bucket = aws_s3_bucket.my-static-page.id
#   key = "build/"
#   source = "../../frontend/build/"
#   acl="public-read"
# }


#s3 bucket policy
resource "aws_s3_bucket_policy" "bucket-policy" {
  bucket = aws_s3_bucket.my-static-page.id
  policy = <<POLICY
  {
"Id":"Policy",
"Statement": [ 
  {
    "Action":[ 
      "s3:GetObject"
    ],
    "Effect": "Allow",
    "Resource":"arn:aws:s3:::${aws_s3_bucket.my-static-page.bucket}/*",
    "Principal":{
      "AWS":[ 
        "*"
      ]
    }
  }
]
  }
  POLICY
}