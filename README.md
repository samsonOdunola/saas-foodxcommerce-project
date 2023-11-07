# Food E-commerce Backend Application

This repository contains the source code for a Node.js-based backend application for a food delivery service. This backend provides the necessary functionalities to manage restaurants, menu items, orders, and user accounts for a food delivery platform.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before setting up and running this application, make sure you have the following prerequisites installed on your system:

- [Node.js](https://nodejs.org/) (v12.0.0 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [mySQL Work Bench](https://dev.mysql.com/downloads/workbench/) (Make sure the mySQL server is running)

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/samsonOdunola/saas-foodxcommerce-project.git
   ```

2. Navigate to the project directory:

   ```bash
   cd saas-foodxcommerce-project
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

## Configuration

The configuration for the application is stored in the `config` directory. You should create a `.env` file in the root of the project and set the following environment variables:

```env
PORT = 3000
DB_HOST = localhost
DB_USER = root
DB_PASSWORD = admin
DB = food_commerce_db
EMAIL_USER = email address for sending notifications
EMAIL_PASSWORD = password for email
CLIENT_ID = client id for email service
CLIENT_SECRET = client secret for email service
REFRESH_TOKEN = refresh token for email service
HOST = http://localhost
JWT_KEY = secret key for jason web token
PAYSTACK_SECRET = paystack secret key for payment
PAYSTACK_CALLBACK_URL = callback url for paystack
```

## Usage

To start the application, run the following command:

```bash
npm start
```

The server will start and listen on the port specified in your `.env` file (default is 3000).

## API Endpoints

The application provides the following API endpoints:

- **/api/restaurants**:
  - GET: Retrieve a list of all restaurants.
  - POST: Create a new restaurant.

- **/api/restaurants/:id**:
  - GET: Retrieve a specific restaurant by ID.
  - PUT: Update a specific restaurant.
  - DELETE: Delete a specific restaurant.

- **/api/menu**:
  - GET: Retrieve a list of all menu items.
  - POST: Create a new menu item.

- **/api/menu/:id**:
  - GET: Retrieve a specific menu item by ID.
  - PUT: Update a specific menu item.
  - DELETE: Delete a specific menu item.

- **/api/orders**:
  - GET: Retrieve a list of all orders.
  - POST: Create a new order.

- **/api/orders/:id**:
  - GET: Retrieve a specific order by ID.
  - PUT: Update a specific order.
  - DELETE: Delete a specific order.

- **/api/auth/register**:
  - POST: Register a new user account.

- **/api/auth/login**:
  - POST: Login and obtain a JWT token for authentication.

Please refer to the source code for detailed information on how to use these endpoints.

## Database Schema

The application uses MongoDB as its database. The schema for the database can be found in the `models` directory.

## Contributing

If you want to contribute to this project, please fork the repository and create a pull request with your changes. Make sure to follow the [Contribution Guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE). You are free to use and modify the code for your own purposes.