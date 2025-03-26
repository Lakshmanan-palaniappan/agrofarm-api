--CREATE TABLE Users (
--    user_id INT PRIMARY KEY IDENTITY,
--    name VARCHAR(100),
--    email VARCHAR(100) UNIQUE,
--    password VARCHAR(255),
--    role VARCHAR(50),
--    phone VARCHAR(20),
--    address TEXT,
--    created_at DATETIME DEFAULT GETDATE(),
--    updated_at DATETIME DEFAULT GETDATE()
--);

---- Products Table
--CREATE TABLE Products (
--    product_id INT PRIMARY KEY IDENTITY,
--    user_id INT FOREIGN KEY REFERENCES Users(user_id),
--    product_name VARCHAR(100),
--    category VARCHAR(50),
--    price DECIMAL(10,2),
--    quantity INT,
--    description TEXT,
--    image_url VARCHAR(255),
--    status VARCHAR(20),
--    created_at DATETIME DEFAULT GETDATE(),
--    updated_at DATETIME DEFAULT GETDATE()
--);

---- Orders Table
--CREATE TABLE Orders (
--    order_id INT PRIMARY KEY IDENTITY,
--    buyer_id INT FOREIGN KEY REFERENCES Users(user_id),
--    farmer_id INT FOREIGN KEY REFERENCES Users(user_id),
--    product_id INT FOREIGN KEY REFERENCES Products(product_id),
--    quantity INT,
--    total_price DECIMAL(10,2),
--    order_status VARCHAR(50),
--    created_at DATETIME DEFAULT GETDATE(),
--    updated_at DATETIME DEFAULT GETDATE()
--);

CREATE TABLE transacttions(
transaction_id INT PRIMARY KEY IDENTITY,
order_id INT FOREIGN KEY REFERENCES Orders(order_id),
payment_method VARCHAR(50),
amount DECIMAL(10,2),
status VARCHAR(50),
transaction_date DATETIME DEFAULT GETDATE()

);

CREATE TABLE Reviews (
    review_id INT PRIMARY KEY IDENTITY,
    product_id INT FOREIGN KEY REFERENCES Products(product_id),
    user_id INT FOREIGN KEY REFERENCES Users(user_id),
    rating INT,
    comment TEXT,
    created_at DATETIME DEFAULT GETDATE()
);


