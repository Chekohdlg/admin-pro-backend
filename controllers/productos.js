const { response } = require("express");
const Producto = require("../models/producto");

const crearProducto = async (req, res = response) => {
    const { nombre} = req.body;
  
    try {
      const existeProducto = await Producto.findOne({ nombre });
  
      if (existeProducto) {
        return res.status(400).json({
          ok: false,
          msg: "El producto ya existe",
        });
      }
  
      const producto = new Producto(req.body);      
  
      await producto.save();
  
      res.json({
        ok: true,
        producto,
      });
  
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Resvisar logica",
      });
    }
  };

const getProductos = async   (req, res = response) => {
  const produtos = await Producto.find({});

  res.json({
    ok: true,
    produtos,   
  });
}

const deleteProducto = async   (req, res = response) => {
  try {
    const uuid = req.params.id;

    const productoDB = await Producto.findById(uuid);

    if (!productoDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe el producto de ese id",
      });
    }

    await Producto.findOneAndDelete(uuid);

    res.json({
      ok: true,
      msg: "Producto eliminado",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Favor de contactar con el admin",
    });
  }
}

const actualizarProducto = async   (req, res = response) => {
  const uid = req.params.id;

  try {
    const productoDb = await Producto.findById(uid);

    if (!productoDb) {
      return res.status(404).json({
        ok: false,
        msg: "No existe el prducto de ese id",
      });
    }

    //TODO: validar usuario correcto

    //actualizacion
    const { nombre, ...campos } = req.body;

    if (productoDb.nombre !== nombre) {
      const existe = await Producto.findOne({ nombre });
      if (existe) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe un producto con ese nombre",
        });
      }
    }

    campos.nombre = nombre;

    const actualizado = await Producto.findByIdAndUpdate(uid, campos, {
      new: true,
    });

    res.json({
      ok: true,
      producto: actualizado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error,
    });
  }
}

  module.exports = {   
    crearProducto,   
    getProductos,
    deleteProducto,
    actualizarProducto
  };