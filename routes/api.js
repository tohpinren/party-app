const express = require("express");
const router = express.Router();
const Party = require("../models/party");

router.get("/parties", (req, res, next) => {
  Party.find({}, "party_name date time location host max_guests guests")
    .then((data) => res.json(data))
    .catch(next);
});

router.post("/parties", (req, res, next) => {
  if (
    req.body.party_name &&
    req.body.date &&
    req.body.time &&
    req.body.location &&
    req.body.host &&
    req.body.max_guests &&
    req.body.guests
  ) {
    Party.create(req.body)
      .then((data) => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: "The input field is empty",
      body: req.body,
    });
  }
});

router.put("/parties/:id/join", (req, res, next) => {
  const { email } = req.body;
  if (email) {
    Party.findByIdAndUpdate(
      req.params.id,
      { $push: { guests: email } },
      { new: true }
    )
      .then((data) => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: "The email field is empty",
      body: req.body,
    });
  }
});

router.put("/parties/:id/leave", (req, res, next) => {
  const { email } = req.body;
  if (email) {
    Party.findByIdAndUpdate(
      req.params.id,
      { $pull: { guests: email } },
      { new: true }
    )
      .then((data) => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: "The email field is empty",
      body: req.body,
    });
  }
});

router.delete("/parties/:id", (req, res, next) => {
  Party.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});

module.exports = router;
