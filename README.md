# Chisel Frontend

Chisel Frontend is developed with React, Redux and Semantic UI.

## Getting Started

1.  Clone the repository:

    ```bash
    git clone https://github.com/RishivikramN/chisel-frontend.git
    ```

2.  Install the dependencies:

    ```bash
    cd chisel-frontend

    yarn install
    ```

3.  Make sure that the backend server is running. And update the `BASE_URL` in the `src/api/services.ts` file and start the server

    ```bash
    yarn start
    ```

## Folder Structure

The project structure follows a common layout for react application:

- `src/`: Contains the application source code.
  - `components/`: Contains all the ui components.
  - `api/`: Contains the api requests to call the backend server
  - `types/`: Contains all the types of the entities.
  - `assets/`: Contains the svg images.
  - `store/`: Contains the redux stores.
  - `index.tsx`: Entry point of the application.
  - `package.json`: Defines project metadata and dependencies.
