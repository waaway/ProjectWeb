const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit'); // เพิ่ม express-rate-limit

const app = express();
const PORT = 3000;

// Secret key สำหรับการเซ็น JWT
const SECRET_KEY = 'your_secret_key'; // เปลี่ยนเป็นคีย์ลับของคุณ

// สร้างการเชื่อมต่อกับฐานข้อมูล MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'pattananpxndptn01',
  database: 'hotel_users_db',
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

// **Rate Limiter สำหรับ /login**
const loginLimiter = rateLimit({
  windowMs:  60 * 1000, // 1 นาที
  max: 5, // อนุญาตให้ลองเข้าสู่ระบบได้สูงสุด 5 ครั้งต่อ IP
  message: 'Too many login attempts, please try again after 1 minutes', // ข้อความเมื่อถูกบล็อก
});

// Endpoint สำหรับการลงทะเบียน
app.post('/register', async (req, res) => {
  const { username, email, password, phoneNumber, country } = req.body;

  if (!username || !email || !password || !phoneNumber || !country) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) {
      console.error('Database error during user check:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        'INSERT INTO users (username, email, password, phoneNumber, country) VALUES (?, ?, ?, ?, ?)',
        [username, email, hashedPassword, phoneNumber, country],
        (err) => {
          if (err) {
            console.error('Database insertion error:', err);
            return res.status(500).json({ message: 'Database error' });
          }
          res.status(200).json({ message: 'User registered successfully' });
        }
      );
    } catch (error) {
      console.error('Hashing error:', error);
      res.status(500).json({ message: 'Error hashing password' });
    }
  });
});

// Endpoint สำหรับการเข้าสู่ระบบ (เพิ่ม Rate Limiter)
app.post('/login', loginLimiter, (req, res) => {
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

      const token = jwt.sign(
        { id: user.id, username: user.username },
        SECRET_KEY,
        { expiresIn: '1h' }
      );

      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Error comparing passwords:', error);
      res.status(500).json({ message: 'Error during login' });
    }
  });
});

// Middleware สำหรับตรวจสอบ Token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user;
    next();
  });
};

// ตัวอย่าง Endpoint ที่ต้องใช้ Token
app.get('/protected', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Welcome to the protected route!', user: req.user });
});


app.get('/profile', verifyToken, (req, res) => {
  const userId = req.user.id;

  db.query('SELECT username, email, phoneNumber, country FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Database error during profile retrieval:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(results[0]);
  });
});

//สร้าง API สำหรับตรวจสอบห้องว่าง
app.post('/available-rooms', (req, res) => {
  const { checkInDate, checkOutDate, roomType } = req.body;

  // Query to get available rooms
  const query = `
    SELECT * FROM rooms 
    WHERE type = ? AND is_available = 1 
      AND id NOT IN (
        SELECT room_id FROM bookings 
        WHERE (check_in_date <= ? AND check_out_date >= ?)
      )
  `;

  db.query(query, [roomType, checkOutDate, checkInDate], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.json(results);
  });
});




// เริ่มเซิร์ฟเวอร์
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
