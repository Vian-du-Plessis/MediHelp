-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 27, 2022 at 09:54 PM
-- Server version: 5.7.24
-- PHP Version: 8.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `medihelp`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `doctor` varchar(255) NOT NULL,
  `patient` varchar(255) NOT NULL,
  `patient_id` varchar(255) NOT NULL,
  `time` varchar(10) NOT NULL,
  `id` int(11) NOT NULL,
  `date` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`doctor`, `patient`, `patient_id`, `time`, `id`, `date`) VALUES
('Jacques Stroup undefined', 'Andrew Smith ', '9608076527085', '10:30:00', 2, '27 June 2022'),
('Dr. Langerhans', 'Andrea Salas', '5406060892084', '09:30:00', 3, '22 June 2022'),
('Dr. Blameworthy', 'Laura Wilson', '3403104972081', '10:30:00', 4, '23 June 2022'),
('Dr. Stroup', 'Shelly Strong', '7504122792082', '11:30:00', 5, '24 June 2022'),
('Dr. Tournkey', 'Robert Howell', '6012219254082', '12:30:00', 6, '25 June 2022'),
('Dr. Gorran', 'Amanda Thomas', '3604222199081', '13:30:00', 7, '26 June 2022'),
('Dr. Stroup', 'Shelly Strong', '7504122792082', '07:30', 254, '1 July 2022'),
('Dr. Langerhans', 'Maureen Howard', '3708092040083', '07:30', 271, '1 July 2022'),
('Dr. Langerhans', 'Maureen Howard', '3708092040083', '07:30', 270, '29 June 2022'),
('Dr. Addison', 'Jane Wright', '6905261740082', '12:03', 272, '1 July 2022'),
('Dr. Addison', 'Jane Wright', '6905261740082', '11:03', 273, '28 June 2022'),
('Dr. Blameworthy', 'Maureen Howard', '3708092040083', '08:30', 275, '1 June 2022'),
('Dr. Blameworthy', 'Maureen Howard', '3708092040083', '08:30', 276, '1 June 2022'),
('Dr. Blameworthy', 'Maureen Howard', '3708092040083', '08:30', 277, '2 June 2022'),
('Dr. Blameworthy', 'Maureen Howard', '3708092040083', '08:30', 278, '30 June 2022'),
('Dr. Blameworthy', 'Maureen Howard', '3708092040083', '08:30', 279, '30 June 2022'),
('Dr. Tournkey', 'Maureen Howard', '3708092040083', '08:30', 280, '2 July 2022');

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `id` int(11) NOT NULL,
  `profile_image` varchar(255) NOT NULL,
  `name_and_surname` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(10) NOT NULL,
  `specialisation` varchar(255) NOT NULL,
  `assigned_room` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`id`, `profile_image`, `name_and_surname`, `age`, `gender`, `email`, `phone_number`, `specialisation`, `assigned_room`) VALUES
(1, 'profiles/1656361760.jpg', 'John  Watson', 30, 'Female', 'johnw@gmail.com', '0831438442', 'Podiatrist', '1A'),
(2, 'profiles/1656562173.jpg', 'Cecil Addison', 45, 'Female', 'cecilad@gmail.com', '0827383476', 'General Practitioner', '2B'),
(3, 'profiles/1656362173.jpg', 'Bartholomew Langerhans', 27, 'Male', 'bartholomew@gmail.com', '0829424434', 'Endocrinologist', '3C'),
(4, 'profiles/1656362173.jpg', 'Sebastian Blameworthy', 55, 'Male', 'sebastian@gmail.com', '0834607220', 'Pediatrician', '4D'),
(5, 'profiles/1656362173.jpg', 'Jacques Stroup', 65, 'Male', 'stroup@gmail.com', '0823490916', 'Rheumatologist', '5E'),
(6, 'profiles/1656562173.jpg', 'Tighe Tournkey', 35, 'Female', 'tourn@gmail.com', '0832645548', 'Psychiatrist', '6F'),
(7, 'profiles/1656562173.jpg', 'Liza Gorran', 48, 'Female', 'liza@gmail.com', '0841489882', 'OB/GYN', '7G'),
(13, 'profiles/1656361760.jpg', 'Vian  du Pssf', 25, 'Male', 'v@gmail.com', '0123456789', 'Podiatrist', '1A'),
(14, 'profiles/1656562173.jpg', 'sfasf sfasf', 12, 'Male', 'sgfa@gmail.com', '0123456789', 'Pediatrician', '7G'),
(15, 'profiles/1656361760.jpg', 'Vian du ', 22, 'Female', 'via@gmail.com', '0123456789', 'Pediatrician', '7G');

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `id` int(11) NOT NULL,
  `name_and_surname` varchar(255) NOT NULL,
  `age` int(3) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `sa_id` varchar(13) NOT NULL,
  `medAidProvider` varchar(255) NOT NULL,
  `medical_aid_number` int(11) NOT NULL,
  `previous_appointments` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`id`, `name_and_surname`, `age`, `gender`, `email`, `phone_number`, `sa_id`, `medAidProvider`, `medical_aid_number`, `previous_appointments`) VALUES
