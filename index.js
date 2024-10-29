const express = require('express');
const QRCode = require('qrcode');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/generate-qr', async (req, res) => {
  try {
    const { nombre, tipo_de_firma, fecha, observacion, cedula } = req.body;

    // Validate required fields
    if (!nombre || !tipo_de_firma || !fecha || !cedula) {
      return res.status(400).json({ 
        error: 'Missing required fields' 
      });
    }

    // Create data string for QR code
    const qrData = JSON.stringify({
      nombre,
      tipo_de_firma,
      fecha,
      observacion: observacion || '',
      cedula
    });

    // Generate QR code as base64
    const qrImage = await QRCode.toDataURL(qrData);

    res.json({ 
      success: true, 
      qrCode: qrImage 
    });

  } catch (error) {
    res.status(500).json({ 
      error: 'Error generating QR code',
      details: error.message 
    });
  }
});

app.listen(port, () => {
  console.log(`QR Code generator service running on port ${port}`);
});