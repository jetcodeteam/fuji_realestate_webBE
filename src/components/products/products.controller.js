const router = require('express').Router();

/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Everything about Products
 * /api/products:
 *   get:
 *     tags:
 *       - Products
 *     name: GetAllProducts
 *     summary: Get list of record of products with pagination
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Create a new product
 *       400:
 *         description: Bad request
 *   post:
 *     tags:
 *       - Products
 *     name: NewProducts
 *     summary: Create a new product
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Create a new product
 *       400:
 *         description: Bad request
 * /api/products/{id}:
 *   get:
 *     tags:
 *       - Products
 *     name: GetOneProducts
 *     summary: Get an existing products
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *       - name: id
 *         in: path
 *         description: ID of product to get
 *         required: true
 *         schema:
 *           type: string
 *           format: IdObject
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get info of product
 *       400:
 *         description: Invalid ID supplied
 *       405:
 *         description: Validation exception
 *   put:
 *     tags:
 *       - Products
 *     name: UpdateOneProducts
 *     summary: Update an existing products
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *       - name: id
 *         in: path
 *         description: ID of product to get
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
 *         description: Products not found
 *       405:
 *         description: Validation exception
 *   delete:
 *     tags:
 *       - Products
 *     name: DeleteOneProducts
 *     summary: Delete an existing products
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *       - name: id
 *         in: path
 *         description: ID of product to get
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
 *         description: Products not found
 *       405:
 *         description: Validation exception
 */
router.get('', (req, res) => {
  return res.send('Get all products');
});

router.post('', (req, res) => {
  return res.send('Create a new product');
});

router.put('/:id', (req, res) => {
  return res.send('Update a product');
});

router.delete('/:id', (req, res) => {
  return res.send('Delete a product');
});

module.exports = router;
