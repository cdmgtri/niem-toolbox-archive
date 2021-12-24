#!/bin/bash

option=$1

if [[ "$option" = "start" || "$option" = "" ]]; then
  echo "Options: start (default) or stop"
  echo "Starting niem-toolbox"
  cd C:/git/model/niem-toolbox/
  pm2 stop niem-toolbox
  pm2 start ecosystem.config.yaml
  start http://localhost:8080/search

elif [[ "$option" = "stop" ]]; then
  echo "Stopping niem-toolbox"
  pm2 stop niem-toolbox

fi
