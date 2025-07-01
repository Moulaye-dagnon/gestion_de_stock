const pool = require("../../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [users] = await pool.execute(
      "select * from utilisateur where email= ?",

      [email]
    );

    if (!users.length) {
      res.status(404).json({ error: "utilisateur existe pas" });
    }
    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.motDePasse);
    if (!isPasswordValid) {
      res.status(407).json({ error: "Votre mot de passe est incorrect" });
    }

    const payload = { id: user.id, nom: user.nom, role: user.role };
    const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const refres_token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await pool.execute("delete from refresh_tokens WHERE userId = ?", [
      user.id,
    ]);
    await pool.execute(
      "insert into refresh_tokens(userId,token,expiresAt) values(?,?,?)",
      [user.id, refres_token, expiresAt]
    );

    res.cookie("access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000,
    });
    res.cookie("refresh_token", refres_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ message: "Connexion reussie" });
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    res.status(500).json({ error: "Erreur serveur lors de la connexion" });
  }
};

module.exports = login;
