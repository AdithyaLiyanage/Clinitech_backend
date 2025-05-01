const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// In-memory storage for drug data (replace with database in production)
let drugs = [
  {
    id: '1',
    name: 'Paracetamol',
    genericName: 'Acetaminophen',
    category: 'Painkiller',
    description: 'For pain relief and fever reduction',
    manufacturer: 'PharmaCorp',
    batchNumber: 'PCM2023-001',
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(), // 180 days from now
    unitPrice: 5.99,
    stock: 100,
    status: 'Available',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// GET all drugs
router.get('/drugs', (req, res) => {
  res.json({
    success: true,
    data: drugs,
    message: 'Drugs fetched successfully'
  });
});

// GET drugs expiring soon (within 30 days)
router.get('/drugs/expiring', (req, res) => {
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
  
  const expiringDrugs = drugs.filter(drug => {
    const expiryDate = new Date(drug.expiryDate);
    return expiryDate <= thirtyDaysFromNow && expiryDate > new Date();
  });
  
  res.json({
    success: true,
    data: expiringDrugs,
    message: 'Expiring drugs fetched successfully'
  });
});

// GET a single drug by ID
router.get('/drugs/:id', (req, res) => {
  const drug = drugs.find(d => d.id === req.params.id);
  
  if (!drug) {
    return res.status(404).json({
      success: false,
      error: 'Drug not found'
    });
  }
  
  res.json({
    success: true,
    data: drug,
    message: 'Drug fetched successfully'
  });
});

// POST create a new drug
router.post('/drugs', (req, res) => {
  const {
    name,
    genericName,
    category,
    description,
    manufacturer,
    batchNumber,
    expiryDate,
    unitPrice,
    stock
  } = req.body;
  
  // Validate required fields
  if (!name || !genericName || !category || !manufacturer || !batchNumber || !expiryDate || !unitPrice) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields'
    });
  }
  
  // Determine status based on stock and expiry date
  let status = 'Available';
  if (stock <= 20 && stock > 0) {
    status = 'Low Stock';
  } else if (stock === 0 || new Date(expiryDate) < new Date()) {
    status = 'Expired';
  }
  
  const newDrug = {
    id: uuidv4(),
    name,
    genericName,
    category,
    description: description || '',
    manufacturer,
    batchNumber,
    expiryDate,
    unitPrice: parseFloat(unitPrice),
    stock: parseInt(stock, 10) || 0,
    status,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  drugs.push(newDrug);
  
  res.status(201).json({
    success: true,
    data: newDrug,
    message: 'Drug added successfully'
  });
});

// PUT update a drug
router.put('/drugs/:id', (req, res) => {
  const drugIndex = drugs.findIndex(d => d.id === req.params.id);
  
  if (drugIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Drug not found'
    });
  }
  
  const updatedDrug = {
    ...drugs[drugIndex],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  
  // Update status based on stock and expiry date
  if (updatedDrug.stock <= 20 && updatedDrug.stock > 0) {
    updatedDrug.status = 'Low Stock';
  } else if (updatedDrug.stock === 0 || new Date(updatedDrug.expiryDate) < new Date()) {
    updatedDrug.status = 'Expired';
  } else {
    updatedDrug.status = 'Available';
  }
  
  drugs[drugIndex] = updatedDrug;
  
  res.json({
    success: true,
    data: updatedDrug,
    message: 'Drug updated successfully'
  });
});

// DELETE a drug
router.delete('/drugs/:id', (req, res) => {
  const drugIndex = drugs.findIndex(d => d.id === req.params.id);
  
  if (drugIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Drug not found'
    });
  }
  
  drugs.splice(drugIndex, 1);
  
  res.json({
    success: true,
    message: 'Drug deleted successfully'
  });
});

// Health check endpoint
router.get('/health-check', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

module.exports = router;
