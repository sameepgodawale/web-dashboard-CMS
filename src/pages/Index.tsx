import { useState, useEffect } from 'react';
import { AlertTriagePanel } from '@/components/AlertTriagePanel';
import { LeafletMap } from '@/components/LeafletMap';
import { SystemHealthBar } from '@/components/SystemHealthBar';
import { ResponseTimer } from '@/components/ResponseTimer';
import { AccidentAlert } from '@/types/emergency';
import { initialMockAlerts, mockSystemHealth, generateMockAccident } from '@/lib/mockData';
import { mockRSUs, mockOBUs } from '@/lib/v2xMockData';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertTriangle, Radio, AlertCircle, Car, Activity } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [alerts, setAlerts] = useState<AccidentAlert[]>(initialMockAlerts);
  const [selectedAlert, setSelectedAlert] = useState<AccidentAlert | undefined>(
    initialMockAlerts[0]
  );
  const [systemHealth, setSystemHealth] = useState(mockSystemHealth);
  const [newAlertIndicator, setNewAlertIndicator] = useState(false);

  // Simulate real-time alert updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly generate new alerts (20% chance every 10 seconds)
      if (Math.random() < 0.2) {
        const newAlert = generateMockAccident(`ACC-${Date.now().toString().slice(-4)}`);
        setAlerts((prev) => [newAlert, ...prev]);
        setNewAlertIndicator(true);
        
        toast.error(`New ${newAlert.severity.toUpperCase()} Alert`, {
          description: newAlert.address,
          duration: 5000,
        });

        setTimeout(() => setNewAlertIndicator(false), 3000);
      }

      // Update system health
      setSystemHealth((prev) => ({
        ...prev,
        vanetConnectivity: 95 + Math.floor(Math.random() * 5),
        databaseLatency: 40 + Math.floor(Math.random() * 20),
        lastUpdate: new Date(),
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleDispatch = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, status: 'dispatched' as const } : alert
      )
    );

    toast.success('Emergency Response Dispatched', {
      description: `Units dispatched to ${alerts.find(a => a.id === alertId)?.address}`,
    });
  };

  const handleSelectAlert = (alert: AccidentAlert) => {
    setSelectedAlert(alert);
  };

  const activeAlerts = alerts.filter((a) => a.status === 'new');
  const oldestActiveAlert = activeAlerts.length > 0 ? activeAlerts[activeAlerts.length - 1] : null;
  const onlineRSUs = mockRSUs.filter(rsu => rsu.status === 'online').length;
  const activeOBUs = mockOBUs.filter(obu => obu.status === 'active').length;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-critical/20 rounded-lg">
                <AlertTriangle className="w-8 h-8 text-critical" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  Emergency Response Command Center
                </h1>
                <p className="text-sm text-muted-foreground">
                  VANET Accident Detection & Dispatch System
                </p>
              </div>
            </div>

            {oldestActiveAlert && (
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    Response Time
                  </p>
                  <ResponseTimer timestamp={oldestActiveAlert.timestamp} />
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* System Health & KPIs */}
      <div className="px-6 py-4 bg-card/50 border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          <Card className="p-4 bg-gradient-to-br from-critical/10 to-transparent border-critical/20">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Active Alerts</div>
                <div className="text-3xl font-bold font-mono-data">{activeAlerts.length}</div>
              </div>
              <AlertCircle className="w-8 h-8 text-critical" />
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Vehicles Online</div>
                <div className="text-3xl font-bold font-mono-data">{activeOBUs}</div>
              </div>
              <Car className="w-8 h-8 text-primary" />
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-success/10 to-transparent border-success/20">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground mb-1">RSUs Connected</div>
                <div className="text-3xl font-bold font-mono-data">{onlineRSUs}/{mockRSUs.length}</div>
              </div>
              <Activity className="w-8 h-8 text-success" />
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-warning/10 to-transparent border-warning/20">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Avg Latency</div>
                <div className="text-3xl font-bold font-mono-data">{systemHealth.databaseLatency}ms</div>
              </div>
              <Activity className="w-8 h-8 text-warning" />
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground mb-1">System Health</div>
                <div className="text-3xl font-bold font-mono-data">{systemHealth.vanetConnectivity}%</div>
              </div>
              <Activity className="w-8 h-8 text-primary" />
            </div>
          </Card>
        </div>
        <SystemHealthBar health={systemHealth} />
      </div>

      {/* New Alert Indicator */}
      {newAlertIndicator && (
        <div className="bg-critical/20 border-b border-critical animate-pulse">
          <div className="container mx-auto px-6 py-2">
            <div className="flex items-center justify-center gap-2 text-critical font-bold">
              <Radio className="w-4 h-4 animate-ping" />
              <span>NEW ALERT RECEIVED - CHECK TRIAGE PANEL</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Map Section - 70% width */}
        <div className="flex-1 p-6">
          <LeafletMap
            alerts={alerts}
            selectedAlert={selectedAlert}
            onSelectAlert={handleSelectAlert}
          />
        </div>

        {/* Alert Triage Panel - 30% width */}
        <aside className="w-[400px] border-l border-border bg-card/50 overflow-hidden">
          <AlertTriagePanel
            alerts={alerts}
            onSelectAlert={handleSelectAlert}
            onDispatch={handleDispatch}
            selectedAlertId={selectedAlert?.id}
          />
        </aside>
      </main>

      {/* Footer - Quick Actions */}
      <footer className="bg-card border-t border-border">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Quick Actions:</span>
              <Button
                variant="dispatch"
                size="sm"
                disabled={activeAlerts.length === 0}
                onClick={() => activeAlerts[0] && handleDispatch(activeAlerts[0].id)}
              >
                Dispatch First Alert
              </Button>
            </div>

            <div className="text-sm text-muted-foreground">
              Active: <span className="font-bold text-critical">{activeAlerts.length}</span> |
              Dispatched: <span className="font-bold text-success">
                {alerts.filter((a) => a.status === 'dispatched').length}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
