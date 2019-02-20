# Cornell ILR Executive Education Site

This is a composer-based Drupal 8 site for http://execed.ilr.cornell.edu.

## Requirements

- Git
- composer
- PHP version 7.1 or greater

## Setup

1. Clone this repo
2. Run `composer install`
3. Copy `web/sites/example.settings.local.php` to `web/sites/default/settings.local.php`. Modify it to adjust your database connection settings. For example, add the following near the top of the file:

```
$databases['default']['default'] = [
  'database' => 'execed',
  'username' => 'root',
  'password' => '',
  'host' => 'localhost',
  'port' => '3306',
  'driver' => 'mysql',
  'prefix' => '',
  'collation' => 'utf8mb4_general_ci',
];
```

Setup of your local web server and PHP environment is up to you.

## Cloning Content

Once you have access to the project on platform.sh, you can use the `platform` CLI tool to easily set up drush aliases:

```
$ platform drush-aliases
```

Then, use the included script to sync the database:

```
./bin/sync-prod.sh
```

## Updating Drupal Core

```
composer update drupal/core symfony/* --with-dependencies
```

## Content Images and Files

Rather than sync image (and other) files along with the database content, you may optionally proxy them. The `stage_file_proxy` module is used for this, and it may be enabled by adding the following to `web/sites/default/settings.local.php`, clearing your caches with `drush cr`, and running a config import (e.g. `drush cim`).

```
$config['config_split.config_split.local']['status'] = TRUE;
```

## Theming

The custom bootstrap-based theme setup info can be found in `web/themes/custom/cornell/README.md`.
