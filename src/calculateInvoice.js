
export default function calculateInvoice(data, changedField) {
  let { qty, price, discountPercent, discount, taxPercent, tax, total } = data;

  qty = Number(qty);
  price = Number(price);
  discountPercent = Number(discountPercent);
  discount = Number(discount);
  taxPercent = Number(taxPercent);
  tax = Number(tax);
  total = Number(total);

  if (isNaN(qty)) qty = 0;
  if (isNaN(price)) price = 0;
  if (isNaN(discountPercent)) discountPercent = 0;
  if (isNaN(discount)) discount = 0;
  if (isNaN(taxPercent)) taxPercent = 0;
  if (isNaN(tax)) tax = 0;
  if (isNaN(total)) total = 0;

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