terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# -------------------------
# SECURITY GROUP (EC2)
# -------------------------
resource "aws_security_group" "backend_sg" {
  name = "backend-sg"

  # SSH
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["${var.my_ip}/32"]
  }

  # Backend API
  #ingress {
   # from_port   = 5000
   # to_port     = 5000
   # protocol    = "tcp"
   # cidr_blocks = ["0.0.0.0/0"]
 # }

  # HTTP (optional for future Nginx)
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# -------------------------
# EC2 INSTANCE
# -------------------------
resource "aws_instance" "backend" {
  ami           = "ami-0c38b837cd80f13bb"
  instance_type = "t2.nano"

  key_name = var.key_name

  vpc_security_group_ids = [aws_security_group.backend_sg.id]

  user_data = <<-EOF
              #!/bin/bash

              # Update packages
              sudo apt update -y

              # Install Docker
              sudo apt install docker.io -y

              # Start Docker service
              sudo systemctl start docker

              # Enable Docker on boot
              sudo systemctl enable docker

              # Add ubuntu user to docker group
              sudo usermod -aG docker ubuntu

              # Verify Docker installation
              docker --version > /home/ubuntu/docker-version.txt
              EOF

  tags = {
    Name = "backend-server"
  }
}

# -------------------------
# S3 BUCKET (Frontend)
# -------------------------
resource "aws_s3_bucket" "frontend" {
  bucket = "ecommerce-frontend-bucket-123456"
}

resource "aws_s3_bucket_website_configuration" "frontend_hosting" {
  bucket = aws_s3_bucket.frontend.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

# -------------------------
# ECR (Docker Images)
# -------------------------
resource "aws_ecr_repository" "backend_repo" {
  name = "ecom-backend"
}