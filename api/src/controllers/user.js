const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const JWT_VALIDITY_DURATION = "24h";
const SALT_ROUNDS_FOR_PASSWORD_HASHING = 10;

exports.login = async (req, res, _) => {
  let user;

  try {
    user = await User.findOne({ email: req.body.email });
  } catch (error) {
    return res.status(500).json({ error });
  }

  if (!user) {
    return res
      .status(401)
      .json({ message: "Paire login/mot de passe incorrecte" });
  }

  let match = false;

  try {
    match = await bcrypt.compare(req.body.password, user.password);
  } catch (error) {
    return res.status(500).json({ error });
  }

  if (match) {
    return res.status(200).json({
      userId: user._id,
      /* This token is added by the front-end in the "Authorization" header of HTTP requests
       * for which the API requires the user authentification.
       */
      token: jwt.sign({ userId: user._id }, process.env["JWT_ENCRYPTION_KEY"], {
        expiresIn: JWT_VALIDITY_DURATION,
      }),
    });
  }
  return res
    .status(401)
    .json({ message: "Paire login/mot de passe incorrecte" });
};

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
