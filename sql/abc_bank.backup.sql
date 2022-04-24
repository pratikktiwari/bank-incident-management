-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 24, 2022 at 02:12 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 7.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `abc_bank`
--

-- --------------------------------------------------------

--
-- Table structure for table `incident`
--

CREATE TABLE `incident` (
  `incidentId` int(11) NOT NULL,
  `incidentType` varchar(256) DEFAULT NULL,
  `severityLevel` varchar(256) DEFAULT NULL,
  `accountNumber` varchar(1024) DEFAULT NULL,
  `customerName` varchar(512) DEFAULT NULL,
  `incidentTitle` varchar(256) DEFAULT NULL,
  `incidentDescription` text DEFAULT NULL,
  `assignedTo` int(11) DEFAULT NULL,
  `createdDate` datetime DEFAULT current_timestamp(),
  `status` varchar(256) DEFAULT 'CREATED',
  `clearedDate` datetime DEFAULT NULL,
  `comments` text DEFAULT '[]'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `incident`
--

INSERT INTO `incident` (`incidentId`, `incidentType`, `severityLevel`, `accountNumber`, `customerName`, `incidentTitle`, `incidentDescription`, `assignedTo`, `createdDate`, `status`, `clearedDate`, `comments`) VALUES
(1, 'ATM issue', 'Medium', '57927665430', 'Ram Shyam', 'ATM Card fraud', 'Money deducted after sharing OTP with hacker', 2, '2022-04-24 11:10:54', 'IN PROGRESS', NULL, '[\"Work to be started soon\",\"Work started\"]'),
(2, 'Server Outage', 'Critical', 'NA      ', 'All customers', 'Bangalore server is down', 'Bangalore bank server is down due to city level power outage', 2, '2022-04-24 11:14:34', 'CREATED', NULL, '[]');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userId` int(11) NOT NULL,
  `userEmail` varchar(256) NOT NULL,
  `password` varchar(500) NOT NULL,
  `fullName` varchar(500) NOT NULL,
  `division` varchar(500) NOT NULL,
  `isAdmin` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userId`, `userEmail`, `password`, `fullName`, `division`, `isAdmin`) VALUES
(1, 'manager@abc-bank.com', 'test1234', 'Gaurav Yadav', '', 1),
(2, 'ram@abc-bank.com', 'test1234', 'Mr Ram', 'legal', 0),
(3, 'krishna@abc-bank.com', 'test1234', 'Mr Krishna', 'credit', 0),
(4, 'sita@abc-bank.com', 'test1234', 'Ms Sita', 'legal', 0),
(5, 'radha@abc-bank.com', 'test1234', 'Ms Radha', 'credit', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `incident`
--
ALTER TABLE `incident`
  ADD PRIMARY KEY (`incidentId`),
  ADD KEY `assignedTo` (`assignedTo`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `userEmail` (`userEmail`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `incident`
--
ALTER TABLE `incident`
  MODIFY `incidentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `incident`
--
ALTER TABLE `incident`
  ADD CONSTRAINT `incident_ibfk_1` FOREIGN KEY (`assignedTo`) REFERENCES `user` (`userId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
