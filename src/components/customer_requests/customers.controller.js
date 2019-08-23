const passport = require('passport');
const router = require('express').Router();

/**
 * @swagger
 * tags:
 *   - name: 'Customer Requests'
 *     description: Access to customer requests
 * /api/customer_requests:
 *   get:
 *     tags:
 *       - 'Customer Requests'
 *     name: GetAllCustomerRequests
 *     summary: Get list of record of customer requests with pagination
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Create a new customer requests
 *       400:
 *         description: Bad request
 *   post:
 *     tags:
 *       - 'Customer Requests'
 *     name: CreateCustomerRequests
 *     summary: Create a new customer requests
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *     responses:
 *       201:
 *         description: Create a new customer requests
 *       400:
 *         description: Bad request
 * /api/customer_requests/{id}:
 *   get:
 *     tags:
 *       - 'Customer Requests'
 *     name: GetOneCustomerRequests
 *     summary: Get an existing customer request
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *       - name: id
 *         in: path
 *         description: ID of customer requests to get
 *         required: true
 *         schema:
 *           type: string
 *           format: IdObject
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get info of customer requests
 *       400:
 *         description: Invalid ID supplied
 *       405:
 *         description: Validation exception
 *   put:
 *     tags:
 *       - 'Customer Requests'
 *     name: UpdateOneCustomerRequests
 *     summary: Update an existing customer requests
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *       - name: id
 *         in: path
 *         description: ID of customer requests to get
 *         required: true
 *         schema:
 *           type: string
 *           format: IdObject
 *     security:
 *        - bearerAuth: []
 *     responses:
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: customer requests not found
 *       405:
 *         description: Validation exception
 *   delete:
 *     tags:
 *       - 'Customer Requests'
 *     name: DeleteOneCustomerRequests
 *     summary: Delete an existing customer requests
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *       - name: id
 *         in: path
 *         description: ID of customer requests to get
 *         required: true
 *         schema:
 *           type: string
 *           format: IdObject
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: customer requests not found
 *       405:
 *         description: Validation exception
 */
router.get('', passport.authenticate('jwt', { session: false }), (req, res) => {
  return res.send('Get all customer requests');
});

router.post('', (req, res) => {
  return res.send('Create a new customer requests');
});

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    return res.send('Get one customer requests');
  }
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    return res.send('Update a customer requests');
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    return res.send('Delete a customer requests');
  }
);

module.exports = router;
