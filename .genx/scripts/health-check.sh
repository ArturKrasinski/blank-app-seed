#!/bin/bash

url=$1
http_response=$(curl -s -o /dev/null -w "%{http_code}" $url)
counter=60

until [[ $http_response == "200" || counter -lt 0 ]]; do
  echo 'not all services running; waiting 10 seconds and trying again'
  # TODO: remove
  curl $url
  sleep 10
  http_response=$(curl -s -o /dev/null -w "%{http_code}" $url)
  ((counter--))
done

curl $url
printf '\n'

if [[ $http_response == "200" ]]
then
  echo 'all services started correctly'
  echo 'Data server logs'
  docker exec -it testapp-gsf bash -c 'cat /home/testapp/run/runtime/logs/TESTAPP_DATASERVER.log.err'
  echo 'Genesis cluster logs'
  docker exec -it testapp-gsf bash -c 'cat /home/testapp/run/runtime/logs/GENESIS_CLUSTER.log.err'

else
  echo 'not all services started correctly'
  exit 1
fi
