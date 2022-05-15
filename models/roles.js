const { Schema, model } = require("mongoose");

const RoleSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  
  role: {
    type: [String],
    require: true,
    default: "USER_ROLE",
  },
  google: {
    type: Boolean,
    default: false
  },
});


module.exports = model('Role', RoleSchema)