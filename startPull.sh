#!/bin/bash
WEB_PATH='/home/twobrush'
WEB_USER='root'
WEB_USERGROUP='root'
echo "Start deployment"
cd $WEB_PATH
echo "pulling source code..."
git reset --hard origin/master
git clean -f
git pull
git checkout master
echo "changing permissions..."
echo "Finished."