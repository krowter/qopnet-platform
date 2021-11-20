if test "$NX_NODE_ENV" = "production"  
    then 
        nx build qopnet-commerce --prod
    else 
        nx build qopnet-commerce
fi 