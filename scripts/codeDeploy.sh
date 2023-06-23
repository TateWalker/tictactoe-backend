#!/bin/bash
COMMIT_ID=$(git rev-parse HEAD)
echo ${COMMIT_ID}
aws deploy create-deployment --application-name [APPLICATION NAME HERE] --deployment-group-name [DEPLOYMENT GROUP NAME HERE] --file-exists-behavior OVERWRITE --github-location repository="Upine-Apps/REPOSITORY LOCATION HERE",commitId=${COMMIT_ID}