#!/bin/bash

echo "[INFO] Moving dist folder to production directory"

PRODUCTION_DIST_DIRECTORY="./production/dist"
PRODUCTION_DIRECTORY="./production/"
DIST_DIRECTORY="./dist"

if [ -d "$PRODUCTION_DIST_DIRECTORY" ]; then
    rm -rf $PRODUCTION_DIST_DIRECTORY
fi

mv -r $DIST_DIRECTORY $PRODUCTION_DIRECTORY

echo "[INFO] Finished moving dist folder to production directory"