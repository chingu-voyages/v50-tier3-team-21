const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

const db = require('./models');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');


// demo user

let user = {
  id: "12345",
  email: "test@example.com",
  password: "password"

}

const JWT_SECRET ="some super secret..";

app.get('/', (req, res) => {
res.send('Hello World');

});

app.get('/forgotPassword', (req, res, next) => {
 res.render('forgotPassword');
})
app.post('/forgotPassword', (req, res, next) => {
   const {email} = req.body;
   
   //make sure user exist in database
   if (email !== user.email) {
     res.send('User not found');
     return;
   }

   // user exists, create a one time link for 15mins

   const secret = JWT_SECRET + user.password;
   const payload = {
     email: user.email,
     id: user.id
   }

   const token = jwt.sign(payload, secret, {expiresIn: '15m'});
   const link = `http://localhost:3000/resetPassword/${user.id}/${token}`;
   console.log(link);
   res.send('Password reset link sent to your email');


})

app.get('/resetPassword/:id/:token', (req, res, next) => {

  const {id, token} = req.params;
  // check if id exists
  if (id !== user.id) {
    res.send('Invalid id')
    return;
  }
    // we have a valid id and user
    const secret = JWT_SECRET + user.password;
    try {
      const payload = jwt.verify(token, secret);
      res.render('resetPassword', {email: user.email});

    } catch (error) {
      console.log(error.message);
      res.send(error.message);
    }
});

app.post('/resetPassword/:id/:token', (req, res, next) => {

  const {id, token} = req.params;
  const {password, confirmPassword} = req.body;
  // check if this id exist in database
  if (id !== user.id) {
  res.send('invalid id or token');
  return;
}

  const secret = JWT_SECRET + user.password;

  try {
    const payload = jwt.verify(token, secret);
    // validate password and confirmPassword, they should match
    // find the user in the database and update the password

    user.password = password;
    res.send(user)

  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  
  }

})


// Sync database
db.sequelize.sync().then((req) => {

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});


