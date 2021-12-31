variable "profile" {
  type        = string
  description = "This is the AWS profile name as set in the shared credentials file"
  default     = "default"
}

variable "region" {
  type        = string
  description = "The region of the aws"
  default     = "us-east-2"
}

variable "vpc_cidr_block" {
  type        = string
  description = "The IPv4 CIDR block for the VPC"
  default     = "172.16.0.0/24"
}

variable "subnet_1_cidr_block" {
  type        = string
  description = "The IPv4 CIDR block for the subnet 1"
  default     = "172.16.0.128/25"
}

variable "availability_zone" {
  type        = string
  description = "The availability zone of the region"
  default     = "us-east-2a"
}


variable "ec2_instance_ami_id" {
  type        = string
  description = "AMI to use for the instance"
  default     = "ami-0629230e074c580f2"
}

variable "ec2_instance_type" {
  type        = string
  description = "Instance type of the ec2 instance"
  default     = "t2.micro"
}

variable "ec2_instance_access_key_name" {
  type        = string
  description = "The private key file name of the instance"
  default     = "chat"
}

variable "ec2_instance_name" {
  type        = string
  description = "The name of the instance"
  default     = "server instance"
}


variable "vpc_tag_name" {
  type        = string
  description = "The name of the vpc"
  default     = "Pearson vpc"
}


variable "route_table_tag_name" {
  type        = string
  description = "The name of the custom route table of subnet 1"
  default     = "prod-route-table"
}


variable "subnet1_tag_name" {
  type        = string
  description = "The name of subnet 1"
  default     = "subnet-1"
}


variable "security_group_tag_name" {
  type        = string
  description = "The name of the security group for instance"
  default     = "ec2-private-sg"
}