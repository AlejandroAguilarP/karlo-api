const { User } = require("../models/index.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAll = async (req, res, next) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ["user_pwd"] }, 
    order: [
      ['user_id', 'DESC'],
      ['user_name', 'ASC'],
    ], });
    res.json({ users });
  } catch (error) {
    res.json({ error });
  }
};
const getUserByID = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { user_id: req.params.id },
      attributes: { exclude: ["user_pwd"] },
    });
    if(user){
        res.status(200).json({ user });
    }
    else{
        res.status(404).json({ message: "User not found"});
    }
  } catch (error) {
    res.json({ error });
  }
};
const updateUser = async (req, res, next) => {
  console.log(req.body)
  try {
    const user = await User.findOne({
      where: { user_id: req.params.id },
      attributes: { exclude: ["user_pwd"] },
    });
    if (user) {
      await user.update({user_email: req.body.user_email, user_name: req.body.user_name})
      res.status(200).json({ user });
    }
    else{
        res.status(404).json({ message: "User not found"});
    }
  } catch (error) {
    res.json({ error });
  }
};
const createUser = async (req, res, next) => {
  try {
    console.log(req.body)
    const isEmailExist = await User.findOne({ where:{
        user_email: req.body.user_email,
      }
    });
    if (isEmailExist) {
      return res.status(400).json({ error: "Email ya registrado" });
    }
    const password = await bcrypt.hash(req.body.password, 10).then((hash) => {
      return hash;
    });
    const userData = {
      user_name: req.body.user_name,
      user_email: req.body.user_email,
      user_pwd: password,
      createdAt: new Date(),
    };
    const user = await User.create(userData);
    res.status(201).json({ user });
  } catch (error) {
    if (
      error.name === "SequelizeUniqueConstraintError" ||
      error.name === "SequelizeValidationError"
    ) {
      const errors = error.errors.map((err) => err.message);
      if (errors.length == 0) {
        errors.push("El email ya esta en uso");
      }
      res.status(400).json({ errors });
    } else {
      res.json({ error });
    }
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.destroy({
      where: { user_id: req.params.id },
    });
    res.status(200).json({ message: "Eliminado exitosamente" });
  } catch (error) {
    res.json({ error });
  }
};

// middleware to validate token (rutas protegidas)
const verifyUser = async(req, res, next) => {
    const token = req.header('auth-token')
    if (!token) return res.status(401).json({ error: 'Usuario no permitido' })
    try {
        const decode = jwt.decode(token)
        const current = await User.findOne({
          where: { user_id: decode.id },
          attributes: { exclude: ["user_pwd"] },
        })
        console.log(current)
        res.header("auth-token", token).json({
          data: { token, user: current }
        });
    } catch (error) {
        res.status(400).json({error: 'token no es válido'})
    }
}


const login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        user_email: req.body.email,
      },
    });

    if (user) {
      console.log(user)
      const match = await bcrypt.compare(req.body.password, user.user_pwd);
      if (match) {
        const token = jwt.sign(
          {
            name: user.user_name,
            id: user.user_id,
          },
          process.env.TOKEN_SECRET
        );
        user.last_login = new Date();
        console.log(user.last_login);
        await user.save();
        res.header("auth-token", token).json({
          data: { token, user },
        });
      }else{
        res.status(401).json({ mensaje: "Usuario o contraseña incorrectos" });
      }
    } else {
      res.json({ mensaje: "Usuario o contraseña incorrectos" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const register = async (req, res, next) => {
  try {
    const isEmailExist = await User.findOne({
      where: {user_email: req.body.email}
    });
    if (isEmailExist) {
      return res.status(400).json({ error: "Email ya registrado" });
    }
    const password = await bcrypt.hash(req.body.password, 10).then((hash) => {
      return hash;
    });
    const userData = {
      user_name: req.body.user_name,
      user_email: req.body.email,
      user_pwd: password,
      createdAt: new Date(),
    };
    const user = await User.create(userData);
    const token = jwt.sign(
      {
        name: user.user_name,
        id: user.user_id,
      },
      process.env.TOKEN_SECRET
    );
    user.last_login = new Date();
    await user.save();
    res.header("auth-token", token).json({
      data: { token, user },
    });
  } catch (error) {
    if (
      error.name === "SequelizeUniqueConstraintError" ||
      error.name === "SequelizeValidationError"
    ) {
      const errors = error.errors.map((err) => err.message);
      if (errors.length == 0) {
        errors.push("El email ya esta en uso");
      }
      res.status(400).json({ errors });
    } else {
      res.json({ error });
    }
  }
};

module.exports = {
  getAll,
  createUser,
  getUserByID,
  login,
  updateUser,
  deleteUser,
  verifyUser,
  register
};
