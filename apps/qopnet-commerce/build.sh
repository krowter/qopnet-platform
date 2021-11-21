#!/bin/sh

# update the library dependency of @prisma/client 
# and typing for TypeScript
prisma generate &&

if test "$NX_NODE_ENV" = "production"  
    then 
        nx build qopnet-commerce --prod
    else 
        nx build qopnet-commerce
fi 