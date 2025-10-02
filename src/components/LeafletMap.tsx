import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { AccidentAlert } from '@/types/emergency';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface LeafletMapProps {
  alerts: AccidentAlert[];
  selectedAlert?: AccidentAlert;
  onSelectAlert?: (alert: AccidentAlert) => void;
}

export const LeafletMap = ({ alerts, selectedAlert, onSelectAlert }: LeafletMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Initialize map
    const map = L.map(containerRef.current).setView([40.7128, -74.0060], 12);
    mapRef.current = map;

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current.clear();

    // Add new markers
    alerts.forEach(alert => {
      const markerColor = 
        alert.severity === 'critical' ? '#ef4444' :
        alert.severity === 'warning' ? '#f59e0b' : '#10b981';

      const icon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            width: 24px;
            height: 24px;
            background-color: ${markerColor};
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 0 10px rgba(0,0,0,0.3);
            ${alert.id === selectedAlert?.id ? 'transform: scale(1.3);' : ''}
          "></div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const marker = L.marker([alert.location.lat, alert.location.lng], { icon })
        .addTo(map)
        .bindPopup(`
          <div style="min-width: 200px;">
            <strong style="color: ${markerColor}; font-size: 14px;">
              ${alert.severity.toUpperCase()}
            </strong>
            <p style="margin: 4px 0;"><strong>Location:</strong> ${alert.address}</p>
            <p style="margin: 4px 0;"><strong>Vehicle:</strong> ${alert.vehicle.type}</p>
            <p style="margin: 4px 0;"><strong>Status:</strong> ${alert.status}</p>
          </div>
        `);

      marker.on('click', () => {
        onSelectAlert?.(alert);
      });

      markersRef.current.set(alert.id, marker);
    });

    // Center on selected alert
    if (selectedAlert) {
      map.flyTo([selectedAlert.location.lat, selectedAlert.location.lng], 15, {
        duration: 1,
      });
    }
  }, [alerts, selectedAlert, onSelectAlert]);

  return <div ref={containerRef} className="w-full h-full rounded-lg overflow-hidden border border-border" />;
};