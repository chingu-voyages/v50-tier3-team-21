const signupValidation = (req, res, next) => {
  const body = req.body;
  // password length validation
  if (body.password.length < 7) {
    return res.status(400).json({
      status: "fail",
      message: "Password must be at least 7 characters long",
    });
  }
  // password confirmation validation
  if (body.password !== body.confirmPassword) {
    return res.status(400).json({
      status: "fail",
      message: "Password and confirm password do not match",
    });
  }

  next();
};

module.exports = {
  signupValidation,
}