#!/bin/bash

<<'COMMENT'
Author: Andre Litty
Project: TelosPortal
Date: 17.12.2018

Script to automate often used functionality when dealing with TelosPortal like starting, stopping and updating from git
COMMENT

if test "$#" -lt 1; then
    echo "Illegal number of arguments! Call this script with a valid argument!"
    echo "help: Shows help text"
    echo "update: Fetches and pulls latest software version from git, builds and restarts the application"
    echo "start: Starts the application, if not already running"
    echo "stop: Stops the application"
    exit 1
fi

PORTAL_SERVER="node server"
STD_OUT="stdout.log"
STD_ERR="stderr.log"

update () {
    git fetch
    git pull
    echo "Starting TelosPortal..."
    npm run start:production > $STD_OUT 2> $STD_ERR &
    if [ $? -eq 0 ]; then
        echo "Successfully started TelosPortal for further information see: stdout.log and stderr.log"
    else
        echo "Uups! Something went wrong while starting TelosPortal..."
        exit 1
    fi
}

start () {
    PID=`pgrep -f "$PORTAL_SERVER"`
    if [ $? -eq 0 ]; then
        echo "TelosPortal already running with pids:" $PID
        exit 0
    else
        "Starting TelosPortal..."
        npm run start:production > $STD_OUT 2> $STD_ERR &
        if [ $? -eq 0 ]; then
            echo "Successully restarted building and running TelosPortal, chech stdout.log or stderr.log for further information"
        else
            echo "Uups! Something went wrong while stargin TelosPortal... Check stderr.log!"
        fi
    fi
}

stop () {
    PID=`pgrep -f "$PORTAL_SERVER"`
    if [ $? -eq 0 ]; then
        echo "Stopping TelosPortal by killing pids:" $PID
        kill $PID
    else
        echo "TelosPortal is not running..."
        exit 0
    fi

    if [ $? -eq 0 ]; then
        echo "Successfully stopped TelosPortal!"
    else
        echo "Uups! Something went wrong while shutting down TelosPortal..."
        exit 1
    fi
}

help () {
    echo "This is a small script to provide basic and often needen functionality for TelosPortal"
    echo "You can start, stop and update the TelosPortal with this script (update includes building and restarting the application)"
    echo "Following arguments are valid for this script:"
    echo ""
    echo "help: Shows help text"
    echo "update: Fetches and pulls latest software version from git, builds and restarts the application"
    echo "start: Starts the application, if not already running"
    echo "stop: Stops the application"
}

case "$1" in
"update")
    update
    ;;
"start")
    start
    ;;
"stop")
    stop
    ;;
"help")
    help
    ;;
*)
    echo "Illegal argument!"
    exit 1
esac
