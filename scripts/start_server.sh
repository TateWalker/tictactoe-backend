#!/bin/bash
cd /var/[REPO LOCATION]
npm run build
pm2 start build/server.js
exit 0