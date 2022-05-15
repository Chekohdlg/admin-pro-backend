const { Schema, model } = require("mongoose");

const ProductoSchema = new Schema({
  nombre: {
    type: String,
    require: true,
  },
  descripcion:{
    type: String,
    
  }, 
  img: {
    type: [String],
  },
  precio:{
      type: Number
  },
  peso:{
    type: Number,
    require: true,
  }


});

ProductoSchema.method('toJSON', function(){
  const { _v, _id,  ...object} = this.toObject();

  object.uid =_id;

  return object;
});

module.exports = model('Producto', ProductoSchema)