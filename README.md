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

## How to set up the application?

1. Copy the `.env.example` to `.env`, then replace the following env vars

```dotenv
APP_NAME=YOUR_NEW_APP_NAME

DB_DATABASE=YOUR_FAVORITE_DATABASE_NAME
DB_USERNAME=YOUR_FAVORITE_USERNAME
DB_PASSWORD=YOUR_FAVORITE_PASS
```

### Installing dependencies

2. Access to the container

<code>docker-compose exec -it [$containerName](#getContainerName) bash</code>

3. Downloading the dependencies

<code>composer install</code>

4. Configuring the application

<code>composer run-script install-app</code>


---

<h2 id="getContainerName"> How to get container name? </h2>

<p>First you have to run this command</p>

<code>docker ps</code>


<p>It should return somenthing like this,</p>

![readme-img-1.png](public%2Fimg%2Freadme%2Freadme-img-1.png)

<p>You can use the CONTAINER ID or the container's NAME</p>

---

## Sentry

Sentry is a developer-first error tracking and performance monitoring platform. Errors are logged both from the frontend
and backend. In order to get it up and running, you need to follow these steps:

1. Create an account [here](https://sentry.io)
2. Create a project within an organization
3. Copy the DSN provided below "Configure SDK" and paste it in your `.env`'s `SENTRY_LARAVEL_DSN`
4. You can test your configuration using `sail artisan sentry:test`

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
