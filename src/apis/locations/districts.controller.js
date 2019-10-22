const router = require('express').Router();
const crud = require('../../utils/crud');
const Districts = require('./district');

const controllers = crud.crudControllers(Districts, 'ward');

router.route('').get(controllers.getPage);

module.exports = router;
