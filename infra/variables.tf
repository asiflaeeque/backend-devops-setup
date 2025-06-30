variable "cluster_name" {
  description = "Name for EKS cluster"
  type        = string
  default     = "backend-cluster" #
}

variable "app_name" {
  default = "backend-app" #
}
