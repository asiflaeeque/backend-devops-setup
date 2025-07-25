#  workflow defines a Continuous Integration/Continuous Deployment (CI/CD) pipeline
# for the backend application. It triggers on pushes to the 'main' branch.

name: CI/CD Backend Application to EKS

on:
  push:
    branches:
      - main # Trigger this workflow when code is pushed to the 'main' branch

env:
  # Define environment variables that can be used throughout the workflow
  AWS_REGION: ${{ secrets.AWS_REGION }} # AWS Region from GitHub Secrets
  AWS_ACCOUNT_ID: ${{ secrets.AWS_ACCOUNT_ID }} # AWS Account ID from GitHub Secrets
  ECR_REPOSITORY: backend-app # Name of your ECR repository
  EKS_CLUSTER_NAME: ${{ secrets.EKS_CLUSTER_NAME }} # EKS Cluster Name from GitHub Secrets
  APP_PATH: backend-devops-setup # Path to yoThisur backend application code

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest # Use the latest Ubuntu runner for this job
    environment: production # Designate this as a production environment (optional, for GitHub Environments)

    steps:
      - name: Checkout code
        uses: actions/checkout@v4 # Action to check out your repository code

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4 # Action to set up AWS credentials
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }} # AWS Access Key ID from GitHub Secrets
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }} # AWS Secret Access Key from GitHub Secrets
          aws-region: ${{ env.AWS_REGION }} # Use the AWS Region defined in env

      - name: Login to Amazon ECR
        id: login-ecr # Assign an ID to this step to reference its outputs
        uses: aws-actions/amazon-ecr-login@v2 # Action to log in to ECR

      - name: Build, tag, and push Docker image to ECR
        run: |
          # Navigate to the application directory
          cd ${{ env.APP_PATH }}

          # Get the ECR repository URI
          ECR_URI="${{ env.AWS_ACCOUNT_ID }}.dkr.ecr.${{ env.AWS_REGION }}.amazonaws.com/${{ env.ECR_REPOSITORY }}"

          # Build the Docker image
          docker build -t $ECR_URI:latest .

          # Push the Docker image to ECR
          docker push $ECR_URI:latest

      - name: Set up kubectl
        uses: aws-actions/amazon-eks-setup@v2 # Action to set up kubectl and configure it for EKS
        with:
          cluster-name: ${{ env.EKS_CLUSTER_NAME }} # EKS Cluster Name from env
          aws-region: ${{ env.AWS_REGION }} # AWS Region from env

      - name: Deploy to EKS
        run: |
          # Navigate to the Kubernetes manifests directory
          cd kubernetes/

          # Apply Kubernetes manifests.
          # Using rollout restart ensures new pods are created with the latest image.
          # Alternatively, you could use 'kubectl apply -f .' if your deployment.yaml
          # uses an image tag that changes (e.g., commit SHA) or if you update the image
          # tag in the YAML as part of the pipeline.
          kubectl rollout restart deployment/backend-app-deployment -n default

          # Optional: Wait for deployment to be ready
          kubectl rollout status deployment/backend-app-deployment -n default --timeout=5m
