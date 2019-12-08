#bin/bash

cd ../laradock && docker-compose up -d nginx mysql
echo -e "\e[32mDocker is UP!!"
