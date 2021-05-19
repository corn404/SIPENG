-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: May 18, 2021 at 06:22 PM
-- Server version: 8.0.23
-- PHP Version: 7.4.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_sipeng`
--

-- --------------------------------------------------------

--
-- Table structure for table `knex_migrations`
--

CREATE TABLE `knex_migrations` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `batch` int DEFAULT NULL,
  `migration_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `knex_migrations`
--

INSERT INTO `knex_migrations` (`id`, `name`, `batch`, `migration_time`) VALUES
(7, '20210214083413_database.js', 1, '2021-05-04 16:24:02');

-- --------------------------------------------------------

--
-- Table structure for table `knex_migrations_lock`
--

CREATE TABLE `knex_migrations_lock` (
  `index` int UNSIGNED NOT NULL,
  `is_locked` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `knex_migrations_lock`
--

INSERT INTO `knex_migrations_lock` (`index`, `is_locked`) VALUES
(1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `t_fakultas`
--

CREATE TABLE `t_fakultas` (
  `id` int UNSIGNED NOT NULL,
  `nama_fakultas` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `t_fakultas`
--

INSERT INTO `t_fakultas` (`id`, `nama_fakultas`) VALUES
(2, 'PERTANIAN');

-- --------------------------------------------------------

--
-- Table structure for table `t_kategori`
--

CREATE TABLE `t_kategori` (
  `id` int UNSIGNED NOT NULL,
  `kategori` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `t_kategori`
--

INSERT INTO `t_kategori` (`id`, `kategori`) VALUES
(1, 'KHS (Kartu Hasil Studi)'),
(2, 'Perkuliahan'),
(3, 'Kartu Tanda Mahasiswa'),
(4, 'Biodata Mahasiswa');

-- --------------------------------------------------------

--
-- Table structure for table `t_mahasiswa`
--

CREATE TABLE `t_mahasiswa` (
  `id` int UNSIGNED NOT NULL,
  `nim` varchar(255) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `kelamin` enum('L','P') NOT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  `id_fakultas` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `t_mahasiswa`
--

INSERT INTO `t_mahasiswa` (`id`, `nim`, `nama`, `kelamin`, `alamat`, `id_fakultas`) VALUES
(1, '1234', 'Hermanto Lakoro', 'L', 'Limboto', 2),
(2, '4321', 'Test Mahasiswa', 'L', 'Limboto Barat', 2);

-- --------------------------------------------------------

--
-- Table structure for table `t_pengaduan`
--

CREATE TABLE `t_pengaduan` (
  `id` int UNSIGNED NOT NULL,
  `tgl_pengaduan` datetime NOT NULL,
  `id_kategori` int NOT NULL,
  `id_fakultas` int NOT NULL,
  `id_pengadu` int NOT NULL,
  `keterangan` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `balasan` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `foto` text NOT NULL,
  `status` int NOT NULL DEFAULT '0' COMMENT '0=belum dibalas, 1=dibalas'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `t_pengaduan`
--

INSERT INTO `t_pengaduan` (`id`, `tgl_pengaduan`, `id_kategori`, `id_fakultas`, `id_pengadu`, `keterangan`, `balasan`, `foto`, `status`) VALUES
(3, '2021-05-15 00:00:00', 2, 2, 1, 'TEst', 'test hehehehe', '20210515_225047_IMG20210501184745.jpg', 1),
(4, '2021-05-15 00:00:00', 2, 2, 1, 'ini pesan pengduan', 'test isi pesan balasan', '20210515_225645_sekolahkoding_20201111_2.png', 1),
(6, '2021-05-19 00:00:00', 4, 2, 1, 'test', 'testsashajshajs', '20210519_012401_Screenshot_2021-05-17-13-21-53-28.png', 1),
(7, '2021-05-19 00:00:00', 4, 2, 1, 'tes pengduan mahasiswa', NULL, '20210519_013531_IMG_20210512_142657_037.jpg', 0);

-- --------------------------------------------------------

--
-- Table structure for table `t_prodi`
--

CREATE TABLE `t_prodi` (
  `id` int UNSIGNED NOT NULL,
  `nama_prodi` varchar(255) NOT NULL,
  `id_fakultas` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `t_users`
--

CREATE TABLE `t_users` (
  `uuid` char(36) NOT NULL DEFAULT (uuid()),
  `nama_lengkap` varchar(255) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `role` enum('admin','user','mahasiswa') NOT NULL,
  `status` int UNSIGNED NOT NULL DEFAULT '1' COMMENT '1=aktif,2=blokir',
  `id_pengguna` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `t_users`
--

INSERT INTO `t_users` (`uuid`, `nama_lengkap`, `username`, `password`, `role`, `status`, `id_pengguna`, `created_at`, `updated_at`) VALUES
('178957e3-acb2-11eb-87ff-0242ac150003', 'Hermanto Lakoro', '1234', '$2a$12$eTeLlxUJOLex9DzDoE5wLeaLnRugtXmeFwKlrUdt8mSlrgd8pQ4Vq', 'mahasiswa', 1, '1', '2021-05-04 08:24:06', '2021-05-04 08:24:06'),
('802a96e4-b7c1-11eb-b94e-0242ac150003', 'Hermanto Lakoro', '111', '$2a$12$YqPqow4X.Xq2GiqZb0mr1OE4wtDLmwvuycGfy63fdUsNVFRBY5GIW', 'admin', 1, '0', '2021-05-18 10:12:07', '2021-05-18 10:12:07'),
('9a4bcc1b-b7cc-11eb-b94e-0242ac150003', 'admin', 'admin', '$2a$12$TfAPIFffZzgb3Q.lx2OEa.j5p/t71CoYpLs7OZSGexh75zqgS/yqW', 'admin', 1, '0', '2021-05-18 11:31:35', '2021-05-18 11:31:35'),
('b0671910-b7e7-11eb-b94e-0242ac150003', 'Test Mahasiswa', '4321', '$2a$12$QBrMqL0FmwCDQoZWX.8Gou.yYnsfYCOUplErct.0qcNoLnkhysU12', 'mahasiswa', 1, '2', '2021-05-18 14:45:28', '2021-05-18 14:45:28');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `knex_migrations`
--
ALTER TABLE `knex_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `knex_migrations_lock`
--
ALTER TABLE `knex_migrations_lock`
  ADD PRIMARY KEY (`index`);

--
-- Indexes for table `t_fakultas`
--
ALTER TABLE `t_fakultas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `t_kategori`
--
ALTER TABLE `t_kategori`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `t_mahasiswa`
--
ALTER TABLE `t_mahasiswa`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `t_pengaduan`
--
ALTER TABLE `t_pengaduan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `t_prodi`
--
ALTER TABLE `t_prodi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `t_users`
--
ALTER TABLE `t_users`
  ADD PRIMARY KEY (`uuid`),
  ADD UNIQUE KEY `t_users_uuid_unique` (`uuid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `knex_migrations`
--
ALTER TABLE `knex_migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `knex_migrations_lock`
--
ALTER TABLE `knex_migrations_lock`
  MODIFY `index` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `t_fakultas`
--
ALTER TABLE `t_fakultas`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `t_kategori`
--
ALTER TABLE `t_kategori`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `t_mahasiswa`
--
ALTER TABLE `t_mahasiswa`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `t_pengaduan`
--
ALTER TABLE `t_pengaduan`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `t_prodi`
--
ALTER TABLE `t_prodi`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
