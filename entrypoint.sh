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

    export EGG_NODE_ENV=dev-server
    export NODE_ENV=production
    exec npm start
    ;;

  "test-server" )

    export EGG_NODE_ENV=test-server
    export NODE_ENV=production
    exec npm start
    ;;

  "pre-server" )
    export EGG_NODE_ENV=pre-server
    export NODE_ENV=production
    exec npm start
    ;;

  "prod-server" )
    # we can modify files here, using ENV variables passed in
    # "docker create" command. It can't be done during build process.
    export EGG_NODE_ENV=prod-server
    export NODE_ENV=production
    exec npm start
    ;;

   * )
    # Run custom command. Thanks to this line we can still use
    # "docker run our_image /bin/bash" and it will work
    exec $CMD ${@:2}
    ;;
esac