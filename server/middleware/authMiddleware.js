import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const protectAdmin = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(
        token, 
        process.env.JWT_SECRET || 'fallback_secret_key_if_missing'
      );

      // We use a simple role based check since there isn't a complex User tracking system
      if (decoded.role === 'admin') {
        req.admin = true;
        next();
      } else {
        res.status(401).json({ message: 'Yetkisiz erişim, admin rolü yok.' });
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      res.status(401).json({ message: 'Yetkisiz erişim, geçersiz token.' });
    }
  } else {
    res.status(401).json({ message: 'Yetkisiz erişim, token bulunamadı.' });
  }
};
