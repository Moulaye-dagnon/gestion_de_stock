const pool = require("../db");
const bcryt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { nom, email, password } = req.body;

    if (!nom || !email || !password) {
      res.status(400).json({ error: "tout les champs ne sont pas fournie" });
    }
    const [row] = await pool.execute(
      "select * from utilisateur where email = ?",
      [email]
    );
    if (row.length > 0) {
      return res.status(409).json({ error: "Cet email est déjà utilisé" });
    }

    const hashPassword = await bcryt.hash(password, 10);
    const [result] = await pool.execute(
      "insert into utilisateur(nom,email,motDePasse,dateCreation) values(?,?,?,now())",
      [nom, email, hashPassword]
    );

    const [newUser] = await pool.execute(
      "select id,email,role,dateCreation from utilisateur where id= ?",
      [result.insertId]
    );

    res.status(201).json({ message: "Utilisateur crée" });
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    res.status(500).json({ error: "Erreur serveur lors de l'inscription" });
  }
};

module.exports = register;
