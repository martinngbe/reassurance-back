#!/bin/bash

# Variables
IMAGE_NAME="reassurance-back"
IMAGE_TAG="0.0.1"
if [ -n "$1" ]; then
    IMAGE_TAG="$1"
fi
DOCKERHUB_USER="ngbemartin"
FULL_IMAGE="${DOCKERHUB_USER}/${IMAGE_NAME}:${IMAGE_TAG}"
LOCAL_IMAGE="${IMAGE_NAME}:${IMAGE_TAG}"

echo "________________________"
echo "Construction image"
docker build -t "$LOCAL_IMAGE" .
echo "________________________"
echo "Tag image"
docker tag "$LOCAL_IMAGE" "$FULL_IMAGE"
echo "________________________"
echo "Push image"
docker push "$FULL_IMAGE"
echo "________________________"
echo "Terminee"
echo "________________________"
# echo "Arrêt du container"
# docker compose down
# echo "________________________"
# echo "Demarrage du container"
# docker compose up -d --force-recreate
# echo "________________________"
