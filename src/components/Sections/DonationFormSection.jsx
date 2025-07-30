import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import QRCode from 'react-qr-code'; // ✅ Correct QR import
import { motion } from 'framer-motion';
import { uploadToCloudinary } from '../../utils/uploadToCloudinary';
import './DonationFormSection.css';
import './SectionCard.css';
import bg from '../../assets/images/donate-bg.jpg';

Modal.setAppElement('#root');

export default function DonationFormSection() {
  const donationAmounts = [1000, 2500, 5000, 10000];
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [proofPreview, setProofPreview] = useState(null);
  const [proofFile, setProofFile] = useState(null); // ✅ For actual crypto image file
  const [cameraStream, setCameraStream] = useState(null);
  const videoRef = useRef();
  const canvasRef = useRef();

  const walletAddress = 'bc1q3vpcnscmt6de4apjvgrk6d2hkyuywwxxn78sh5';
  const network = 'Bitcoin';

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!amount || parseInt(amount) < 1000) {
      alert('Minimum donation amount is $1000');
      return;
    }
    setModalIsOpen(true);
  };

  const handleProofUpload = (e, setPreview, setFile) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      if (setFile) setFile(file);
    }
  };

  const startCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { exact: 'environment' } } // ✅ Prefer back camera
    });
    setCameraStream(stream);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    }, 100);
  } catch (err) {
    alert('Unable to access back camera. Trying default camera instead.');
    console.error(err);

    // ✅ Fallback to default camera if environment is not available
    try {
      const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraStream(fallbackStream);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = fallbackStream;
        }
      }, 100);
    } catch (fallbackErr) {
      alert('Camera access denied or not supported.');
      console.error(fallbackErr);
    }
  }
};


  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    const dataURL = canvas.toDataURL('image/png');
    setImagePreview(dataURL);
    stopCamera();
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
  };

  const generateReceipt = async () => {
    const input = document.getElementById('receipt');
    input.style.display = 'block';

    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
    pdf.save(`donation-receipt-${Date.now()}.pdf`);

    input.style.display = 'none';
  };

  const submitGiftCard = async () => {
    try {
      let fileToUpload = imagePreview;

      if (imagePreview.startsWith('data:image')) {
        const blob = await (await fetch(imagePreview)).blob();
        fileToUpload = blob;
      }

      const uploadedUrl = await uploadToCloudinary(fileToUpload, 'gift-cards');
      console.log('Gift card uploaded:', uploadedUrl);

      await generateReceipt();
      alert('Thank you for saving a life today!');
      resetForm();
    } catch (err) {
      alert('Upload failed.');
      console.error(err);
    }
  };

  const submitCrypto = async () => {
    try {
      let fileToUpload = proofFile;

      if (!fileToUpload && proofPreview?.startsWith('data:image')) {
        const blob = await (await fetch(proofPreview)).blob();
        fileToUpload = blob;
      }

      if (!fileToUpload) {
        alert('No valid image file to upload');
        return;
      }

      const uploadedUrl = await uploadToCloudinary(fileToUpload, 'crypto-proofs');
      console.log('Crypto proof uploaded:', uploadedUrl);

      await generateReceipt();
      alert('Thank you for saving a life today!');
      resetForm();
    } catch (err) {
      alert('Upload failed.');
      console.error(err);
    }
  };

  const resetForm = () => {
    setAmount('');
    setName('');
    setModalIsOpen(false);
    setPaymentMethod('');
    setImagePreview(null);
    setProofPreview(null);
    setProofFile(null); // ✅ clear crypto file
    stopCamera();
  };

  return (
    <motion.section
      id="donate"
      className="section donate-form"
      style={{ backgroundImage: `url(${bg})` }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="overlay" />

      <div className="card form-container">
        <h2>Make a Donation</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <select value={amount} onChange={e => setAmount(e.target.value)} required>
            <option value="">Select Donation Amount</option>
            {donationAmounts.map((amt) => (
              <option key={amt} value={amt}>${amt}</option>
            ))}
          </select>
          <button type="submit">Give Now</button>
        </form>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={resetForm}
        contentLabel="Payment Modal"
        className="modal-box"
        overlayClassName="modal-overlay"
      >
        {!paymentMethod && (
          <div className="modal-content">
            <h3>Select Payment Method</h3>
            <button onClick={() => setPaymentMethod('gift')}>Pay with Gift Card</button>
            <button onClick={() => setPaymentMethod('crypto')}>Pay with Crypto</button>
            <button className="cancel-btn" onClick={resetForm}>Cancel</button>
          </div>
        )}

        {paymentMethod === 'gift' && (
          <div className="modal-content">
            <h3>Upload Gift Card</h3>
            <p>Scratch the PIN panel and snap or upload the card.</p>
            {!imagePreview && (
              <>
                <button onClick={startCamera}>Take Photo</button>
                <input type="file" accept="image/*" onChange={(e) => handleProofUpload(e, setImagePreview)} />
              </>
            )}
            {cameraStream && (
              <div>
                <video ref={videoRef} autoPlay playsInline />
                <button onClick={captureImage}>Capture</button>
              </div>
            )}
            {imagePreview && <img src={imagePreview} alt="Card" className="preview" />}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <button onClick={submitGiftCard}>Submit</button>
          </div>
        )}

        {paymentMethod === 'crypto' && (
          <div className="modal-content">
            <h3>Pay with Crypto</h3>
            <p>
              Send funds to:<br />
              <strong>{walletAddress}</strong><br />
              <strong>Network:</strong> {network}<br />
              ⚠️ Be careful not to send to the wrong address.
            </p>
            <QRCode value={walletAddress} size={160} bgColor="#ffffff" fgColor="#000000" />
            <br /><br />
            <input type="file" accept="image/*" onChange={(e) => handleProofUpload(e, setProofPreview, setProofFile)} />
            {proofPreview && <img src={proofPreview} alt="Proof" className="preview" />}
            <button onClick={submitCrypto}>Submit</button>
          </div>
        )}
      </Modal>

      {/* Hidden receipt container */}
      <div id="receipt" style={{ display: 'none', padding: '2rem' }}>
        <h2>Donation Receipt</h2>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Amount:</strong> ${amount}</p>
        <p><strong>Payment Method:</strong> {paymentMethod === 'gift' ? 'Gift Card' : 'Crypto'}</p>
        {paymentMethod === 'gift' && imagePreview && <img src={imagePreview} alt="Proof" style={{ width: '300px' }} />}
        {paymentMethod === 'crypto' && proofPreview && <img src={proofPreview} alt="Proof" style={{ width: '300px' }} />}
      </div>
    </motion.section>
  );
}
