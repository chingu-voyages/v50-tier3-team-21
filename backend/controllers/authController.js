const db = require('../models'); // Make sure to require your models

const signup = async (req, res, next) => {
   const body = req.body;
   console.log(body);
   if (body.password.length < 7) {
    return res.status(400).json({
       status: 'fail',
       message: 'Password must be at least 7 characters long',
    });
 }

   try {
      const newUser = await db.User.create({
         username: body.username,
         email: body.email,
         password: body.password,
         confirmPassword: body.confirmPassword
      });

      if (!newUser) {
         return res.status(400).json({
            status: 'fail',
            message: 'Failed to create user',
         });
      }

      return res.status(201).json({
         status: 'success',
         message: 'User created successfully',
         data: newUser
      });
   } catch (error) {
      console.error(error);
      return res.status(500).json({
         status: 'fail',
         message: 'Failed to create user',
         error: error.message,
      });
   }
}

module.exports = { signup };