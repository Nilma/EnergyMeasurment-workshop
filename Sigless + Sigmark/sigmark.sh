#/bin/bash

REMOTE_ADDRESS="$1"
CHANNEL="$2"
MESSAGE="$3"

if [ -z "$REMOTE_ADDRESS" ]; then
	echo "Please provide a valid address and port. I.e: 192.168.1.1:8000"
	exit 1
fi

if [ -z "$CHANNEL" ]; then
	echo "Please provide a valid channel [CH1|CH2]"
	exit 2
fi

if [ -z "$MESSAGE" ]; then
	echo "No message provided. Sending empty message"
fi

curl -X POST -H "Content-Type: application/json" -d '{ "message": "'"$MESSAGE"'", "channelId": "'"$CHANNEL"'"}' http://$REMOTE_ADDRESS/api/log
