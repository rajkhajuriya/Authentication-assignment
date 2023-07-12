require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy;
const Employee = require('./models/employee');
const employeesRouter = require('./routes/employees');
const groupsRouter = require('./routes/groups');
const applicationsRouter = require('./routes/applications');
const auth0 = require('./auth/auth0');
const authCheck = require('./middlewares/authCheck');


// Create Express app
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
// Connect to MongoDB
console.log(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

// Configure Passport.js
passport.use(
  new OIDCStrategy(
    {
      identityMetadata: `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}/v2.0/.well-known/openid-configuration`,
      clientID: process.env.AZURE_AD_CLIENT_ID,
      responseType: 'code',
      responseMode: 'form_post',
      redirectUrl: `${process.env.BASE_URL}/auth/azuread/callback`,
      allowHttpForRedirectUrl: true,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      validateIssuer: false,
      passReqToCallback: false,
      scope: ['profile', 'offline_access', 'user.read'],
    },
    (iss, sub, profile, accessToken, refreshToken, done) => {
      return done(null, profile);
    }
  )
);

app.use(passport.initialize());

// API routes
app.use('/employees', employeesRouter);
app.use('/groups', groupsRouter);
app.use('/applications', applicationsRouter);

// Azure AD callback route
app.post('/auth/azuread/callback', async (req, res) => {
  try {
    const { code } = req.body;
    const tokenResponse = await auth0.authorizationCodeGrant({
      code,
      redirectUri: `${process.env.BASE_URL}/auth/azuread/callback`,
      scope: 'openid profile',
    });
    const { access_token } = tokenResponse;
    const userInfo = await auth0.getUserInfo(access_token);

    // Process and store user details in your database
    const { email, given_name, family_name } = userInfo;

    // Example: Create or update an employee in the database
    const employee = await Employee.findOneAndUpdate(
      { email },
      { email, firstname: given_name, lastname: family_name },
      { upsert: true, new: true }
    );

    res.status(200).json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Auth0 callback route