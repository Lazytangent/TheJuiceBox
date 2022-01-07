const router = require("express").Router();
const asyncHandler = require("express-async-handler");

const flattener = require("../utils/flattener");
const { validateCheckIn, validateStars } = require("../utils/validators");
const { requireAuth } = require("../../utils/auth");
const { CheckIn } = require("../../db/models");

router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { user } = req;
    const checkIns = await CheckIn.findByUserId(user.id);
    res.json(flattener(checkIns));
  })
);

router.put(
  "/:checkInId(\\d+)",
  requireAuth,
  validateCheckIn,
  validateStars,
  asyncHandler(async (req, res) => {
    const checkInId = parseInt(req.params.checkInId, 10);

    const checkIn = await CheckIn.findByPk(checkInId);
    const { timestamp, review, stars, liked } = req.body;
    await checkIn.update({ timestamp, review, liked, stars });

    res.json(checkIn);
  })
);

router.delete(
  "/:checkInId(\\d+)",
  requireAuth,
  asyncHandler(async (req, res) => {
    const checkInId = parseInt(req.params.checkInId, 10);

    const checkIn = await CheckIn.findByPk(checkInId);
    const { user } = req;

    if (checkIn.userId !== user.id) res.json({ message: "Invalid user." });
    else {
      await checkIn.destroy();
      res.json({ message: "Successfully deleted." });
    }
  })
);

module.exports = router;
