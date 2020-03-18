#!/usr/bin/env sh
# $0 is a script name,
# $1, $2, $3 etc are passed arguments
# $1 is our command
CMD=$1

case "$CMD" in
 "local" )
    export NODE_ENV=development
    exec npm run dev
    ;;

  "dev-server" )

    export EGG_SERVER_ENV=dev-server
    export NODE_ENV=production
    exec npm run start-in-docker
    ;;

  "test-server" )

    export EGG_SERVER_ENV=test-server
    export NODE_ENV=production
    exec npm run start-in-docker
    ;;

  "pre-server" )
    export EGG_SERVER_ENV=pre-server
    export NODE_ENV=production
    exec npm run start-in-docker
    ;;

  "prod-server" )
    # we can modify files here, using ENV variables passed in
    # "docker create" command. It can't be done during build process.
    export EGG_SERVER_ENV=prod-server
    export NODE_ENV=production
    exec npm run start-in-docker
    ;;

esac