import { useEffect, useRef } from 'react';
import { AccidentAlert } from '@/types/emergency';
import { MapPin } from 'lucide-react';

interface EmergencyMapProps {
  alerts: AccidentAlert[];
  selectedAlert?: AccidentAlert;
  onSelectAlert: (alert: AccidentAlert) => void;
}

export const EmergencyMap = ({
  alerts,
  selectedAlert,
  onSelectAlert,
}: EmergencyMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  const getMarkerColor = (severity: AccidentAlert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-critical';
      case 'warning':
        return 'bg-warning';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className="relative w-full h-full bg-card rounded-lg overflow-hidden border border-border">
      {/* Map placeholder with grid background */}
      <div
        ref={mapRef}
        className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      >
        {/* Map overlay elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Grid lines for "command center" aesthetic */}
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-primary/20" />
          <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-primary/20" />
        </div>

        {/* Accident markers */}
        {alerts.map((alert) => {
          // Convert lat/lng to screen position (simplified)
          const x = ((alert.location.lng + 74.0060) / 0.1) * 100;
          const y = ((40.7128 - alert.location.lat) / 0.1) * 100;

          return (
            <button
              key={alert.id}
              onClick={() => onSelectAlert(alert)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-125 ${
                selectedAlert?.id === alert.id ? 'scale-150 z-10' : 'z-0'
              } ${alert.status === 'new' ? 'animate-pulse-glow' : ''}`}
              style={{
                left: `${x}%`,
                top: `${y}%`,
              }}
            >
              <div
                className={`relative ${getMarkerColor(alert.severity)} rounded-full p-3 shadow-lg`}
              >
                <MapPin className="w-6 h-6 text-white" fill="currentColor" />
                {alert.status === 'new' && (
                  <div className="absolute inset-0 rounded-full bg-current opacity-50 animate-ping" />
                )}
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-card/95 backdrop-blur-sm border border-border rounded px-2 py-1 whitespace-nowrap text-xs font-mono-data shadow-lg">
                {alert.id}
              </div>
            </button>
          );
        })}

        {/* Selected alert info overlay */}
        {selectedAlert && (
          <div className="absolute bottom-6 left-6 right-6 bg-card/95 backdrop-blur-md border border-border rounded-lg p-4 shadow-2xl animate-slide-in-right">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-2">{selectedAlert.address}</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Vehicle:</span>
                    <p className="font-mono-data">{selectedAlert.vehicle.id}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Type:</span>
                    <p>{selectedAlert.vehicle.type}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Speed:</span>
                    <p className="font-mono-data">{selectedAlert.vehicle.speed} mph</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Node:</span>
                    <p className="font-mono-data">{selectedAlert.nodeId}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Map legend */}
        <div className="absolute top-4 right-4 bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
          <h4 className="text-xs font-bold mb-2 uppercase tracking-wide">Legend</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-critical" />
              <span>Critical</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-warning" />
              <span>Warning</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success" />
              <span>Dispatched</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
