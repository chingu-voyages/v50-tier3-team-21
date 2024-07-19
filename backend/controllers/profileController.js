const db = require("../models"); 

const getProfile = async (req, res, next) => {
  try {
     const user = await db.User.findByPk(req.user.id, {
         attributes: { exclude: ['password'] }
     });

     if (!user) {
         return res.status(404).json({
             status: 'fail',
             message: 'User not found',
         });
     }

     return res.status(200).json({
         status: 'success',
         data: user,
     });
 } catch (error) {
     console.error(error);
     return res.status(500).json({
         status: 'fail',
         message: 'Failed to fetch user profile',
         error: error.message,
     });
 }
};

const updateProfile = async (req, res) => {
  try {
     const user = await db.User.findByPk(req.user.id, {
         attributes: { exclude: ['password'] }
     });

     if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updateFields = req.body;
    Object.keys(updateFields).forEach(field => {
      user[field] = updateFields[field];
    });

    await user.save();

    return res.status(200).json({success: true, message: "User updated successfully"});
 } catch (error) {
     console.error(error);
     return res.status(500).json({
         success: 'false',
         message: 'Failed to fetch update user profile',
         error: error.message,
     });
 }
};

module.exports = {
  getProfile,
  updateProfile,
}