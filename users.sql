-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 08, 2026 at 11:06 PM
-- Server version: 11.4.9-MariaDB-cll-lve
-- PHP Version: 8.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `supecbrr_superwindb`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `profile` varchar(2000) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `is_changed_password` int(11) NOT NULL DEFAULT 1,
  `type` varchar(255) NOT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  `teacher_id` bigint(20) UNSIGNED DEFAULT NULL COMMENT 'Head Teacher ID - Student belong to Head Teacher',
  `agent_id` bigint(20) UNSIGNED DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_name`, `name`, `age`, `phone`, `email`, `email_verified_at`, `password`, `profile`, `status`, `is_changed_password`, `type`, `user_agent`, `teacher_id`, `agent_id`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'superwin', 'SuperWin', NULL, '09123456789', NULL, NULL, '$2y$12$k1jtMmjC8LcNJJv2l/ymPee7cwsOFlUaFg90ID/AKryDKDri3OHg6', NULL, 1, 1, 'super_admin', NULL, NULL, NULL, NULL, '2026-01-09 08:50:43', '2026-01-09 08:50:43'),
(2, 'user', 'User', NULL, '09123456797', NULL, NULL, '$2y$12$xUitEm81dxA/RdEpjcr16e5EWaGcv9puLAKLKR2Hnyfr9b6Z5/3R2', NULL, 1, 1, 'user', NULL, NULL, NULL, NULL, '2026-01-09 08:50:43', '2026-01-09 08:50:43'),
(3, 'user001', 'User 1', NULL, '09111111111', NULL, NULL, '$2y$12$hgJOoGJu56iBlEJDjLW19.Eyt9A/Uj3bDcpc30chZMDROQUy3zEFm', NULL, 1, 1, 'user', NULL, NULL, NULL, NULL, '2026-01-09 08:50:44', '2026-01-09 08:50:44'),
(4, 'user002', 'User 2', NULL, '09111111112', NULL, NULL, '$2y$12$nHC7MwZedsDtA7N1d6jwWen.92FGNkNZgT.HsQnu1gCPb8Fp3uxp2', NULL, 1, 1, 'user', NULL, NULL, NULL, NULL, '2026-01-09 08:50:44', '2026-01-09 08:50:44'),
(5, 'user003', 'User 3', NULL, '09111111113', NULL, NULL, '$2y$12$1cDNCryvYr1LhbdB.L.jcu761Ew3BtVdOFzTZrx2vPW13J642TG/m', NULL, 1, 1, 'user', NULL, NULL, NULL, NULL, '2026-01-09 08:50:44', '2026-01-09 08:50:44');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_user_name_unique` (`user_name`),
  ADD UNIQUE KEY `users_phone_unique` (`phone`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_agent_id_foreign` (`agent_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_agent_id_foreign` FOREIGN KEY (`agent_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
