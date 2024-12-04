const { admin } = require('../../config/firebase');

const authenticate = async (req, res, next) => {
  try {
    const idToken = req.cookies.access_token;
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(403).json({
      message: 'Unauthorized',
    });
  }
};

module.exports = authenticate;
