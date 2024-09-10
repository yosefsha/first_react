#!/bin/bash  

# Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 963352896991.dkr.ecr.us-east-1.amazonaws.com

docker tag file_uploader_image:1.0.0 aws_account_id.dkr.ecr.region.amazonaws.com/file_uploader_image:1.0.0
docker push 963352896991.dkr.ecr.region.amazonaws.com/file_uploader_image:1.0.0

# create eks cluster
eksctl create cluster --name flask-cluster --region us-east-1 --nodegroup-name standard-workers --node-type t3.medium --nodes 2
