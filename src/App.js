import './App.css';
import { useState } from 'react';
import calculateInvoice from './calculateInvoice';

import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";

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
    const newInvoice = { id: Date.now(), ...invoiceForm };
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
    <Container maxWidth="lg" style={{ marginTop: 40 }}>
      <Typography variant="h4" gutterBottom>
        Invoice Generator
      </Typography>

      <Paper style={{ padding: 25, marginBottom: 40 }}>
        <Typography variant="h6" gutterBottom>
          Create Invoice
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Qty"
              type="number"
              fullWidth
              value={invoiceForm.qty}
              onChange={(e) => handleFormChange("qty", e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              label="Price"
              type="number"
              fullWidth
              value={invoiceForm.price}
              onChange={(e) => handleFormChange("price", e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              label="Discount %"
              type="number"
              fullWidth
              value={invoiceForm.discountPercent}
              onChange={(e) =>
                handleFormChange("discountPercent", e.target.value)
              }
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              label="Discount"
              type="number"
              fullWidth
              value={invoiceForm.discount}
              onChange={(e) => handleFormChange("discount", e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              label="Tax %"
              type="number"
              fullWidth
              value={invoiceForm.taxPercent}
              onChange={(e) =>
                handleFormChange("taxPercent", e.target.value)
              }
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              label="Tax"
              type="number"
              fullWidth
              value={invoiceForm.tax}
              onChange={(e) => handleFormChange("tax", e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              label="Total Price"
              type="number"
              fullWidth
              value={invoiceForm.total}
              onChange={(e) => handleFormChange("total", e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              size="large"
              onClick={addInvoice}
            >
              Add Invoice
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper style={{ padding: 20 }}>
        <Typography variant="h6" gutterBottom>
          Invoice List
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Qty</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Discount %</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Tax %</TableCell>
              <TableCell>Tax</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {invoiceList.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>
                  <TextField
                    type="number"
                    value={invoice.qty}
                    onChange={(e) =>
                      handleRowChange(invoice.id, "qty", e.target.value)
                    }
                  />
                </TableCell>

                <TableCell>
                  <TextField
                    type="number"
                    value={invoice.price}
                    onChange={(e) =>
                      handleRowChange(invoice.id, "price", e.target.value)
                    }
                  />
                </TableCell>

                <TableCell>
                  <TextField
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
                </TableCell>

                <TableCell>
                  <TextField
                    type="number"
                    value={invoice.discount}
                    onChange={(e) =>
                      handleRowChange(invoice.id, "discount", e.target.value)
                    }
                  />
                </TableCell>

                <TableCell>
                  <TextField
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
                </TableCell>

                <TableCell>
                  <TextField
                    type="number"
                    value={invoice.tax}
                    onChange={(e) =>
                      handleRowChange(invoice.id, "tax", e.target.value)
                    }
                  />
                </TableCell>

                <TableCell>
                  <TextField
                    type="number"
                    value={invoice.total}
                    onChange={(e) =>
                      handleRowChange(invoice.id, "total", e.target.value)
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}