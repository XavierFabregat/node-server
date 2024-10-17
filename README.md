# Node.js TypeScript Express API Template

This repository contains a robust template for building scalable and maintainable Node.js APIs using TypeScript and Express. It includes a comprehensive setup for authentication, database integration, and testing.

## Features

- **TypeScript**: Strongly typed language for better developer experience and code quality
- **Express**: Fast, unopinionated, minimalist web framework for Node.js
- **Sequelize**: Promise-based ORM for PostgreSQL, MySQL, MariaDB, SQLite, and Microsoft SQL Server
- **JWT Authentication**: Secure authentication using JSON Web Tokens
- **Testing**: Jest and Supertest for unit and integration testing
- **Code Quality**: ESLint and Prettier for consistent code style
- **Database Migrations**: Sequelize CLI for easy database schema management
- **Environment Variables**: dotenv for managing environment-specific configurations
- **API Versioning**: Built-in support for API versioning
- **Error Handling**: Centralized error handling middleware
- **CORS**: Cross-Origin Resource Sharing enabled
- **Cookie Parser**: For handling HTTP cookies
- **Bcrypt**: For secure password hashing
- **UUID**: For generating unique identifiers

## Getting Started

Follow these steps to set up the project on your local machine:

1. **Clone the repository**

   ```
   git clone https://github.com/XavierFabregat/node-server.git <Your-Server-Name>
   cd <Your-Server-Name>
   ```

2. **Install dependencies**

   ```
   npm install
   ```

3. **Set up environment variables**

   - Copy the `.env.example` file to a new file named `.env`:
     ```
     cp .env.example .env
     ```
   - Open the `.env` file and fill in the required values:
     ```
     PORT=3000
     HOST=localhost
     NODE_ENV=development
     JWT_SECRET=your_jwt_secret_here
     DB_URL=your_database_url_here
     DB_NAME=your_database_name
     DB_USER=your_database_user
     DB_PASSWORD=your_database_password
     DB_HOST=localhost
     DB_PORT=5432
     ```

4. **Set up the database**

   - Ensure you have PostgreSQL installed and running on your machine
   - Create a new database for the project:
     ```
     createdb your_database_name
     ```

5. **Run database migrations**

   ```
   npm run db:migrate
   ```

6. **Build the project**

   ```
   npm run build
   ```

7. **Start the development server**

   ```
   npm run dev
   ```

8. **Test the API**

   - The server should now be running at `http://localhost:3000` (or the port you specified in the `.env` file)
   - You can test the API using tools like [Postman](https://www.postman.com/) or [curl](https://curl.se/)
   - Example API request:
     ```
     curl http://localhost:3000/v1/user/me
     ```

9. **Run tests**
   ```
   npm test
   ```

Now you're all set to start developing your Node.js TypeScript Express API!

### Next Steps

- Explore the project structure and familiarize yourself with the codebase
- Check out the available API routes in `src/router/v1/index.ts`
- Start building your own routes and controllers
- Customize the User model or create new models as needed
- Write tests for your new features

Happy coding!
