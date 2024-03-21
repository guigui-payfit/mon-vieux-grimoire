const bcrypt = require("bcrypt");

const User = require("../models/user");

const SALT_ROUNDS_FOR_PASSWORD_HASHING = 10;

exports.signup = async (req, res, _) => {
  let hashedPassword = "";

  try {
    hashedPassword = await bcrypt.hash(
      req.body.password,
      SALT_ROUNDS_FOR_PASSWORD_HASHING
    );
  } catch (error) {
    return res.status(500).json({ error });
  }

  try {
    await new User({
      email: req.body.email,
      password: hashedPassword,
    }).save();
    return res.status(201).json({ message: "Utilisateur créé !" });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
