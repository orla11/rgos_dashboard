#!/bin/bash

PRODUCTION_DIRECTORY="./production/"

cd $PRODUCTION_DIRECTORY && git add . && git commit -m "ready for production" && git push heroku master