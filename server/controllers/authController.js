import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const loginAdmin = (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'Şifre alanı zorunludur.' });
  }

  // Check if it matches environment variable
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  if (!adminPassword) {
    console.error('SERVER ERROR: ADMIN_PASSWORD is not set in .env');
    return res.status(500).json({ message: 'Sunucu yapılandırma hatası.' });
  }

  if (password === adminPassword) {
    // Correct password, generate token
    const token = jwt.sign(
      { role: 'admin' }, 
      process.env.JWT_SECRET || 'fallback_secret_key_if_missing', 
      { expiresIn: '12h' } // 12 hours session
    );

    return res.status(200).json({
      message: 'Giriş başarılı.',
      token
    });
  } else {
    // Incorrect password
    return res.status(401).json({ message: 'Hatalı şifre.' });
  }
};
