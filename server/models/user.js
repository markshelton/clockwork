const bcrypt = require('bcrypt-nodejs');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const conn = mongoose.connection;

// Define our model
const userSchema = new Schema({
  email: {type: String, unique: true, lowercase: true},
  password: String
});

// On Save Hook, encrypt password
// Before saving a model, run this function
userSchema.pre('save', function(next) {
  const user = this; // get access to user model
  
  // generate a salt then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {return next(err);}

    // hash (encrypt) our password using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {return next(err);}
      user.password = hash; // replace plaintext password
      next(); // go ahead to save the model
    });
  });
});

userSchema.methods.comparePassword = function(candidate, callback) {
  bcrypt.compare(candidate, this.password, function(err, isMatch) {
    if (err) {return callback(err);}
    else {return callback(null, isMatch);}
  })
};

// Create the model class
const userClass = conn.model("user", userSchema);

// Export the model
module.exports = userClass;