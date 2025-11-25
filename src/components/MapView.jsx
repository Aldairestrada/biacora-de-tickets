import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 20.576860,
  lng: -101.232505
};

function MapaSalamanca() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDgmWncp0qoW5lvpaPBJx-OzpE_4HvYypU' // ← Tu clave real
  });

  return isLoaded ? (
    <div style={{ margin: '2rem 0' }}>
      <h2>📍 Universidad Tecnológica de Salamanca</h2>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={16}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  ) : (
    <p>Cargando mapa...</p>
  );
}

export default MapaSalamanca;
