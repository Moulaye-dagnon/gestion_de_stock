const normalizeQuantity = (quantity) => {
  const parsed = parseFloat(quantity);
  if (isNaN(parsed)) return "0.00";
  const rounded = Math.round(parsed * 2) / 2; // Arrondir à la demi-unité la plus proche
  return rounded.toFixed(2);
};

module.exports = normalizeQuantity;