(2, '  Cohe', 36, 'Female', 'markco@gmail.com', '0828587551', '8602296246086', 'Health Squared', 124546, '2018-09-11'),
(3, 'Justin Madden', 37, 'Male', 'maddenjust@gmail.com', '0822568829', '8501169262085', '', 29000, '2022-01-11'),
(4, 'Robert Howell', 62, 'Male', 'howellrob@gmail.com', '0854355905', '6012219254082', '', 61412, '2020-11-11'),
(6, 'Andrew Smith', 26, 'Male', 'smithan@gmail.com', '0838971230', '9608076527085', '', 78799, '2017-06-22'),
(7, 'Adam Hall', 55, 'Male', 'adam@gmail.com', '0839320510', '6701306952083', '', 48135, '2008-09-04'),
(8, 'Amanda Thomas', 86, 'Female', 'thomamanda@gmail.com', '0826101889', '3604222199081', '', 14444, '2010-08-22'),
(9, 'Teresa Morrow', 5, 'Female', 'teresa@gmail.com', '0849801414', '1702032855082', '', 16503, '2009-11-12'),
(11, 'Andrea Salas', 68, 'Female', 'andrea@gmail.com', '0835171527', '5406060892084', '', 91158, '2011-03-18'),
(12, 'Maureen Howard', 85, 'Female', 'maureen@gmail.com', '0847975669', '3708092040083', '', 91341, '2014-10-28'),
(13, 'Laura Wilson', 88, 'Female', 'laura@gmail.com', '0847307781', '3403104972081', '', 92257, '2022-04-21'),
(14, 'Shelly Strong', 47, 'Female', 'shelly@gmail.com', '0847408456', '7504122792082', '', 66451, '2022-03-04'),
(15, 'Jennifer Lopez', 14, 'Female', 'jennifer@gmail.com', '0845798338', '0812223683085', '', 68080, '2022-05-10'),
(16, 'Jane Wright', 53, 'Female', 'jane.wright@gmail.com', '0845522236', '6905261740082', '', 677898, '2022-01-05'),
(17, 'Jane Wright', 53, 'Female', 'jane.wright@gmail.com', '0845522236', '6905261740082', '', 677898, '2022-01-05'),
(18, 'Stephanie Powell', 53, 'Female', 'stephanie.powell@gmail.com', '0845522236', '6905261740082', '', 677898, '2022-01-05'),
(31, 'Leander Aarde', 20, 'Female', 'viand@gmail.com', '0123456789', '0202215108087', 'Discovery Health', 25452, ' ');

-- --------------------------------------------------------

--
-- Table structure for table `receptionists`
--

CREATE TABLE `receptionists` (
  `profile_image` varchar(255) NOT NULL,
  `name_and_surname` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `admin` tinyint(1) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `receptionists`
--

INSERT INTO `receptionists` (`profile_image`, `name_and_surname`, `age`, `gender`, `phone_number`, `email`, `password`, `admin`, `id`) VALUES
('profiles/1656362042.jpg', 'Vian du Plessis', 21, 'Female', '0648971069', 'viandupie@gmail.com', 'd8062b44702e71da56c276ca51c08acd', 1, 11),
('profiles/1656362177.jpg', 'Lori Watson', 45, 'Female', '0836040599', 'watsonlori@gmail.com', '429ad19faf5c2bbb2cc9681eed18809a', 0, 12),
('profiles/1656366652.jpg', 'Leander van Aarde', 26, 'Male', '0123456789', 'lean@gmail.com', '1a0465648ff77418209f95a749b0ffe4', 0, 13);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `receptionists`
--
ALTER TABLE `receptionists`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=281;

--
-- AUTO_INCREMENT for table `doctors`
--
ALTER TABLE `doctors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `receptionists`
--
ALTER TABLE `receptionists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
