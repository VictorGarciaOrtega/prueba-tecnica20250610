# PruebaTecnica20250610

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Dockerization

First you need to config your username in package.json commands.

To build the docker container run `npm run docker:build` or `npm run docker:build:prod` for production.

To push the docker container run `npm run docker:push` or `npm run docker:push:prod` for production.

To start the docker container run `npm run docker:start` or `npm run docker:start:prod` for production.

> [!IMPORTANT]
> The private key is in the file private_key.pem
