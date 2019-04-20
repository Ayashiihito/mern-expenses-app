module.exports = {
  mongoURI: process.env.MONGO_URI,
  secret: process.env.SECRET,
  google: {
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    serviceAccount: process.env.serviceAccount,
  },
};
