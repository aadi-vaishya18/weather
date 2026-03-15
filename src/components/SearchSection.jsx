const SearchSection = ({getWeatherDetails, searchInputRef }) => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    
    const handleCitySearch = (e) => {
        e.preventDefault();
        
        if (!API_KEY) {
            console.error("API_KEY is not defined. Please add VITE_API_KEY to your .env file.");
            alert("API_KEY is not configured. Please add VITE_API_KEY to your .env file.");
            return;
        }
        
        const searchInput = e.target.querySelector('.search-input');
        
        if (!searchInput.value.trim()) {
            console.error("Please enter a city name");
            return;
        }
        
        const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchInput.value}&days=2`;
        getWeatherDetails(API_URL);
    };

    const handleLocationSearch = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=2`;
        getWeatherDetails(API_URL);
        },
        () =>{
          alert("Unable to retrieve your location. Please allow location access and try again.");
        }
      )
    }

  return (
    <div className="search-section">

        <form action="#" className="search-form" onSubmit={handleCitySearch}>
          <span className="material-symbols-rounded">search</span>

          <input
            type="text"
            placeholder="Enter a city name"
            ref={searchInputRef}
            className="search-input"
          />
        </form>

        <button className="location-button" onClick={handleLocationSearch}>
          <span className="material-symbols-rounded">my_location</span>
        </button>

      </div>
  )
}

export default SearchSection