#!/bin/bash

[ -d target ] || mkdir target

wget -P ./target http://chromedriver.storage.googleapis.com/2.9/chromedriver_mac32.zip
wget -P ./target http://selenium-release.storage.googleapis.com/2.53/selenium-server-standalone-2.53.1.jar
unzip ./target/chromedriver_mac32.zip -d ./target

rm ./target/chromedriver_mac32.zip