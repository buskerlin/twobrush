#!/bin/bash
WEB_PATH='/home/twobrush'
WEB_USER='root'
WEB_USERGROUP='root'
echo "Start deployment"
cd WEB_PATH
echo "pulling source code..."
git pull
echo "changing permissions..."
echo "Finished."