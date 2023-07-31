// Function to fetch images from Unsplash based on the search term
async function searchImages(searchTerm) {
  const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchTerm)}&client_id=UXMCRYe-ga90_rEL7VU2aP2rKzikuY10Yjt41RpO6VY`);
  const imageData = await response.json();
  return imageData.results;
}

// Function to display the search results (images)
function displaySearchResults(images) {
  const imageResultsContainer = document.getElementById('imageResultsContainer');
  imageResultsContainer.innerHTML = ''; // Clear previous results

  if (images.length === 0) {
    imageResultsContainer.innerHTML = 'No images found for the search term.';
  } else {
    images.forEach(image => {
      const imageElement = document.createElement('img');
      imageElement.src = image.urls.regular;
      imageElement.alt = image.description || 'Unsplash Image';
      imageElement.width = 300;
      imageResultsContainer.appendChild(imageElement);
    });
  }
}

// Function to handle the image search
function performImageSearch() {
  const imageSearchInput = document.getElementById('imageSearchInput');
  const searchTerm = imageSearchInput.value.trim();

  if (!searchTerm) {
    alert('Please enter a valid search term for images.');
    return;
  }

  searchImages(searchTerm)
    .then(images => displaySearchResults(images))
    .catch(error => {
      console.error('Error fetching images:', error);
      alert('Error fetching images. Please try again later.');
    });
}

// Function to fetch autocomplete suggestions for the location input
async function getAutocompleteSuggestions(searchTerm) {
  // You can implement the code for fetching autocomplete suggestions from Yelp API here
  // Replace YOUR_YELP_API_KEY with your actual Yelp API key
  const response = await fetch(`https://api.yelp.com/v3/autocomplete?text=${encodeURIComponent(searchTerm)}`, {
    headers: {
      Authorization: 'Bearer DeogjdF6ScqfCoVjAISUMLMdbxK2jZQZlApZIENcSDfXa_4aRRUxWNrCh8wQGtj_1jZrfXcnWrn4Y-LlhYqjQFZztQfNsanFmCe_mvBADcKNMowQFIBQeUmDZc3CZHYx'
    }
  });

  const data = await response.json();
  return data.terms;
}

// Function to display autocomplete suggestions
function displayAutocompleteSuggestions(suggestions) {
  const autocompleteSuggestionsContainer = document.getElementById('autocompleteSuggestionsContainer');
  autocompleteSuggestionsContainer.innerHTML = ''; // Clear previous suggestions

  if (suggestions.length === 0) {
    autocompleteSuggestionsContainer.innerHTML = 'No autocomplete suggestions found.';
  } else {
    suggestions.forEach(suggestion => {
      const suggestionElement = document.createElement('div');
      suggestionElement.textContent = suggestion.text;
      autocompleteSuggestionsContainer.appendChild(suggestionElement);
    });
  }
}

// Function to handle the search for nearby salons with autocomplete
async function searchNearbySalons() {
  const locationInput = document.getElementById('locationInput');
  const location = locationInput.value.trim();

  if (!location) {
    alert('Please enter a valid location for nearby salons.');
    return;
  }

  try {
    // You can implement the code for fetching nearby salons from Yelp API here
    // Replace YOUR_YELP_API_KEY with your actual Yelp API key
    const response = await fetch(`https://api.yelp.com/v3/businesses/search?location=${encodeURIComponent(location)}`, {
      headers: {
        Authorization: 'Bearer DeogjdF6ScqfCoVjAISUMLMdbxK2jZQZlApZIENcSDfXa_4aRRUxWNrCh8wQGtj_1jZrfXcnWrn4Y-LlhYqjQFZztQfNsanFmCe_mvBADcKNMowQFIBQeUmDZc3CZHYx'
      }
    });

    const nearbySalons = await response.json();

    // Display the nearby salons
    const nearbySalonsContainer = document.getElementById('nearbySalonsContainer');
    nearbySalonsContainer.innerHTML = ''; // Clear previous results

    if (nearbySalons.businesses.length === 0) {
      nearbySalonsContainer.innerHTML = 'No nearby salons found.';
    } else {
      nearbySalons.businesses.forEach(salon => {
        const salonElement = document.createElement('div');
        salonElement.textContent = salon.name;
        nearbySalonsContainer.appendChild(salonElement);
      });
    }
  } catch (error) {
    console.error('Error fetching nearby salons:', error);
    alert('Error fetching nearby salons. Please try again later.');
  }
}

// Event listener for the image search button
document.getElementById('searchImageButton').addEventListener('click', performImageSearch);

// Event listener for the location input to fetch autocomplete suggestions
document.getElementById('locationInput').addEventListener('input', () => {
  const locationInput = document.getElementById('locationInput');
  const searchTerm = locationInput.value.trim();
  
  getAutocompleteSuggestions(searchTerm)
    .then(suggestions => displayAutocompleteSuggestions(suggestions))
    .catch(error => {
      console.error('Error fetching autocomplete suggestions:', error);
      alert('Error fetching autocomplete suggestions. Please try again later.');
    });
});

// Event listener for the nearby salons search button
document.getElementById('searchButton').addEventListener('click', searchNearbySalons);
