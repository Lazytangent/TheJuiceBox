const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { restoreUser } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { Drink } = require('../../db/models');
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const drinks = await Drink.findAll();
  res.json({ drinks });
}));

const validateDrink = [
  check('name')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a name for your drink.'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a description.'),
  handleValidationErrors,
];

router.post('/', singleMulterUpload('image'), restoreUser, validateDrink, asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const { user } = req;
  const imageUrl = await singlePublicFileUpload(req.file);
  const drink = await Drink.create({
    name,
    description,
    imageUrl,
    creatorId: user.id,
  });

  return res.json({
    drink,
  });
}));

router.put('/:drinkId', validateDrink, asyncHandler(async (req, res) => {

}));

router.delete('/:drinkId', asyncHandler(async (req, res) => {

}));

module.exports = router;
