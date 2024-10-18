/* makeDB.sql */ 

DROP DATABASE SlushieApp_DB; 
CREATE DATABASE SlushieApp_DB;
USE SlushieApp_DB;

DROP TABLE IF EXISTS customers; 
CREATE TABLE customers ( 
    customerID INT AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(100) NOT NULL, 
    email VARCHAR(100) UNIQUE NOT NULL,
    customerAddress VARCHAR(255) NOT NULL, 
    password VARCHAR(255) NOT NULL
); 
TRUNCATE TABLE customers; 

DROP TABLE IF EXISTS flavors; 
CREATE TABLE flavors ( 
    flavorID INT AUTO_INCREMENT PRIMARY KEY, 
    flavorName VARCHAR(100) UNIQUE NOT NULL
);
TRUNCATE TABLE flavors; 

DROP TABLE IF EXISTS favorites;
CREATE TABLE favorites ( 
    favoriteID INT AUTO_INCREMENT PRIMARY KEY, 
    customerID INT NOT NULL, 
    flavor1ID INT NOT NULL, 
    flavor2ID INT DEFAULT NULL,
    flavor3ID INT DEFAULT NULL,
    FOREIGN KEY (customerID) REFERENCES customers(customerID),
    FOREIGN KEY (flavor1ID) REFERENCES flavors(flavorID),
    FOREIGN KEY (flavor2ID) REFERENCES flavors(flavorID),
    FOREIGN KEY (flavor3ID) REFERENCES flavors(flavorID)
);
TRUNCATE TABLE favorites; 

DROP TABLE IF EXISTS restaurant;
CREATE TABLE restaurant ( 
    restaurantID INT AUTO_INCREMENT PRIMARY KEY, 
    restaurantName VARCHAR(100) NOT NULL, 
    restaurantAddress VARCHAR(255) UNIQUE NOT NULL
);
TRUNCATE TABLE restaurant; 

DROP TABLE IF EXISTS orders; 
CREATE TABLE orders ( 
    orderID INT AUTO_INCREMENT PRIMARY KEY, 
    customerID INT NOT NULL,
    orderPrice INT NOT NULL,  
    deliveryAddress VARCHAR(255) DEFAULT NULL,  
    restaurantID INT NOT NULL, 
    flavor1ID INT NOT NULL,  
    flavor2ID INT DEFAULT NULL,  
    flavor3ID INT DEFAULT NULL,  
    FOREIGN KEY (customerID) REFERENCES customers(customerID),
    FOREIGN KEY (restaurantID) REFERENCES restaurant(restaurantID),
    FOREIGN KEY (flavor1ID) REFERENCES flavors(flavorID),
    FOREIGN KEY (flavor2ID) REFERENCES flavors(flavorID),
    FOREIGN KEY (flavor3ID) REFERENCES flavors(flavorID)
);
TRUNCATE TABLE orders;
