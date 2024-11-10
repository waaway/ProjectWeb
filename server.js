const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3000;

// สร้างการเชื่อมต่อกับฐานข้อมูล MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // แก้ไขให้ตรงกับชื่อผู้ใช้ MySQL ของคุณ
  password: 'pattananpxndptn01', // แก้ไขให้ตรงกับรหัสผ่านของ MySQL ของคุณ
  database: 'hotel_users_db', // แก้ไขให้ตรงกับชื่อฐานข้อมูลของคุณ
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.use(cors());
app.use(bodyParser.json());

// Endpoint สำหรับการลงทะเบียน
app.post('/register', async (req, res) => {
  const { username, email, password, phoneNumber, country } = req.body;

  // ตรวจสอบข้อมูลที่ได้รับจาก frontend
  console.log('Received data:', { username, email, password, phoneNumber, country });

  if (!username || !email || !password || !phoneNumber || !country) {
    console.log('Missing required fields');
    return res.status(400).json({ message: 'All fields are required' });
  }

  // ตรวจสอบว่ามีผู้ใช้อยู่ในระบบหรือไม่
  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) {
      console.error('Database error during user check:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length > 0) {
      console.log('User already exists:', username);
      return res.status(400).json({ message: 'User already exists' });
    }

    try {
      // แฮชรหัสผ่านก่อนบันทึก
      console.log('Hashing password...');
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('Password hashed successfully');

      // บันทึกผู้ใช้ใหม่
      console.log('Inserting user into database...');
      db.query(
        'INSERT INTO users (username, email, password, phoneNumber, country) VALUES (?, ?, ?, ?, ?)',
        [username, email, hashedPassword, phoneNumber, country],
        (err, results) => {
          if (err) {
            console.error('Database insertion error:', err);
            return res.status(500).json({ message: 'Database error' });
          }
          console.log('User registered successfully:', username);
          res.status(200).json({ message: 'User registered successfully' });
        }
      );
    } catch (error) {
      console.error('Hashing error:', error);
      res.status(500).json({ message: 'Error hashing password' });
    }
  });
});

// Endpoint สำหรับการเข้าสู่ระบบ
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) {
      console.error('Database error during user lookup:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = results[0];
    try {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error('Error comparing passwords:', error);
      res.status(500).json({ message: 'Error during login' });
    }
  });
});

// เริ่มเซิร์ฟเวอร์
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
