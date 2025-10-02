import { useState, useEffect } from 'react';
import { LeafletMap } from '@/components/LeafletMap';
import { AccidentAlert } from '@/types/emergency';
import { initialMockAlerts, generateMockAccident } from '@/lib/mockData';

const LiveMap = () => {
  const [alerts, setAlerts] = useState<AccidentAlert[]>(initialMockAlerts);
  const [selectedAlert, setSelectedAlert] = useState<AccidentAlert | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newAlert = generateMockAccident(`ACC-${Date.now()}`);
        setAlerts(prev => [newAlert, ...prev].slice(0, 20));
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-full">
      <div className="h-16 border-b border-border bg-card/50 px-6 flex items-center">
        <h1 className="text-2xl font-bold">Live Map View</h1>
        <div className="ml-auto text-sm text-muted-foreground">
          {alerts.length} Active Incidents
        </div>
      </div>
      
      <div className="h-[calc(100vh-4rem)] p-4">
        <LeafletMap
          alerts={alerts}
          selectedAlert={selectedAlert}
          onSelectAlert={setSelectedAlert}
        />
      </div>
    </div>
  );
};

export default LiveMap;
