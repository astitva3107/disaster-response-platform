// routes/disasters.js
const express = require('express');
const router = express.Router();
const { createDisaster, getDisasters } = require('../controllers/disasters');

router.post('/', createDisaster);
router.get('/', getDisasters);

module.exports = router;
// controllers/disasters.js
const supabase = require('../supabase');

exports.createDisaster = async (req, res) => {
  const { title, location_name, description, tags, owner_id } = req.body;
  // geocode to get lat/lng, then store
};

exports.getDisasters = async (req, res) => {
  const { tag } = req.query;
  const { data, error } = await supabase
    .from('disasters')
    .select('*')
    .contains('tags', [tag]);

  if (error) return res.status(500).json({ error });
  res.json(data);
};
// socket/index.js
module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('new_disaster', (data) => {
      io.emit('disaster_updated', data);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};
// Example call
const createDisaster = async () => {
  const response = await fetch('https://your-backend/api/disasters', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: 'Flood in Bihar',
      location_name: 'Patna, Bihar',
      description: 'Heavy rainfall has caused flooding.',
      tags: ['flood'],
      owner_id: 'reliefAdmin'
    })
  });
  const result = await response.json();
  console.log(result);
};
