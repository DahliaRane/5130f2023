const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://portfolio-db3ba-default-rtdb.firebaseio.com/', // Replace with your Firebase project URL
});

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

const users = [];
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ranedahlia@gmail.com',
    pass: 'hdhs vloj jlxy fodh'
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Define a route for /dashboard
app.get('/dashboard', (req, res) => {
  // Send the dashboard.html file
  res.sendFile(__dirname + '/public/dashboard.html');
});

app.post('/signup', (req, res) => {
  const { email, token } = req.body;

  const mailOptions = {
    from: 'ranedahlia@gmail.com',
    to: email, // Make sure this is a valid email address
    subject: 'Email Verification',
    text: `Please click the following link to verify your email: http://localhost:3000/verify?token=${token}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});


app.get('/verify', async (req, res) => {
  try {
    const token = req.query.token;

    // Find the user with the provided token in Firebase
    const userSnapshot = await admin.firestore().collection('users').where('token', '==', token).get();

    if (userSnapshot.empty) {
      // No user found with the given token
      return res.status(404).send('Invalid token');
    }

    // Update the verification status for the first user found (assuming unique tokens)
    const user = userSnapshot.docs[0];
    await user.ref.update({ verified: true });

    // Redirect to the dashboard page after successful verification
    res.redirect(`/dashboard?email=${encodeURIComponent(user.email)}`);
  } catch (error) {
    console.error('Error verifying email:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
