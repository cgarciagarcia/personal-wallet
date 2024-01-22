<p align="center">
<img src="https://raw.githubusercontent.com/cgarciagarcia/backend-template/main/public/img/readme/loving-php.JPG" width="200" height="200" />
</p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## Pre-requirements dependencies

* [Docker](https://www.docker.com/products/docker-desktop/)

## How to set up the application

### Installing dependencies

1. Access to the container

<code>docker-compose exec -it [$containerName](#getContainerName) bash</code>

2. Downloading the dependencies

<code>composer install</code>

3. Configuring the application

<code>composer run-script install-app</code>


---

<h2 id="getContainerName"> How to get container name? </h2>

<p>First you have to run this command</p>

<code>docker ps</code>


<p>It should return somenthing like this,</p>

![readme-img-1.png](public%2Fimg%2Freadme%2Freadme-img-1.png)

<p>You can use the CONTAINER ID or the container's NAME</p>

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
