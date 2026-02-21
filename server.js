require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// ================= EMAIL TRANSPORTER =================

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ================= CONTACT ROUTE =================

app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await transporter.sendMail({
      from: `"Website Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Contact Message from ${name}`,
      html: `
        <h3>New Contact Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b><br>${message}</p>
      `,
    });

    return res.json({ success: true });
  } catch (error) {
    console.log("Mail Error:", error);
    return res.status(500).json({ success: false });
  }
});

// ================= PLACE ORDER ROUTE =================

app.post("/place-order", async (req, res) => {
  const {
    name,
    phone,
    email,
    product,
    quantity,
    address,
    district,
    state,
    message,
  } = req.body;

  try {
    await transporter.sendMail({
      from: `"Website Order" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "🛒 New Order - Shri Ji AgriTech",
      html: `
        <h2>New Order Received</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Product:</b> ${product}</p>
        <p><b>Quantity:</b> ${quantity}</p>
        <p><b>Address:</b> ${address}</p>
        <p><b>District:</b> ${district}</p>
        <p><b>State:</b> ${state}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    return res.json({ success: true });
  } catch (error) {
    console.log("Order Error:", error);
    return res.status(500).json({ success: false });
  }
});

// ❌ REMOVE app.listen()

module.exports = app;