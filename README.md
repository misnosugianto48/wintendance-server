# Wintendance Server

## Installation

1. Clone the Repository

    ```bash
    git clone https://github.com/misnosugianto48/wintendance-server.git

    cd wintendance-server
    ```

2. Install Dependencies

    `npm install`

3. Setup Prisma

    ```bash
    npm run prisma

    npx prisma generate
    ```

4. Set up your environment variables:

    Create a `.env` file in the root directory.
    Add your environment variables to the file. You can refer to the `.env.example` file for a list of required variables.

5. Database ex postgres

    ```bash
    DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
    ```

## Running App

Start the development server with:

`npm run dev` or `npm start`

## Migrate

`npm run migrate:up`. If you want to check the shcema before migrating table run `npm run migrate:create-only`, this command will genarate file to check manually.

## How to check error and fix

  ```bash
    npm run lint

    npm run lint:fix
  ```
