import qr from "qrcode";
import PdfPrinter from "pdfmake";
import { logger } from "../config/logger.js";

const fonts = {
  Helvetica: {
    normal: "Helvetica",
    bold: "Helvetica-Bold",
  },
};

const printer = new PdfPrinter(fonts);

export const paymentSlip = async (req, res) => {
  const { valor, vencimento, codigoBarras } = req.body;

  const missingFields = ["valor", "vencimento", "codigoBarras"].filter(
    (field) => !req.body[field]
  );

  if (missingFields.length) {
    return res.status(400).json({
      message: `Campos obrigatórios ausentes: ${missingFields.join(", ")}`,
    });
  }

  try {
    const qrCode = await qr.toDataURL(codigoBarras);

    const docDefinition = {
      content: [
        { text: "Boleto", style: "header" },
        { text: `Valor: R$ ${valor}`, margin: [0, 20, 0, 0] },
        { text: `Vencimento: ${vencimento}`, margin: [0, 10, 0, 0] },
        { image: qrCode, width: 150, margin: [0, 20, 0, 0] },
        {
          text: `Código de Barras: ${codigoBarras}`,
          margin: [0, 10, 0, 0],
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 20],
        },
      },
      defaultStyle: {
        font: "Helvetica",
      },
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition);

    const chunks = [];
    pdfDoc.on("data", (chunk) => chunks.push(chunk));
    pdfDoc.on("end", () => {
      const pdfBuffer = Buffer.concat(chunks);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=boleto.pdf"
      );
      res.send(pdfBuffer);
    });

    pdfDoc.end();
  } catch (error) {
    logger.error("Erro ao gerar PDF:", error);
    res.status(500).json({ message: "Erro ao gerar o PDF" });
  }
};
