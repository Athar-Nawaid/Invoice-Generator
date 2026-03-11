import { useState } from "react";

function calculateInvoice(data, changedField) {
  let {
    qty,
    price,
    discountPercent,
    discount,
    taxPercent,
    tax,
    total
  } = data;

  qty = Number(qty) || 0;
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

export default function App() {
  const [invoiceForm, setInvoiceForm] = useState({
    qty: 1,
    price: 0,
    discountPercent: 0,
    discount: 0,
    taxPercent: 0,
    tax: 0,
    total: 0
  });

  const [invoiceList, setInvoiceList] = useState([]);

  function handleFormChange(field, value) {
    const updated = { ...invoiceForm, [field]: value };
    const calculated = calculateInvoice(updated, field);
    setInvoiceForm(calculated);
  }

  function addInvoice() {
    const newInvoice = {
      id: Date.now(),
      ...invoiceForm
    };

    setInvoiceList([...invoiceList, newInvoice]);

    setInvoiceForm({
      qty: 1,
      price: 0,
      discountPercent: 0,
      discount: 0,
      taxPercent: 0,
      tax: 0,
      total: 0
    });
  }

  function handleRowChange(id, field, value) {
    const updatedList = invoiceList.map((invoice) => {
      if (invoice.id !== id) return invoice;

      const updated = { ...invoice, [field]: value };
      const calculated = calculateInvoice(updated, field);

      return { ...invoice, ...calculated };
    });

    setInvoiceList(updatedList);
  }

  return (
    <div style={{ padding: 30 }}>
      <h2>Create Invoice</h2>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <input
          type="number"
          value={invoiceForm.qty}
          onChange={(e) => handleFormChange("qty", e.target.value)}
          placeholder="Qty"
        />

        <input
          type="number"
          value={invoiceForm.price}
          onChange={(e) => handleFormChange("price", e.target.value)}
          placeholder="Price"
        />

        <input
          type="number"
          value={invoiceForm.discountPercent}
          onChange={(e) =>
            handleFormChange("discountPercent", e.target.value)
          }
          placeholder="Discount %"
        />

        <input
          type="number"
          value={invoiceForm.discount}
          onChange={(e) => handleFormChange("discount", e.target.value)}
          placeholder="Discount"
        />

        <input
          type="number"
          value={invoiceForm.taxPercent}
          onChange={(e) => handleFormChange("taxPercent", e.target.value)}
          placeholder="Tax %"
        />

        <input
          type="number"
          value={invoiceForm.tax}
          onChange={(e) => handleFormChange("tax", e.target.value)}
          placeholder="Tax"
        />

        <input
          type="number"
          value={invoiceForm.total}
          onChange={(e) => handleFormChange("total", e.target.value)}
          placeholder="Total"
        />

        <button onClick={addInvoice}>Add Invoice</button>
      </div>

      <h2 style={{ marginTop: 40 }}>Invoices</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Qty</th>
            <th>Price</th>
            <th>Discount %</th>
            <th>Discount</th>
            <th>Tax %</th>
            <th>Tax</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {invoiceList.map((invoice) => (
            <tr key={invoice.id}>
              <td>
                <input
                  type="number"
                  value={invoice.qty}
                  onChange={(e) =>
                    handleRowChange(invoice.id, "qty", e.target.value)
                  }
                />
              </td>

              <td>
                <input
                  type="number"
                  value={invoice.price}
                  onChange={(e) =>
                    handleRowChange(invoice.id, "price", e.target.value)
                  }
                />
              </td>

              <td>
                <input
                  type="number"
                  value={invoice.discountPercent}
                  onChange={(e) =>
                    handleRowChange(
                      invoice.id,
                      "discountPercent",
                      e.target.value
                    )
                  }
                />
              </td>

              <td>
                <input
                  type="number"
                  value={invoice.discount}
                  onChange={(e) =>
                    handleRowChange(invoice.id, "discount", e.target.value)
                  }
                />
              </td>

              <td>
                <input
                  type="number"
                  value={invoice.taxPercent}
                  onChange={(e) =>
                    handleRowChange(
                      invoice.id,
                      "taxPercent",
                      e.target.value
                    )
                  }
                />
              </td>

              <td>
                <input
                  type="number"
                  value={invoice.tax}
                  onChange={(e) =>
                    handleRowChange(invoice.id, "tax", e.target.value)
                  }
                />
              </td>

              <td>
                <input
                  type="number"
                  value={invoice.total}
                  onChange={(e) =>
                    handleRowChange(invoice.id, "total", e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}