const admin = require('firebase-admin');

const serviceAccount = JSON.parse(
  require('../config/keys').google.serviceAccount
);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://expenses-app-id.firebaseio.com',
});

module.exports = admin;
