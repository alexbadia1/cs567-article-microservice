const cookie = require('cookie');
const { auth } = require('../../config/firebase');

const authenticate = async (req, res, next) => {
  try {
    const parsedCookies = cookie.parse(req.header('cookie'));
    const idToken = parsedCookies.access_token;
    const decodedToken = await auth.verifyIdToken(idToken);
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
