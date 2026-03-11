# Invoice Generator (React)

This is a simple invoice generator built with React. The goal of this project is to allow users to create invoices by entering values such as quantity, price, discount, and tax. All values in the form are connected, so changing one field automatically recalculates the others.

The project was built as a frontend-only assignment using React, without any backend or database.

## Features

* Create invoices using an interactive form
* All fields are editable and dynamically recalculate related values
* Prevents negative numbers in all fields
* Inputs do not start with leading zero while typing
* Submitted invoices appear in a table below the form
* Inline editing is supported directly inside the table
* Clean UI built using Material UI components
* Uses only two React `useState` hooks for state management

## Invoice Fields

The invoice form contains the following fields:

* Qty
* Price
* Discount %
* Discount
* Tax %
* Tax
* Total Price

All fields depend on each other. For example:

* Changing **Qty** or **Price** updates Discount, Tax, and Total
* Editing **Discount %** recalculates the Discount value
* Editing **Tax %** updates Tax and Total
* Editing **Total Price** recalculates other dependent values

## Technologies Used

* React (Functional Components)
* React Hooks (`useState`)
* Material UI for styling and layout

## How to Run the Project

1. Clone the repository

```
git clone <repository-url>
```

2. Navigate to the project folder

```
cd invoice-generator
```

3. Install dependencies

```
npm install
```

4. Install Material UI

```
npm install @mui/material @emotion/react @emotion/styled
```

5. Start the development server

```
npm start
```

The app will run at:

```
http://localhost:3000
```

## Project Structure

```
src
 ├── App.js
 ├── index.js
 └── styles
```

All the main logic for the invoice calculations and UI lives inside `App.js`.

## Calculation Logic

The application calculates values using the following general structure:

* Subtotal = Qty × Price
* Discount = Subtotal × Discount %
* After Discount = Subtotal − Discount
* Tax = After Discount × Tax %
* Total Price = After Discount + Tax

The calculations update automatically whenever any field changes.

## Notes

* The project does not include a backend or database.
* All invoice data is stored temporarily in the React state.
* Refreshing the page will reset the invoice list.

## Future Improvements

Some possible improvements could include:

* Adding invoice export (PDF or CSV)
* Adding currency formatting
* Persisting invoices using local storage
* Adding validation and better error handling

---

This project focuses mainly on managing dependent form fields and maintaining consistent calculations while keeping the React state minimal.
