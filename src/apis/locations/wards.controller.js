const router = require('express').Router();
const crud = require('../../utils/crud');
const Wards = require('./ward');

const controllers = crud.crudControllers(Wards, 'district');

router.route('/:id').get(controllers.getOne);

module.exports = router;
