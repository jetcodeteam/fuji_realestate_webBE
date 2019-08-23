const router = require('express').Router();
const passport = require('passport');

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Operations about user
 * definitions:
 *   User:
 *     type: object
 *     required:
 *       - username
 *       - password
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 * /api/users/login:
 *   post:
 *     tags:
 *       - Users
 *     name: Login
 *     summary: Authencate user
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Logged in successfully
 *       400:
 *         description: Username or password is invalid
 */
router.post('/login', (req, res) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (user) {
      req.login(user, { session: false }, error => {
        if (error) {
          res.send(error);
        }
        return res.json(user.toAuthJSON());
      });
    }
    return res.status(400).json({
      message: info,
    });
  })(req, res);
});

module.exports = router;
