output "ec2_public_ip" {
  value = aws_instance.backend.public_ip
}

output "ecr_repository_url" {
  value = aws_ecr_repository.backend_repo.repository_url
}

output "s3_bucket_name" {
  value = aws_s3_bucket.frontend.bucket
}