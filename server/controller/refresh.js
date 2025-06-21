const pool = require("../db");
const jwt = require("jsonwebtoken");
const refresh = async (req, res) => {
  const refreshToken = req.cookies.refresh_token;
  if (!refreshToken) {
    return res.status(403).json({ erro: "refreshtoken n'existe pas" });
  }
  try {
    const [row] = await pool.execute(
      "select * from refresh_tokens where token = ?",
      [refreshToken]
    );

    if (row.length === 0) {
      return res.status(403).json({ erro: "refreshtoken ne correspond pas" });
    }
    const userId = row[0].userId;

    const [userRow] = await pool.execute(
      "select * from utilisateur where  id = ?",
      [userId]
    );

    if (userRow.length === 0) {
      return res.status(403).json({ error: "Utilisateur non trouve" });
    }
    const user = userRow[0];
    const payload = { id: user.id, nom: user.nom, role: user.role };

    const access_token = jwt.sign(payload, process.env.JWT_SECRET);
    res.cookie("access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000,
    });
    res.status(200).json({ message: "Rafraichissement reussie" });
  } catch (error) {
    console.log("error lors du rafraichissement", error);
    res.status(500).json({ error: "Erreur serveur lors du rafraichissement" });
  }
};

module.exports = refresh;
