#!/bin/ash
rm -rf /config/node_modules
cp -r /usr/src/app/* /config/
while true; do
DISCORD_APP_AUTH_TOKEN=${DISCORD_APP_AUTH_TOKEN} node /config/bot.js
done
