CREATE DATABASE IF NOT EXISTS bookcare CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE bookcare;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  role ENUM('admin','doctor','patient') DEFAULT 'patient',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS doctors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  specialty VARCHAR(100),
  available_hours VARCHAR(100),
  email VARCHAR(100) UNIQUE
);

CREATE TABLE IF NOT EXISTS appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT,
  doctor_id INT,
  date DATETIME,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS specialties (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  icon VARCHAR(16) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS clinics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  address VARCHAR(200),
  tags VARCHAR(200),
  stars DECIMAL(2,1) DEFAULT 4.5
);

CREATE TABLE IF NOT EXISTS posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  excerpt VARCHAR(500),
  tag VARCHAR(50),
  reading VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- bcrypt hash for 'password'
-- $2b$10$0qYkPZ7zOZfC6k5YsvX59uGxF2vX7QkAsM7jykWcvCLe.LBkaGBnS
INSERT IGNORE INTO users (id,name,email,password,role) VALUES
(1,'Admin','admin@bookcare.vn','$2b$10$0qYkPZ7zOZfC6k5YsvX59uGxF2vX7QkAsM7jykWcvCLe.LBkaGBnS','admin'),
(2,'Dr. Nguyễn Văn A','doctor1@bookcare.vn','$2b$10$0qYkPZ7zOZfC6k5YsvX59uGxF2vX7QkAsM7jykWcvCLe.LBkaGBnS','doctor'),
(3,'Patient One','patient1@bookcare.vn','$2b$10$0qYkPZ7zOZfC6k5YsvX59uGxF2vX7QkAsM7jykWcvCLe.LBkaGBnS','patient');

INSERT IGNORE INTO doctors (id,name,specialty,available_hours,email) VALUES
(1,'Dr. Nguyễn Văn A','Cardiology','Mon-Fri 09:00-12:00','doctor1@bookcare.vn');

INSERT IGNORE INTO specialties (id, name, icon) VALUES
(1,'Cơ xương khớp','🦴'),(2,'Tiêu hoá','🫃'),(3,'Tim mạch','❤️'),(4,'Tai Mũi Họng','👂');

INSERT IGNORE INTO clinics (id, name, address, tags, stars) VALUES
(1,'Hệ thống Y tế Thu Cúc TCI','Hà Nội','Đa khoa,Khám tổng quát',4.8),
(2,'MEDLATEC','Toàn quốc','Xét nghiệm,Tổng quát',4.7);

INSERT IGNORE INTO posts (id, title, excerpt, tag, reading) VALUES
(1,'Khám tim mạch: Quy trình & chi phí','Hướng dẫn chọn bác sĩ tim mạch và chuẩn bị trước khi khám','Cẩm nang','6 phút');
