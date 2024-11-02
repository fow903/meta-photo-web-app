# MetaPhotoUi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.7 and has been configured for Server-Side Rendering (SSR) using Docker.

## Running Locally

This project uses Yarn as its package manager. To install the dependencies, run:

```sh
yarn
```

Then, to start the development server locally, run:

```sh
yarn start
```

Navigate to `http://localhost:4200/` to see the running application.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Running the Project with Docker

To run the project using Docker, you can use the provided Makefile. The steps below explain how to build, run, stop, and remove the Docker container for the SSR application.

### Prerequisites

Make sure you have Docker installed. You will also need `make` installed to use the Makefile.

### Makefile Commands

- **Build the Docker Image**: This command builds the Docker image for the SSR application.

  ```sh
  make build
  ```

- **Run the Application**: This command builds the Docker image and runs a new container, exposing the application on port `4000`.

  ```sh
  make run
  ```

  Navigate to `http://localhost:4000/` to see the running application.

- **Stop the Running Container**: This command stops the Docker container if it is currently running.

  ```sh
  make stop
  ```

- **Remove the Container**: This command stops and removes the Docker container.

  ```sh
  make remove
  ```

### Environment Configuration

To change the `apiUrl` or any other environment variables, you can modify the files in the `src/environments/` directory:

- **Development Environment**: Update `src/environments/environment.ts` to modify settings for the development environment.
- **Production Environment**: Update `src/environments/environment.prod.ts` to modify settings for the production environment.

For example, to change the `apiUrl`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://your-api-url.com'
};
```

## Further help

To get more help on the Angular CLI, use `ng help` or check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Important Tools and Dependencies

This project uses several key tools and dependencies, including:

- **@angular/core, @angular/common, @angular/router**: Core Angular modules for building the application.
- **@angular/material, @angular/cdk**: Angular Material and Component Development Kit for UI components.
- **@nguniversal/express-engine**: To enable Server-Side Rendering (SSR) with Angular.
- **@types/node**: Type definitions for Node.js.
- **dotenv**: For managing environment variables.
- **rxjs**: Reactive Extensions for JavaScript, used for handling asynchronous operations.
- **zone.js**: A library that helps Angular track asynchronous operations.

## Summary

This project can be run both locally using `ng serve` or within a Docker container for SSR using the provided Makefile commands. You can configure the environment variables in the `src/environments` directory as needed.

