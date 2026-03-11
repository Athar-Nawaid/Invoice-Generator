
export default function calculateInvoice(data, changedField) {
  let { qty, price, discountPercent, discount, taxPercent, tax, total } = data;

  qty = Number(qty);
  if (isNaN(qty)) qty = 0;
  price = Number(price) || 0;
  discountPercent = Number(discountPercent) || 0;
  discount = Number(discount) || 0;
  taxPercent = Number(taxPercent) || 0;
  tax = Number(tax) || 0;
  total = Number(total) || 0;

  let subtotal = qty * price;

  if (changedField === "discount") {
    discountPercent = subtotal ? (discount / subtotal) * 100 : 0;
  }

  if (changedField === "discountPercent") {
    discount = subtotal * (discountPercent / 100);
  }

  if (changedField === "tax") {
    let afterDiscount = subtotal - discount;
    taxPercent = afterDiscount ? (tax / afterDiscount) * 100 : 0;
  }

  if (changedField === "taxPercent") {
    let afterDiscount = subtotal - discount;
    tax = afterDiscount * (taxPercent / 100);
  }

  if (changedField === "total") {
    let base = 1 + taxPercent / 100;
    let afterDiscount = base ? total / base : 0;
    tax = total - afterDiscount;
    discount = subtotal - afterDiscount;
    discountPercent = subtotal ? (discount / subtotal) * 100 : 0;
  }

  let afterDiscount = subtotal - discount;
  tax = afterDiscount * (taxPercent / 100);
  total = afterDiscount + tax;

  return {
    qty,
    price,
    discountPercent: Number(discountPercent.toFixed(2)),
    discount: Number(discount.toFixed(2)),
    taxPercent: Number(taxPercent.toFixed(2)),
    tax: Number(tax.toFixed(2)),
    total: Number(total.toFixed(2))
  };
}