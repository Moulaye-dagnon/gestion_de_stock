export const formatPrice = (price) => {
  if (price === null || price === undefined) return "N/A";
  const num = parseFloat(price);
  return num % 1 === 0 ? num.toString() : num.toFixed(2);
};
