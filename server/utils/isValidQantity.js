const isValidQantity = (value) => {
  const parsed = parseFloat(value);
  if (isNaN(parsed) || parsed < 0) {
    throw new Error("La doit etre un nombre positif");
  }
  const decimalPart = parsed % 1;
  if (decimalPart !== 0 && decimalPart !== 0.5) {
    throw new Error(
      "La quantité doit être entière ou une demi-unité (ex. : 1, 2.5)"
    );
  }
  return true;
};
module.exports = isValidQantity;
