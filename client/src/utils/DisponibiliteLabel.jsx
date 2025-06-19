const getDisponibiliteLabel = (stock, seuil) => {
  const s = parseFloat(stock);
  const seuilVal = parseFloat(seuil);

  if (s === 0) {
    return <span className="text-red-600 font-semibold">Rupture</span>;
  }
  if (s <= seuilVal) {
    return <span className="text-yellow-600 font-medium">Stock faible</span>;
  }
  return <span className="text-green-600">En stock</span>;
};

export default getDisponibiliteLabel;
