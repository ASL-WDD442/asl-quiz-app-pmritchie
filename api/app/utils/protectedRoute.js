const jwt = require('jsonwebtoken');

const protectedRoute = (req, res, next) => {
  const { token } = req.headers;
  try {
    // get the id using the secrect
    const { id } = jwt.verify(token, process.env.SECRET);
    // set the userId
    req.userId = id;
    // if the user is logged in go to the next middleware
    return next();
  } catch (e) {
    // if there is an error decoding the token send an unauthorized response
    return res.status(401).json({ loggedIn: false });
  }
};

// export the middleware function
module.exports = protectedRoute;
