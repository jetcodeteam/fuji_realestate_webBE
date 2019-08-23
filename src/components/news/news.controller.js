const router = require('express').Router();

/**
 * @swagger
 * tags:
 *   - name: News
 *     description: Everything about News
 * /api/news:
 *   get:
 *     tags:
 *       - News
 *     name: GetAllNews
 *     summary: Get list of record of news with pagination
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Create a new news
 *       400:
 *         description: Bad request
 *   post:
 *     tags:
 *       - News
 *     name: CreateNews
 *     summary: Create a new news
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Create a new news
 *       400:
 *         description: Bad request
 * /api/news/{id}:
 *   get:
 *     tags:
 *       - News
 *     name: GetOneNews
 *     summary: Get an existing news
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *       - name: id
 *         in: path
 *         description: ID of news to get
 *         required: true
 *         schema:
 *           type: string
 *           format: IdObject
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get info of news
 *       400:
 *         description: Invalid ID supplied
 *       405:
 *         description: Validation exception
 *   put:
 *     tags:
 *       - News
 *     name: UpdateOneNews
 *     summary: Update an existing news
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *       - name: id
 *         in: path
 *         description: ID of news to get
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
 *         description: news not found
 *       405:
 *         description: Validation exception
 *   delete:
 *     tags:
 *       - News
 *     name: DeleteOneNews
 *     summary: Delete an existing news
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *       - name: id
 *         in: path
 *         description: ID of news to get
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
 *         description: news not found
 *       405:
 *         description: Validation exception
 */
router.get('', (req, res) => {
  return res.send('Get all news');
});

router.post('', (req, res) => {
  return res.send('Create a new news');
});

router.get('/:id', (req, res) => {
  return res.send('Get one news');
});

router.put('/:id', (req, res) => {
  return res.send('Update a news');
});

router.delete('/:id', (req, res) => {
  return res.send('Delete a news');
});

module.exports = router;
