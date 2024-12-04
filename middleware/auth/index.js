const { auth } = require('../../config/firebase');

const authenticate = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const access_token = req.cookies.access_token;
    console.log('Cookies: ', cookies);
    console.log('Access Token: ', access_token);
    const decodedToken = await auth.verifyIdToken(access_token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error while verifying Firebase ID token:', error);
    return res.status(403).json({
      message: 'Unauthorized',
    });
  }
};

module.exports = authenticate;
