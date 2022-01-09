const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid email or username."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  handleValidationErrors,
];

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email"),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  check("confirmPassword")
    .exists({ checkFalsy: true })
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Password confirmation field does not match password field."),
  check("dateOfBirth")
    .exists({ checkFalsy: true })
    .isISO8601()
    .custom((value) => {
      const valueDate = new Date(value);
      const oldDate = new Date("1903-01-03");
      if (valueDate - oldDate <= 0) {
        return false;
      } else {
        return true;
      }
    })
    .withMessage("Date of Birth must be a valid date."),
  handleValidationErrors,
];

const validateDrink = [
  check("name")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a name for your drink."),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a description."),
  handleValidationErrors,
];

const validateDrinkReview = [
  check("review")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a review message."),
  check("rating")
    .exists({ checkFalsy: false })
    .notEmpty()
    .withMessage(
      "Please provide a value for the rating between 0 and 5, inclusive."
    ),
  handleValidationErrors,
];

const validateCheckIn = [
  check("timestamp")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a timestamp.")
    .isISO8601()
    .custom((value) => {
      const valueDate = new Date(value);
      const currentDate = new Date();
      if (currentDate - valueDate < 0) return false;
      return true;
    })
    .withMessage(
      "Timestamp for checkin must be in the past or the current timestamp."
    ),
  handleValidationErrors,
];

const validateStars = [
  check("stars")
    .custom((value) => {
      if (value < 0 || value > 5) return false;
      return true;
    })
    .withMessage("Please provide number for stars between 0 and 5."),
  handleValidationErrors,
];

module.exports = {
  validateLogin,
  validateSignup,
  validateDrink,
  validateDrinkReview,
  validateCheckIn,
  validateStars,
};
