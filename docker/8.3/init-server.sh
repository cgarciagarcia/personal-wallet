#/bin/sh


a2dissite 000-default
a2ensite app
a2enconf php8.3-fpm
a2enmod proxy proxy_fcgi rewrite
service php8.3-fpm start
service apache2 start
