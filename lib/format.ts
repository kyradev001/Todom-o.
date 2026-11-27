const dop = new Intl.NumberFormat("es-DO", {
  style: "currency",
  currency: "DOP",
  maximumFractionDigits: 0,
});

export function formatPrice(amount: number): string {
  return dop.format(amount);
}

export function stockLabel(quantity: number): string {
  if (quantity <= 0) return "Agotado";
  if (quantity <= 3) return `Quedan ${quantity}`;
  return "Disponible";
}
