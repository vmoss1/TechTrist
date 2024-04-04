const express = require("express");
const { requireAuth } = require("../../utils/auth");
const { Pin, Favorite } = require("../../db/models");
const pin = require("../../db/models/pin");

const router = express.Router();

router.get("/current", requireAuth, async (req, res, next) => {
  try {
    let userId = req.user.id;

    const favorites = await Favorite.findAll({
      where: {
        userId: userId,
      },
      include: {
        model: Pin,
      },
    });

    return res.json({ favorites });
  } catch (e) {
    next(e);
  }
});

router.post("/:pinId", requireAuth, async (req, res, next) => {
  let { pinId } = req.params;
  pinId = +pinId;

  try {
    let userId = req.user.id;
    const pin = await Pin.findByPk(pinId);

    if (!pin) {
      return res.json({ message: "Pin does not exist" });
    }

    const newFavorite = await Favorite.create({ userId, pinId });
    res.json(newFavorite);
  } catch (e) {
    next(e);
  }
});

router.delete("/:pinId", requireAuth, async (req, res, next) => {
  let { pinId } = req.params;
  pinId = +pinId;

  try {
    const favorite = await Favorite.findByPk(pinId);

    const deletedFavorite = await Favorite.destroy({
      where: { pinId },
    });

    if (deletedFavorite === 0) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    res.status(200).json({ message: "Favorite deleted successfully" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
