APP_NAME=${1:?"Specify 'APP_NAME' as argv[1]"}

nginx_container_id=$(docker ps -q --filter ancestor=mephistonginx_nginx --format="{{.ID}}");
if [ -z "$nginx_container_id" ]
then
    echo "Container nginx not found";
    exit 1;
fi

# find a container by name, get its container id
container_id=$(docker ps -q --filter ancestor=$APP_NAME --format="{{.ID}}");
if [ -z "$container_id" ]
then
    echo "Container $APP_NAME not found";
    exit 1;
fi

echo "Start grafana";

docker exec $container_id /bin/bash -c "cd /mephisto/app && nohup mephisto metrics view > nohup.output &";

# create a file in /etc/nginx/sites-available/{APP_NAME}.mephisto.aufederal2022.com with sudo permission

file="/tmp/sites-available/${APP_NAME}.mephisto.aufederal2022.com"
mkdir -p /tmp/sites-available
touch $file
echo "server {" > $file
echo "    listen 80;" >> $file
echo "    listen [::]:80;" >> $file
echo "" >> $file
echo "    server_name ${APP_NAME}.mephisto.aufederal2022.com www.${APP_NAME}.mephisto.aufederal2022.com;" >> $file
echo "" >> $file
echo "    location / {" >> $file
echo "        proxy_pass http://${APP_NAME}:3032;" >> $file
echo "        include proxy_params;" >> $file
echo "    }" >> $file
echo "}" >> $file
cat $file

# copy to docker container
docker cp $file $nginx_container_id:/etc/nginx/sites-available/${APP_NAME}.mephisto.aufederal2022.com

# remove the file in /tmp/sites-available/{APP_NAME}.mephisto.aufederal2022.com
rm $file

# create a symbolic link in /etc/nginx/sites-enabled/{APP_NAME}.mephisto.aufederal2022.com with sudo permission
# to the file in /etc/nginx/sites-available/{APP_NAME}.mephisto.aufederal2022.com

file_path="/etc/nginx/sites-enabled/${APP_NAME}.mephisto.aufederal2022.com"
if docker exec "$nginx_container_id" [ -e "$file_path" ]; then
    echo "The sites-enabled exists."
else
    echo "The sites-enabled does not exist."
    docker exec $nginx_container_id /bin/sh -c "ln -s /etc/nginx/sites-available/${APP_NAME}.mephisto.aufederal2022.com /etc/nginx/sites-enabled/"
fi

get_subdomain_from_filename() {
    local filename="$1"
    echo "${filename%%.*}"
}

# Remove a site from /etc/nginx/sites-available and /etc/nginx/sites-enabled inside the $nginx_container_id container
remove_site_inside_container() {
    local site_filename="$1"
    docker exec $nginx_container_id rm -f "/etc/nginx/sites-available/$site_filename" >/dev/null
    docker exec $nginx_container_id rm -f "/etc/nginx/sites-enabled/${site_filename//sites-available/sites-enabled}" >/dev/null
    echo "Removed site $site_filename from /etc/nginx/sites-available and /etc/nginx/sites-enabled inside the $nginx_container_id container"
}

# Removing old sites that doesn't have container
echo "Removing old sites that doesn't have container"
docker exec $nginx_container_id /bin/sh -c 'ls /etc/nginx/sites-available/' | while read -r site_filename; do
    if [ -n "$site_filename" ]; then
        subdomain=$(get_subdomain_from_filename "$site_filename")

        # Check if there is a running container with the same name as the subdomain
        if docker ps | grep -q "$subdomain"; then
            echo "The container $subdomain is running."
        else
            echo "The container $subdomain is not running."
            remove_site_inside_container "$site_filename"
        fi
    fi
done


# restart nginx with sudo permission
docker exec $nginx_container_id /bin/sh -c 'nginx -t'
docker exec $nginx_container_id /bin/sh -c 'nginx -s reload'