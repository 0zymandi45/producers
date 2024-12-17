# Rural Producers Management API

This project is a backend system for managing rural producers. It allows creating, updating, listing, and deleting rural producer records, and provides a dashboard with relevant totals.

## Features

- Rural producers management (CRUD)
- Dashboard with total area, cultivable area, vegetation area, etc.
- Validation of producer details such as CPF/CNPJ
- PostgreSQL database integration
- API documentation with Swagger
- Error handling

## Technologies
Node.js: Backend runtime environment
Express: Web framework for Node.js
TypeORM: ORM for managing database operations
PostgreSQL: Database management system
TypeScript: Programming language used for development
Swagger: API documentation tool
Tsyringe: Dependency injection framework
ESLint: Linting tool for code quality

## Table of Contents

- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Database Setup](#database-setup)
- [API Documentation](#api-documentation)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/0zymandi45/producers-api.git
    ```

2. **Navigate to the project directory**:

    ```bash
    cd your-repo-name
    ```

3. **Install the dependencies**:

    ```bash
    npm install
    ```

4. **Create an `.env` file**:

    Create an `.env` file in the root directory of your project and define the following environment variables:

    ```
    DATABASE_URL=postgresql://youruser:yourpassword@localhost:5432/yourdatabase
    PORT=3000
    ```

    Replace `youruser`, `yourpassword`, and `yourdatabase` with your PostgreSQL credentials and the desired database name.

## Running the Application

1. **Run the database migrations**:

    ```bash
    npm run typeorm migration:run
    ```

2. **Start the application**:

    ```bash
    npm run dev
    ```

    The application will run on `http://localhost:3000`.

## Database Setup

To set up the PostgreSQL database, you can use the following SQL script to create the `producers` table.

### SQL Script

```sql
CREATE TABLE producers (
    id SERIAL PRIMARY KEY,  -- Primary key of the table, automatically generated
    cpf_cnpj VARCHAR(14) NOT NULL UNIQUE,  -- CPF or CNPJ of the producer, required and unique
    name VARCHAR(100) NOT NULL,  -- Name of the producer, required
    farm_name VARCHAR(100) NOT NULL,  -- Name of the farm, required
    city VARCHAR(100) NOT NULL,  -- City where the farm is located, required
    state VARCHAR(2) NOT NULL,  -- State of the farm (2-letter abbreviation), required
    total_area NUMERIC(10, 2),  -- Total area of the property in hectares, allowing decimal values
    cultivable_area NUMERIC(10, 2),  -- Cultivable area of the property in hectares
    vegetation_area NUMERIC(10, 2),  -- Vegetation area of the property in hectares
    crops TEXT[],  -- Array of strings to store different crops grown on the property
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Timestamp when the record was created
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Timestamp of the last update to the record
);

-- Adding an index to facilitate queries by CPF/CNPJ
CREATE INDEX idx_producer_cpf_cnpj ON producers (cpf_cnpj);
