#!/bin/bash
set -e

IMAGE_NAME="recipe-app-api/pip-compile"
MOUNT_PATH="/opt/requirements"

# Check if Docker is installed and running
if ! command -v docker &> /dev/null
then
    echo "Docker not available. Start docker daemon"
    exit 1
fi

docker build -t $IMAGE_NAME -f Dockerfile-pip-compile .

docker run \
    --mount "source=${PWD},target=${MOUNT_PATH},type=bind" \
    $IMAGE_NAME --verbose --no-emit-index-url requirements.in

docker run \
    --mount "source=${PWD},target=${MOUNT_PATH},type=bind" \
    $IMAGE_NAME --verbose --no-emit-index-url requirements-dev.in
