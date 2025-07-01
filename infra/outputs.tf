output "ecr_repository_url" {
  description = "The URL of the ECR repository for the backend application"
  value       = aws_ecr_repository.app.repository_url # <-- Make sure this line is exactly like this
}
