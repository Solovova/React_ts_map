import React from 'react';
import logo from './logo.svg';
import './App.css';
import MapboxMap from "./components/mapbox_map";

function App() {
  return (
    <div className="fill-window"><MapboxMap x={24.715093} y={48.923986} zoom={16} /></div>
  );
}

export default App;
