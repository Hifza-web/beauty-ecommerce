const PDFDocument = require("pdfkit");

const generateInvoice = (order, res) => {
  const doc = new PDFDocument({
    margin: 50,
  });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=lumera-invoice-${order._id}.pdf`,
  );

  doc.pipe(res);

  // Header
  doc
    .fontSize(24)
    .font("Helvetica-Bold")
    .text("LUMÉRA", { align: "center" });

  doc
    .fontSize(10)
    .font("Helvetica")
    .text("Beauty Store", { align: "center" });

  doc.moveDown(2);

  // Invoice title
  doc
    .fontSize(20)
    .font("Helvetica-Bold")
    .text("INVOICE");

  doc.moveDown();

  // Order information
  doc
    .fontSize(10)
    .font("Helvetica")
    .text(`Order ID: ${order._id}`)
    .text(`Order Date: ${new Date(order.createdAt).toLocaleDateString()}`)
    .text(`Payment Method: ${order.paymentMethod}`)
    .text(`Payment Status: ${order.paymentStatus}`)
    .text(`Order Status: ${order.orderStatus}`);

  doc.moveDown();

  // Customer information
  doc
    .fontSize(12)
    .font("Helvetica-Bold")
    .text("Customer Information");

  doc
    .fontSize(10)
    .font("Helvetica")
    .text(`Name: ${order.shippingAddress.fullName}`)
    .text(`Address: ${order.shippingAddress.address}`)
    .text(`City: ${order.shippingAddress.city}`)
    .text(`Postal Code: ${order.shippingAddress.postalCode}`)
    .text(`Phone: ${order.shippingAddress.phone}`);

  doc.moveDown(2);

  // Products
  doc
    .fontSize(12)
    .font("Helvetica-Bold")
    .text("Order Items");

  doc.moveDown();

  order.items.forEach((item, index) => {
    const productName = item.product?.name || "Product";
    const quantity = item.quantity;
    const price = Number(item.price);
    const subtotal = price * quantity;

    doc
      .fontSize(10)
      .font("Helvetica")
      .text(
        `${index + 1}. ${productName} | Qty: ${quantity} | Price: $${price.toFixed(
          2,
        )} | Subtotal: $${subtotal.toFixed(2)}`,
      );

    doc.moveDown(0.5);
  });

  doc.moveDown();

  // Total
  doc
    .fontSize(14)
    .font("Helvetica-Bold")
    .text(`Total Amount: $${Number(order.totalAmount).toFixed(2)}`, {
      align: "right",
    });

  doc.moveDown(3);

  doc
    .fontSize(10)
    .font("Helvetica")
    .text("Thank you for shopping with LUMÉRA.", {
      align: "center",
    });

  doc
    .fontSize(9)
    .text("This is a computer-generated invoice.", {
      align: "center",
    });

  doc.end();
};

module.exports = generateInvoice;