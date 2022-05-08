const { json } = require("express/lib/response");
const pool = require("./conectionDB.js");
pool.connect();

const allUsers = async () => await pool.query("SELECT * FROM users");
const allValuesDataBase = allUsers().then((dato) => dato.rows);
const login = async (req, res) => {
  const datos = JSON.parse(req.query.body);
  const { user, password } = datos;
  try {
    const userDataBase = await pool.query(
      "select * from users where email=$1 AND user_password=$2",
      [user, password]
    );
    const { email, user_password, user_id } = await userDataBase.rows[0];
    if (email === user && user_password === password) {
      if (userDataBase.rows[0].useplatform === "Property Dogs") {
        const datosPerros = await pool.query(
          "select * from dogs where user_id=$1",
          [user_id]
        );
        const allDogs = datosPerros.rows;
        res.json({ data: [userDataBase.rows[0], allDogs], response: "ok" });
      } else {
        if (userDataBase.rows[0].useplatform === "Dog Walker") {
          const datosPerros = await pool.query(
            "select * from dogs where walking_dog=1"
          );
          res.json({
            data: [datosPerros.rows, userDataBase.rows[0]],
            response: "ok",
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ response: "error al logearse" });
  }
};
const createUser = async (req, res) => {
  let values = req.query.body;
  values = JSON.parse(values);
  const { usePlatform, name, city, place, age, email, password } = values;
  try {
    const data = await pool.query(
      "insert into users (name_complete, city, placeofresidence, age, email, user_password, useplatform) values ($1, $2, $3, $4, $5, $6, $7)",
      [name, city, place, age, email, password, usePlatform]
    );
    res.json({ response: "dato creado correctamente" });
  } catch (error) {
    res.json({ response: "error al crear el dato" });
  }
};
const createDog = async (req, res) => {
  const datos = req.query;
  let { user_id } = datos;
  const dataDog = JSON.parse(datos.body);
  const { name, description, dateofbirth, breed, urlimage, gender } = dataDog;
  user_id = JSON.parse(user_id);
  const traerUsuario = await pool.query(
    "select * from users where user_id=$1",
    [user_id]
  );
  const perrosDeUsuario = await pool.query(
    "select * from dogs where user_id=$1",
    [user_id]
  );
  try {
    const creando = await pool.query(
      "insert into dogs (name_dog, description, date_of_birth, breed, user_id, image, gender) values ($1, $2, $3, $4, $5, $6, $7)",
      [name, description, dateofbirth, breed, user_id, urlimage, gender]
    );
    res.json({
      response: "ok",
      mensaje: "Dato creado correctamente",
      data: [traerUsuario.rows, perrosDeUsuario.rows],
    });
  } catch (error) {
    res.json({
      response: "ok",
      mensaje: "error al crear el dato",
      data: [traerUsuario.rows, perrosDeUsuario.rows],
    });
  }
};
const sacarPerro = (req, res) => {
  let { body } = req.query;
  const id_dog = JSON.parse(body);
  try {
    pool.query("update dogs set walking_dog=1 where dog_id=$1", [id_dog]);
    res.json({ response: "ok", mensaje: "perro sacado" });
  } catch (error) {}
};
const devolverPerro = (req, res) => {
  let { body } = req.query;
  const id_dog = JSON.parse(body);
  try {
    pool.query("update dogs set walking_dog=0 where dog_id=$1", [id_dog]);
  } catch (error) {}
};

module.exports = { login, createUser, createDog, sacarPerro, devolverPerro };
