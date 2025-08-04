const pool = require("../../db");

const logout = async (req, res) => {
  try {
    const userId = req.user.id;

    await pool.execute("DELETE FROM refresh_tokens WHERE userId = ?", [userId]);

    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });
    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });

    return res.status(200).json({ message: "Déconnexion réussie" });
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error);
    res.status(500).json({ error: "Erreur serveur lors de la déconnexion" });
  }
};

module.exports = logout;
