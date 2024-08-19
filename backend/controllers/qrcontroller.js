const QRCode = require('qrcode');

const generateQRCode = async (req, res) => {
    const { email, event } = req.body;
    const userId = req.userId;
    const date = new Date().toISOString().split('T')[0];
    const currentTime = date.substring(0, date.indexOf('T'));
    console.log("date - ", date)
    console.log("currentTime - ", currentTime)
   
  
    if (!email || !userId || !event) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    // Generate QR code data
    const qrData = `Email: ${email}, User ID: ${userId}, Event: ${event}, Time: ${currentTime}, Date: ${date}`;
  
    try {
      // Generate QR code image as a data URL
      const qrCodeImageUrl = await QRCode.toDataURL(qrData);
  
      // Send the QR code image URL back as a response
      res.json({ qrCodeImageUrl });
    } catch (error) {
      console.error('Error generating QR code:', error);
      res.status(500).json({ error: 'Error generating QR code' });
    }
}

module.exports = {
    generateQRCode,
};