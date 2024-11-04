-- MySQL dump 10.13  Distrib 9.0.1, for macos14.4 (arm64)
--
-- Host: localhost    Database: SlushieApp_DB
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `branches`
--

DROP TABLE IF EXISTS `branches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branches` (
  `branchID` varchar(50) NOT NULL,
  `branchName` varchar(100) NOT NULL,
  `branchAddress` varchar(255) NOT NULL,
  PRIMARY KEY (`branchID`),
  UNIQUE KEY `branchAddress` (`branchAddress`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branches`
--

LOCK TABLES `branches` WRITE;
/*!40000 ALTER TABLE `branches` DISABLE KEYS */;
/*!40000 ALTER TABLE `branches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `combo`
--

DROP TABLE IF EXISTS `combo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `combo` (
  `comboID` varchar(50) NOT NULL,
  `customerID` varchar(50) NOT NULL,
  `flavor1ID` varchar(50) NOT NULL,
  `flavor2ID` varchar(50) DEFAULT NULL,
  `flavor3ID` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`comboID`),
  KEY `customerID` (`customerID`),
  KEY `flavor1ID` (`flavor1ID`),
  KEY `flavor2ID` (`flavor2ID`),
  KEY `flavor3ID` (`flavor3ID`),
  CONSTRAINT `combo_ibfk_1` FOREIGN KEY (`customerID`) REFERENCES `customers` (`customerID`),
  CONSTRAINT `combo_ibfk_2` FOREIGN KEY (`flavor1ID`) REFERENCES `flavors` (`flavorID`),
  CONSTRAINT `combo_ibfk_3` FOREIGN KEY (`flavor2ID`) REFERENCES `flavors` (`flavorID`),
  CONSTRAINT `combo_ibfk_4` FOREIGN KEY (`flavor3ID`) REFERENCES `flavors` (`flavorID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `combo`
--

LOCK TABLES `combo` WRITE;
/*!40000 ALTER TABLE `combo` DISABLE KEYS */;
/*!40000 ALTER TABLE `combo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `customerID` varchar(50) NOT NULL,
  `customerName` varchar(100) NOT NULL,
  `customerEmail` varchar(100) NOT NULL,
  `customerAddress` varchar(255) NOT NULL,
  `customerPassword` varchar(255) NOT NULL,
  PRIMARY KEY (`customerID`),
  UNIQUE KEY `customerEmail` (`customerEmail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES ('c6','jax','jax@gmail.com','400 Cedar Ave, West Long Branch, NJ 07764','jax123');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flavors`
--

DROP TABLE IF EXISTS `flavors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flavors` (
  `flavorID` varchar(50) NOT NULL,
  `flavorName` varchar(100) NOT NULL,
  PRIMARY KEY (`flavorID`),
  UNIQUE KEY `flavorName` (`flavorName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flavors`
--

LOCK TABLES `flavors` WRITE;
/*!40000 ALTER TABLE `flavors` DISABLE KEYS */;
/*!40000 ALTER TABLE `flavors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `orderID` varchar(50) NOT NULL,
  `customerID` varchar(50) NOT NULL,
  `price` varchar(50) NOT NULL,
  `deliveryAddress` varchar(255) DEFAULT NULL,
  `branchID` varchar(50) NOT NULL,
  `flavor1ID` varchar(50) NOT NULL,
  `flavor2ID` varchar(50) DEFAULT NULL,
  `flavor3ID` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`orderID`),
  KEY `customerID` (`customerID`),
  KEY `branchID` (`branchID`),
  KEY `flavor1ID` (`flavor1ID`),
  KEY `flavor2ID` (`flavor2ID`),
  KEY `flavor3ID` (`flavor3ID`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customerID`) REFERENCES `customers` (`customerID`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`branchID`) REFERENCES `branches` (`branchID`),
  CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`flavor1ID`) REFERENCES `flavors` (`flavorID`),
  CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`flavor2ID`) REFERENCES `flavors` (`flavorID`),
  CONSTRAINT `orders_ibfk_5` FOREIGN KEY (`flavor3ID`) REFERENCES `flavors` (`flavorID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-04 11:00:18
