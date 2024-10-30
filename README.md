# Backend Boilerplate - Prisma

This guide will walk you through the process of setting up a backend boilerplate project with PostgreSQL and Prisma. By following these steps, you will clone the project, install dependencies, and configure Prisma for database management. Let's get started!

## Installation Steps

Follow these steps to set up the backend boilerplate project:

### 1. Clone the Project

Open your terminal or command prompt and run the following command to clone the project repository:

```bash
git clone https://github.com/senseix21/Backend-boilerplate-Postgres-Prisma/ your-backend-project
```

Navigate into the project directory:

```bash
cd your-backend-project
```

### 2. Install Project Dependencies

Install the project dependencies by running the following command:

```bash
yarn install
```

### 3. Configure Prisma and Database Connection

#### a. Add Prisma as a Development Dependency

Add Prisma as a development dependency by running the following command:

```bash
yarn add prisma --save-dev
```

#### b. Set Up Your Prisma Project

Create the Prisma schema file using the following command:

```bash
npx prisma init
```

Open the `prisma/schema.prisma` file and configure your database connection details. Modify the `datasource` block to match your database provider and connection URL:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

#### c. Create a .env File

Create a `.env` file in the project root directory and set the `DATABASE_URL` environment variable. Replace the placeholders with your database connection details:

```dotenv
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA"
```

### 4. Creating the Database Schema

Migrate the database schema using the following command:

```bash
npx prisma migrate dev --name init
```

This command creates a new migration file based on your schema changes and applies it to your database.

### 5. Install Prisma Client

Install the Prisma Client library by running the following command:

```bash
yarn add @prisma/client
```

The Prisma Client provides an interface to interact with your database.

That's it! You have successfully set up the Backend Boilerplate project with PostgreSQL and Prisma. You can now start exploring and working with the codebase. Refer to the project documentation or README for further instructions on how to run and use the backend service.

Happy coding!
