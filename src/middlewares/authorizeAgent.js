const authorizeAgent = (req, res, next) => {
  if (req.authInfo.agent !== req.headers['user-agent'])
    return res.status(401).json({
      message: 'Unthorized',
    });
  return next();
};

module.exports = authorizeAgent;
