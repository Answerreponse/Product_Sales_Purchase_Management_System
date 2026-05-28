-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 28, 2026 at 10:53 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `purchase_sales_ms`
--

-- --------------------------------------------------------

--
-- Table structure for table `purchased_stock`
--

CREATE TABLE `purchased_stock` (
  `p_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `stock_name` varchar(255) DEFAULT NULL,
  `purchase_date` date DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `purchased_stock`
--

INSERT INTO `purchased_stock` (`p_id`, `user_id`, `stock_name`, `purchase_date`, `quantity`, `amount`) VALUES
(1, 1, 'disk', '2026-05-06', 3, 2000);

-- --------------------------------------------------------

--
-- Table structure for table `sold_stock`
--

CREATE TABLE `sold_stock` (
  `s_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `stock_name` varchar(255) DEFAULT NULL,
  `sale_date` date DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sold_stock`
--

INSERT INTO `sold_stock` (`s_id`, `user_id`, `stock_name`, `sale_date`, `quantity`, `amount`) VALUES
(1, 1, 'disk', '2026-05-07', 2, 3000),
(2, 1, 'disk', '2026-05-12', 1, 1000);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`) VALUES
(1, 'repo', '$2b$10$t6pGc1go/hdD5qwWZUmCFOxIJihuBFTu6NY9wEWLZEEW0x/MDeW4y');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `purchased_stock`
--
ALTER TABLE `purchased_stock`
  ADD PRIMARY KEY (`p_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `sold_stock`
--
ALTER TABLE `sold_stock`
  ADD PRIMARY KEY (`s_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `purchased_stock`
--
ALTER TABLE `purchased_stock`
  MODIFY `p_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sold_stock`
--
ALTER TABLE `sold_stock`
  MODIFY `s_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `purchased_stock`
--
ALTER TABLE `purchased_stock`
  ADD CONSTRAINT `purchased_stock_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `sold_stock`
--
ALTER TABLE `sold_stock`
  ADD CONSTRAINT `sold_stock_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
