/* makeDB.sql */ 

DROP DATABASE SlushieApp_DB; 
CREATE DATABASE SlushieApp_DB;
USE SlushieApp_DB;

DROP TABLE IF EXISTS customers; 
CREATE TABLE customers ( 
    customerID VARCHAR(50) PRIMARY KEY, 
    name VARCHAR(100) NOT NULL, 
    email VARCHAR(100) UNIQUE NOT NULL,
    customerAddress VARCHAR(255) NOT NULL, 
    password VARCHAR(255) NOT NULL
); 
TRUNCATE TABLE customers; 

DROP TABLE IF EXISTS flavors; 
CREATE TABLE flavors ( 
    flavorID VARCHAR(50) PRIMARY KEY, 
    flavorName VARCHAR(100) UNIQUE NOT NULL
);
TRUNCATE TABLE flavors; 

DROP TABLE IF EXISTS favorites;
CREATE TABLE favorites ( 
    favoriteID VARCHAR(50) PRIMARY KEY, 
    customerID VARCHAR(50) NOT NULL, 
    flavor1ID VARCHAR(50) NOT NULL, 
    flavor2ID VARCHAR(50) DEFAULT NULL,
    flavor3ID VARCHAR(50) DEFAULT NULL,
    FOREIGN KEY (customerID) REFERENCES customers(customerID),
    FOREIGN KEY (flavor1ID) REFERENCES flavors(flavorID),
    FOREIGN KEY (flavor2ID) REFERENCES flavors(flavorID),
    FOREIGN KEY (flavor3ID) REFERENCES flavors(flavorID)
);
TRUNCATE TABLE favorites; 

DROP TABLE IF EXISTS restaurants;
CREATE TABLE restaurants ( 
    restaurantID VARCHAR(50) PRIMARY KEY, 
    restaurantName VARCHAR(100) NOT NULL, 
    restaurantAddress VARCHAR(255) UNIQUE NOT NULL
);
TRUNCATE TABLE restaurants; 

DROP TABLE IF EXISTS orders; 
CREATE TABLE orders ( 
    orderID VARCHAR(50) PRIMARY KEY, 
    customerID VARCHAR(50) NOT NULL,
    orderPrice VARCHAR(50) NOT NULL,  
    deliveryAddress VARCHAR(255) DEFAULT NULL,  
    restaurantID VARCHAR(50) NOT NULL, 
    flavor1ID VARCHAR(50) NOT NULL,  
    flavor2ID VARCHAR(50) DEFAULT NULL,  
    flavor3ID VARCHAR(50) DEFAULT NULL,  
    FOREIGN KEY (customerID) REFERENCES customers(customerID),
    FOREIGN KEY (restaurantID) REFERENCES restaurants (restaurantID),
    FOREIGN KEY (flavor1ID) REFERENCES flavors(flavorID),
    FOREIGN KEY (flavor2ID) REFERENCES flavors(flavorID),
    FOREIGN KEY (flavor3ID) REFERENCES flavors(flavorID)
);
TRUNCATE TABLE orders;
