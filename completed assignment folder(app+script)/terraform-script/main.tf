terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
  }

  required_version = ">= 0.14.9"
}

provider "aws" {
  profile = var.profile
  region  = var.region
}


# create VPC - 256 hosts

resource "aws_vpc" "pearson-vpc" {
  cidr_block = var.vpc_cidr_block

  tags = {
    Name = var.vpc_tag_name
  }
}

# create an Internet Gateway

resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.pearson-vpc.id

}

# create a Custom Route Table - all ipv4 traffic is set to internet gateway

resource "aws_route_table" "prod-route-table" {
  vpc_id = aws_vpc.pearson-vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gw.id
  }

  route {
    ipv6_cidr_block = "::/0"
    gateway_id      = aws_internet_gateway.gw.id
  }

  tags = {
    Name = var.route_table_tag_name
  }
}


# create a Subnet - 128 hosts

resource "aws_subnet" "subnet-1" {
  vpc_id            = aws_vpc.pearson-vpc.id
  cidr_block        = var.subnet_1_cidr_block
  availability_zone = var.availability_zone


  tags = {
    Name = var.subnet1_tag_name
  }
}


# Associate subnet with the route table - make pulblic subnet (route table has a route to internet gateway)


resource "aws_route_table_association" "a" {
  subnet_id      = aws_subnet.subnet-1.id
  route_table_id = aws_route_table.prod-route-table.id
}


# create a security group - allow port 22(ssh),443(https),cutomport(8080) for ec2 instance

resource "aws_security_group" "terraform_private_sg" {

  vpc_id = aws_vpc.pearson-vpc.id


  ingress {
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = 22
    to_port     = 22
  }

  ingress {
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = 8080
    to_port     = 8080
  }

  ingress {
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = 443
    to_port     = 443
  }

  egress {
    protocol    = -1
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = 0
    to_port     = 0
  }

  tags = {
    Name = var.security_group_tag_name
  }
}

# create a ec2 instance inside subnet

resource "aws_instance" "web-server-instance" {
  ami               = var.ec2_instance_ami_id
  instance_type     = var.ec2_instance_type
  availability_zone = var.availability_zone
  key_name          = var.ec2_instance_access_key_name

  tags = {
    Name = var.ec2_instance_name
  }

  vpc_security_group_ids      = [aws_security_group.terraform_private_sg.id]
  subnet_id                   = aws_subnet.subnet-1.id
  count                       = 1
  associate_public_ip_address = true
}


