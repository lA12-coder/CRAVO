# Food Delivery Backend

This project is a backend application for a food delivery service that connects customers, delivery personnel, cafes, and an admin panel. It is built using Node.js and Express.

## Features

- **Customer Features:**
  - Sign up and login
  - Browse menu items from various cafes
  - Add items to cart and checkout
  - View order history

- **Delivery Personnel Features:**
  - Sign in to the platform
  - View available orders for delivery
  - Claim orders and mark them as bought
  - Mark orders as delivered

- **Cafe Features:**
  - Sign in to manage cafe operations
  - Create internal orders for food preparation
  - Track delivery progress of orders

- **Admin Features:**
  - Manage customers, delivery personnel, and cafes
  - View order details and handle disputes

## Project Structure

```
food-delivery-backend
├── src
│   ├── server.js
│   ├── controllers
│   │   ├── customerController.js
│   │   ├── deliveryController.js
│   │   ├── cafeController.js
│   │   └── adminController.js
│   ├── routes
│   │   ├── customerRoutes.js
│   │   ├── deliveryRoutes.js
│   │   ├── cafeRoutes.js
│   │   └── adminRoutes.js
│   ├── models
│   │   ├── customer.js
│   │   ├── deliveryPerson.js
│   │   ├── cafe.js
│   │   └── order.js
│   ├── middleware
│   │   └── authMiddleware.js
│   └── utils
│       └── index.js
├── package.json
└── README.md
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd food-delivery-backend
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Start the server:
   ```
   npm start
   ```

5. The server will run at `http://localhost:3000`.

## Technologies Used

- Node.js
- Express
- MongoDB (for database management)
- CORS (for cross-origin resource sharing)
- Body-parser (for parsing incoming request bodies)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features you would like to add.