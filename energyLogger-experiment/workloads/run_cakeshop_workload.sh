#!/bin/bash

python3 -m http.server 8000 --directory ../apps/cakeShop &
SERVER_PID=$!

sleep 2

for i in {1..200}; do
  curl -s http://localhost:8000/index.html > /dev/null
done

kill $SERVER_PID
wait $SERVER_PID 2>/dev/null