const { toTitleCase, validateEmail } = require("../config/function");
const bcrypt = require("bcryptjs");
const userModel = require("../models/users");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");

class Auth {
  async isAdmin(req, res) {
    let { loggedInUserId } = req.body;
    try {
      let loggedInUserRole = await userModel.findById(loggedInUserId);
      res.json({ role: loggedInUserRole.userRole });
    } catch {
      res.status(404);
    }
  }

  async allUser(req, res) {
    try {
      let allUser = await userModel.find({});
      res.json({ users: allUser });
    } catch {
      res.status(404);
    }
  }

  /* User Registration/Signup controller  */
  async postSignup(req, res) {
  let { name, email, password, cPassword, userRole, phoneNumber } = req.body;
  let error = {};

  // 1. Basic field check
  if (!name || !email || !password || !cPassword || !userRole) {
    if (!name) error.name = "Field must not be empty";
    if (!email) error.email = "Field must not be empty";
    if (!password) error.password = "Field must not be empty";
    if (!cPassword) error.cPassword = "Field must not be empty";
    if (!userRole) error.userRole = "User role is required";
    return res.json({ error });
  }

  // 2. Name validation
  if (name.length < 3 || name.length > 25) {
    error.name = "Name must be 3-25 characters";
    return res.json({ error });
  }

  // 3. Email validation
  if (!validateEmail(email)) {
    error.email = "Email is not valid";
    return res.json({ error });
  }

  // 4. Password length check
  if (password.length < 8 || password.length > 255) {
    error.password = "Password must be between 8-255 characters";
    return res.json({ error });
  }

  // 5. Password match check
  if (password !== cPassword) {
    error.password = "Passwords do not match";
    error.cPassword = "Passwords do not match";
    return res.json({ error });
  }

  // 6. Normalize name
  name = toTitleCase(name);

  try {
    // 7. Check for existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      error.email = "Email already exists";
      return res.json({ error });
    }

    // 8. Hash password
    password = bcrypt.hashSync(password, 10);

    // 9. Create user
    const newUser = new userModel({
      name,
      email,
      password,
      userRole,
      phoneNumber,
    });

    await newUser.save();
    return res.json({
      success: "Account created successfully. Please login.",
    });

  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ error: "Server error. Please try again." });
  }
}


  /* User Login/Signin controller  */
  async postSignin(req, res) {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        error: "Fields must not be empty",
      });
    }
    try {
      const data = await userModel.findOne({ email: email });
      if (!data) {
        return res.json({
          error: "Invalid email or password",
        });
      } else {
        const login = await bcrypt.compare(password, data.password);
        if (login) {
          const token = jwt.sign(
            { _id: data._id, role: data.userRole },
            JWT_SECRET
          );
          const encode = jwt.verify(token, JWT_SECRET);
          return res.json({
            token: token,
            user: encode,
          });
        } else {
          return res.json({
            error: "Invalid email or password",
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}

const authController = new Auth();
module.exports = authController;
