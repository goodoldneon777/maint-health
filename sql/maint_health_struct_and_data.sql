-- phpMyAdmin SQL Dump
-- version 4.4.1.1
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Dec 06, 2015 at 06:33 PM
-- Server version: 5.5.42
-- PHP Version: 5.6.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `maint_health`
--

-- --------------------------------------------------------

--
-- Table structure for table `equip`
--

CREATE TABLE `equip` (
  `equip_id` int(11) NOT NULL,
  `area` varchar(100) NOT NULL,
  `unit` varchar(100) NOT NULL,
  `unit_sub` varchar(100) DEFAULT NULL,
  `equip_name` varchar(100) NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `equip`
--

INSERT INTO `equip` (`equip_id`, `area`, `unit`, `unit_sub`, `equip_name`, `status`) VALUES
(1, 'STEEL', 'MAT_HAND', NULL, 'Transfer Car', 'IN'),
(2, 'STEEL', 'MAT_HAND', NULL, 'Ladle Carrier', 'IN'),
(3, 'STEEL', 'MAT_HAND', NULL, 'Crane 118', 'AVAIL_SPARE');

-- --------------------------------------------------------

--
-- Table structure for table `equip_comment`
--

CREATE TABLE `equip_comment` (
  `comment_seq` int(11) NOT NULL,
  `equip_id` int(11) NOT NULL,
  `comment_dt` datetime NOT NULL,
  `comment_text` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `param`
--

CREATE TABLE `param` (
  `param_type` varchar(100) NOT NULL,
  `param_value` varchar(100) NOT NULL,
  `param_text` varchar(100) DEFAULT NULL,
  `param_color` varchar(20) DEFAULT NULL,
  `order_num` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `param`
--

INSERT INTO `param` (`param_type`, `param_value`, `param_text`, `param_color`, `order_num`) VALUES
('EQUIP_STATUS', 'AVAIL_SPARE', 'Available Backup/Spare', '#fdfe98', 2),
('EQUIP_STATUS', 'IN', 'In Service', '#7ff278', 1),
('EQUIP_STATUS', 'IN_NEED', 'In Service - Needs Addressing', '#ff9899', 3),
('EQUIP_STATUS', 'OUT', 'Out of Service - Needs Addressing', '#8f5aa7', 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `equip`
--
ALTER TABLE `equip`
  ADD PRIMARY KEY (`equip_id`),
  ADD UNIQUE KEY `area` (`area`,`unit`,`unit_sub`,`equip_name`);

--
-- Indexes for table `equip_comment`
--
ALTER TABLE `equip_comment`
  ADD PRIMARY KEY (`comment_seq`);

--
-- Indexes for table `param`
--
ALTER TABLE `param`
  ADD PRIMARY KEY (`param_type`,`param_value`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `equip_comment`
--
ALTER TABLE `equip_comment`
  MODIFY `comment_seq` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=17;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
