import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import api from './api';
import './App.css';

const mapContainerStyle = {
  height: '60vh',
  width: '100%'
};

const quitoCenter = {
  lat: -0.1807,
  lng: -78.4678
};

const App = () => {
  const [places, setPlaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [mapCenter, setMapCenter] = useState(quitoCenter);

  const fetchPlaces = async (query) => {
    try {
      const response = await api.get('/search', {
        params: {
          query: query,
          limit: 10
        }
      });
      setPlaces(response.data.results);
      if (response.data.results.length > 0) {
        const { latitude, longitude } = response.data.results[0].geocodes.main;
        setMapCenter({ lat: latitude, lng: longitude });
      }
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPlaces(searchQuery);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Guía Turística UIO</h1>
        <p>Encuentra los mejores lugares turísticos de Quito</p>
      </header>
      <main className="main-content">
        <section className="description">
          <h2>Explora la Carita de Dios</h2>
          <p>Utiliza nuestra aplicación para buscar y descubrir restaurantes, museos, hoteles y otros puntos de interés en cualquier parte de Quito.</p>
        </section>
        <section className="search-section">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Buscar lugares..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">Buscar</button>
          </form>
        </section>
        <section className="map-section">
          <LoadScript googleMapsApiKey="AIzaSyCZRxMKVVEZz2VbDhNp1FCjZbm59D1xoUA">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={mapCenter}
              zoom={10}
            >
              {places.map(place => (
                <Marker
                  key={place.fsq_id}
                  position={{
                    lat: place.geocodes.main.latitude,
                    lng: place.geocodes.main.longitude
                  }}
                  title={place.name}
                />
              ))}
            </GoogleMap>
          </LoadScript>
        </section>
      </main>
      <footer className="footer">
        <p>&copy; 2024 Guía Turística UIO. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default App;
