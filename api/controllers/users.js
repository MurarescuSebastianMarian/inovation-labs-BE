const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Group = require("../models/group");

/** Login User */
exports.users_login = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed 1",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed 2",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              username: user[0].username,
              role: user[0].role,
              id: user[0]._id,
              image: user[0].image,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "72h",
            }
          );
          return res.status(200).json({
            message: "Auth successfuly",
            token: token,
          });
        }
        res.status(401).json({
          message: "Auth failed 3",
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: "ERROR in API users_login",
      });
    });
};

// Register
exports.users_singup = async (req, res, next) => {
  try {
    // Extragem datele din corpul cererii
    const {
      name,
      password,
      varsta,
      universitate,
      facultate,
      specializare,
      email,
      role,
      quizDone,
      quizResult,
    } = req.body;

    // Verificăm dacă utilizatorul există deja în baza de date după adresa de email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Adresa de email este deja înregistrată." });
    }

    // Creăm un nou utilizator utilizând modelul User
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      name,
      password,
      varsta,
      universitate,
      facultate,
      specializare,
      email,
      role,
      quizDone,
      quizResult,
    });

    // Salvăm noul utilizator în baza de date
    await newUser.save();

    // Generăm un token de autentificare pentru utilizatorul înregistrat
    const token = jwt.sign({ userId: newUser._id }, "secret_key", {
      expiresIn: "7d",
    }); // Parametrul "secret_key" este cheia secretă pentru semnarea token-ului

    // Returnăm răspunsul cu noul utilizator creat și token-ul de autentificare
    return res.status(201).json({
      message: "Utilizator înregistrat cu succes.",
      user: newUser,
      token,
    });
  } catch (err) {
    // Gestionăm erorile și le returnăm ca răspuns de eroare
    console.error(err);
    return res
      .status(500)
      .json({ message: "A apărut o eroare la înregistrare.", error: err });
  }
};

// Get All
exports.users_get_all = async (req, res, next) => {
  try {
    // Găsim toți utilizatorii din baza de date
    const users = await User.find();

    // Returnăm lista de utilizatori ca răspuns
    return res.status(200).json(users);
  } catch (err) {
    // Gestionăm erorile și le returnăm ca răspuns de eroare
    console.error(err);
    return res.status(500).json({
      message: "A apărut o eroare la obținerea utilizatorilor.",
      error: err,
    });
  }
};

// Get by ID
exports.users_get_by_id = async (req, res, next) => {
  try {
    const userId = req.params.id; // Obținem ID-ul utilizatorului din parametrul de rută

    // Găsim utilizatorul în baza de date după ID
    const user = await User.findById(userId);

    // Verificăm dacă utilizatorul a fost găsit
    if (!user) {
      return res.status(404).json({ message: "Utilizatorul nu a fost găsit." });
    }

    // Returnăm utilizatorul găsit ca răspuns
    return res.status(200).json(user);
  } catch (err) {
    // Gestionăm erorile și le returnăm ca răspuns de eroare
    console.error(err);
    return res.status(500).json({
      message: "A apărut o eroare la obținerea utilizatorului.",
      error: err,
    });
  }
};

// Update by ID
exports.users_update_by_id = async (req, res, next) => {
  try {
    const userId = req.params.id; // Obținem ID-ul utilizatorului din parametrul de rută
    const updatedUserData = req.body; // Obținem datele actualizate ale utilizatorului din corpul cererii

    // Actualizăm utilizatorul în baza de date după ID
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
      new: true,
    });

    // Verificăm dacă utilizatorul a fost găsit și actualizat
    if (!updatedUser) {
      return res.status(404).json({ message: "Utilizatorul nu a fost găsit." });
    }

    // Returnăm utilizatorul actualizat ca răspuns
    return res.status(200).json({
      message: "Utilizatorul a fost actualizat cu succes.",
      user: updatedUser,
    });
  } catch (err) {
    // Gestionăm erorile și le returnăm ca răspuns de eroare
    console.error(err);
    return res.status(500).json({
      message: "A apărut o eroare la actualizarea utilizatorului.",
      error: err,
    });
  }
};

// Delete by ID
exports.users_delete_by_id = async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Ștergem utilizatorul din baza de date după ID
    const user = await User.findByIdAndRemove(userId);

    // Verificăm dacă utilizatorul a fost găsit și șters
    if (!user) {
      return res.status(404).json({ message: "Utilizatorul nu a fost găsit." });
    }

    // Actualizăm grupurile care conțin referințe la utilizatorul șters
    await Group.updateMany({ users: userId }, { $pull: { users: userId } });

    // Returnăm mesajul de succes ca răspuns
    return res
      .status(200)
      .json({ message: "Utilizatorul a fost șters cu succes." });
  } catch (err) {
    // Gestionăm erorile și le returnăm ca răspuns de eroare
    console.error(err);
    return res.status(500).json({
      message: "A apărut o eroare la ștergerea utilizatorului.",
      error: err,
    });
  }
};
