import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const NEON_RED = '#ff2a2a';

// Custom Glowing Radar Marker
const createCustomIcon = (color) => {
  return L.divIcon({
    className: 'custom-radar-marker',
    html: `
      <div style="
        width: 12px; height: 12px; 
        background-color: ${color}; 
        border-radius: 50%; 
        box-shadow: 0 0 10px ${color}, 0 0 20px ${color};
        animation: pulse 2s infinite;
        border: 2px solid #fff;
      "></div>
    `,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
    popupAnchor: [0, -10],
  });
};

const surveillanceMarkers = [
  { pos: [40.7128, -74.0060], name: 'Stark Tower', info: 'New York Facility' },
  { pos: [38.8951, -77.0364], name: 'Triskelion', info: 'D.C. Headquarters' },
  { pos: [-3.0674, 37.3556], name: 'Wakanda Outpost', info: 'Vibranium Research' },
  { pos: [14.6042, 120.9943], name: 'Manila Hub', info: 'Southeast Asia Command' },
];

export default function MapWidget() {
  return (
    <>
      <MapContainer 
        center={[20, 0]} 
        zoom={2} 
        minZoom={2}
        maxBounds={[[-90, -180], [90, 180] ]}
        maxBoundsViscosity={1.0}
        style={{ height: '100%', width: '100%', background: '#0a0a0c', outline: 'none' }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          noWrap={true}
        />
        {surveillanceMarkers.map((m, i) => (
          <Marker key={i} position={m.pos} icon={createCustomIcon(NEON_RED)}>
            <Popup className="shield-popup">
              <div style={{ background: '#0f0f14', color: '#fff', padding: '12px', borderRadius: '4px', border: `1px solid ${NEON_RED}`, boxShadow: `0 0 15px rgba(255,42,42,0.2)` }}>
                <strong style={{ color: NEON_RED, textTransform: 'uppercase', fontSize: '13px', letterSpacing: '0.1em' }}>{m.name}</strong>
                <br />
                <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{m.info}</span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <style>
        {`
          /* Override Leaflet Controls */
          .leaflet-bar {
            border: 1px solid rgba(255, 42, 42, 0.3) !important;
            box-shadow: 0 0 10px rgba(0,0,0,0.5) !important;
            border-radius: 4px !important;
            overflow: hidden;
          }
          .leaflet-bar a {
            background-color: rgba(10, 10, 12, 0.9) !important;
            color: #ff2a2a !important;
            border-bottom: 1px solid rgba(255, 42, 42, 0.2) !important;
            transition: all 0.2s ease;
          }
          .leaflet-bar a:hover {
            background-color: rgba(255, 42, 42, 0.1) !important;
            color: #fff !important;
          }
          /* Remove blue outline on focus */
          .leaflet-container:focus {
            outline: none !important;
          }
          /* Fix popup arrow styling */
          .shield-popup .leaflet-popup-content-wrapper {
            background: transparent !important;
            padding: 0;
            border-radius: 0;
            box-shadow: none;
          }
          .shield-popup .leaflet-popup-tip-container {
            display: none; /* Hide the default white arrow */
          }
          .shield-popup .leaflet-popup-content {
            margin: 0;
          }
        `}
      </style>
    </>
  );
}
