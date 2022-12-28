const knex = require("../config/knexfile");
const fs = require("fs");
const formidable = require("formidable");


exports.pokemonList = async (req, res) => {
  await knex("pokemon")
    .then((pokemon) => {
      res.json(pokemon);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.newPokemon = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "No pudimos cargar la imagen",
      });
    }
    const { nombre } = fields;
    if (!nombre || !nombre.length) {
      return res
        .status(400)
        .json({ error: "El nombre en este campo ya existe" });
    }

    let file_data;
    let file_type;
    if (files.file) {
      if (files.file.size > 1000000) {
        return res.status(400).json({
          error: "La imagen es demasiado grande para ser cargada",
        });
      }

      file_data = fs.readFileSync(files.file.filepath);
      file_type = files.file.mimetype;
    }

    knex("pokemon")
      .insert({
        nombre: nombre,
        file_data: file_data,
        file_type: file_type,
      })
      .then(() => {
        res.json({
          success: true,
          mensaje: "Se ingreso correctamente",
        });
      })
      .catch((error) => {
        res.status(400).json({ error: error.message });
      });
  });
};

exports.img = (req, res) => {
  const id = req.params.id;
  knex("pokemon")
    .where("id", id)
    .then((result) => {
      res.set("Content-Type", result[0].file_type);
      return res.send(result[0].file_data);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};