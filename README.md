# E-commerce Admin Dashboard API

This project provides a backend API for managing products, sales, inventory, and revenue analysis for an e-commerce admin dashboard.

## Setup Instructions

### 1. Clone the Repository

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory and add the following:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ecommerce
```

### 4. Run the Seed Script (optional)

To populate the database with demo data:

```bash
npm run seed
```

### 5. Start the Server

```bash
npm start
```

---

## 📦 Tech Stack

* **Programming Language:** JavaScript
* **Framework:** Node.js with Express.js
* **ORM:** Sequelize
* **Database:** MySQL
* **API Type:** RESTful API

---

## API Endpoints postman collection
https://documenter.getpostman.com/view/7936845/2sB2qdffG4

## Notes

* Sequelize is used for database modeling and interaction.
* The revenue endpoint uses `Sequelize.fn('SUM', ...)` to aggregate sale data.
* MySQL must be running and accessible with the credentials provided in `.env`.

