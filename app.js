const express = require('express');
const cors = require('cors'); // Require the cors package
const app = express();
const yelp = require('yelp-fusion');

const PORT = 3000;

// Replace 'YOUR_YELP_API_KEY' with your actual Yelp API key
const yelpClient = yelp.client('DeogjdF6ScqfCoVjAISUMLMdbxK2jZQZlApZIENcSDfXa_4aRRUxWNrCh8wQGtj_1jZrfXcnWrn4Y-LlhYqjQFZztQfNsanFmCe_mvBADcKNMowQFIBQeUmDZc3CZHYx');

// Use cors middleware to handle CORS with custom options
app.use(cors({
  origin: '*', // Allow requests from any origin, replace * with specific origins if needed
}));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Add a new route to get nearby salons
app.get('/api/nearbySalons', async (req, res) => {
  const location = req.query.location; // Get the location from the request query
  try {
    // Use the Yelp API to search for nearby salons
    const response = await yelpClient.search({
      term: 'nail salon',
      location: location,
      categories: 'beautysvc',
      limit: 10 // You can adjust the limit to display more or fewer results
    });
    const nearbySalons = response.jsonBody.businesses;
    res.json(nearbySalons);
  } catch (error) {
    console.error('Error fetching nearby salons:', error);
    res.status(error.statusCode || 500).json({ error: 'Error fetching nearby salons' });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
