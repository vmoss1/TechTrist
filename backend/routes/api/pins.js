const express = require("express");
const { requireAuth } = require("../../utils/auth");
const { Pin, Comment, User } = require("../../db/models");

const router = express.Router();

// Get all pins
// No auth required
router.get("/", async (req, res, next) => {
  try {
    const allPins = await Pin.findAll();

    return res.json({ allPins });
  } catch (e) {
    next(e);
  }
});

// Get all pins from current user
// auth required
router.get("/current", requireAuth, async (req, res, next) => {
  try {
    const currentPins = await Pin.findAll({
      where: {
        userId: req.user.id,
      },
    });
    return res.json({ "My Pins": currentPins });
  } catch (e) {
    next(e);
  }
});

//Get single pin by id
router.get("/:pinId", async (req, res, next) => {
  let { pinId } = req.params;
  pinId = +pinId;
  try {
    const currentPin = await Pin.findByPk(pinId, {
      include: {
        model: Comment,
        include: {
          model: User,
        },
      },
    });
    if (!currentPin) {
      return res.status(404).json({ message: "Pin couldn't be found" });
    }

    return res.json({ Pin: currentPin });
  } catch (e) {
    next(e);
  }
});

//Creates and returns a new pin
// require auth
router.post("/", requireAuth, async (req, res, next) => {
  try {
    const { title, description, imageUrl, category } = req.body;

    const newPin = await Pin.create({
      userId: req.user.id,
      title,
      description,
      imageUrl,
      category,
    });

    return res.status(201).json(newPin);
  } catch (e) {
    next(e);
  }
});

// Updates a new pin and returns updated pin
// require auth
router.put("/:pinId", requireAuth, async (req, res, next) => {
  let { pinId } = req.params;
  pinId = +pinId;
  try {
    const { title, description, imageUrl, category } = req.body;

    const currentPin = await Pin.findByPk(pinId);
    if (!currentPin) {
      return res.status(404).json({ message: "Pin couldn't be found" });
    }

    const isCreator = currentPin.userId === req.user.id;
    if (!isCreator) {
      return res
        .status(403)
        .json({ message: "You are not authorized to make this change" });
    }

    if (title !== undefined) currentPin.title = title; // inputted !==undefined to ensure that the model validators work
    if (description !== undefined) currentPin.description = description;
    if (imageUrl !== undefined) currentPin.imageUrl = imageUrl;
    if (category !== undefined) currentPin.category = category;

    await currentPin.save();

    return res.json({
      id: currentPin.id,
      userID: currentPin.userID,
      title: currentPin.title,
      description: currentPin.description,
      imageUrl: currentPin.imageUrl,
      category: currentPin.category,
      updatedAt: currentPin.updatedAt,
    });
  } catch (e) {
    next(e);
  }
});

// delete pin
// require auth
router.delete("/:pinId", requireAuth, async (req, res, next) => {
  let { pinId } = req.params;
  pinId = +pinId;

  try {
    const currentPin = await Pin.findByPk(pinId);
    if (!currentPin) {
      return res.status(404).json({ message: "Pin couldn't be found" });
    }

    const isCreator = currentPin.userId === req.user.id;
    if (!isCreator) {
      return res
        .status(403)
        .json({ message: "You are not authorized to make this change" });
    }

    await currentPin.destroy();

    return res.json({ message: "Successfully Destroyed" });
  } catch (e) {
    next(e);
  }
});

router.post("/:pinId/comments", requireAuth, async (req, res, next) => {
  let { pinId } = req.params;
  pinId = +pinId;
  try {
    const currentPin = await Pin.findByPk(pinId);
    if (!currentPin) {
      return res.status(404).json({ message: "Pin couldn't be found" });
    }
    const { body } = req.body;
    // console.log("BODY", body);

    const newComment = await Comment.create({
      userId: req.user.id,
      pinId,
      body: body,
    });

    return res.status(201).json(newComment);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
