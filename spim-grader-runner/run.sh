#!/bin/bash

set -e

docker build -t spim-grader-runner .
CONTAINER_ID=$(docker run -dit --memory=128m spim-grader-runner)
docker exec -it $CONTAINER_ID node src/index.js compile
docker exec -it $CONTAINER_ID node src/index.js test
docker exec -it $CONTAINER_ID node src/index.js run
