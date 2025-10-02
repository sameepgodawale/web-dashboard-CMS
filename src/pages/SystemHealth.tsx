import { useState, useEffect } from 'react';
import { mockNetworkMetrics, mockRSUs } from '@/lib/v2xMockData';
import { Card } from '@/components/ui/card';
import { Activity, Zap, Network, TrendingUp } from 'lucide-react';
import { NetworkMetrics } from '@/types/v2x';

const SystemHealth = () => {
  const [metrics, setMetrics] = useState<NetworkMetrics>(mockNetworkMetrics);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        packetDeliveryRatio: 95 + Math.random() * 5,
        averageLatency: 10 + Math.random() * 10,
        duplicatePacketRatio: Math.random() * 2,
        throughput: 2000 + Math.random() * 1000,
        activeConnections: 300 + Math.floor(Math.random() * 50),
        timestamp: new Date(),
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const onlineRSUs = mockRSUs.filter(rsu => rsu.status === 'online').length;
  const avgUptime = mockRSUs.reduce((acc, rsu) => acc + rsu.uptime, 0) / mockRSUs.length;

  return (
    <div className="h-screen flex flex-col">
      <div className="h-16 border-b border-border bg-card/50 px-6 flex items-center">
        <Activity className="w-6 h-6 mr-3 text-primary" />
        <h1 className="text-2xl font-bold">System Health</h1>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-muted-foreground">Packet Delivery</div>
              <Network className="w-4 h-4 text-success" />
            </div>
            <div className="text-3xl font-bold font-mono-data">
              {metrics.packetDeliveryRatio.toFixed(1)}%
            </div>
            <div className="text-xs text-success mt-1">Excellent</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-muted-foreground">Avg Latency</div>
              <Zap className="w-4 h-4 text-warning" />
            </div>
            <div className="text-3xl font-bold font-mono-data">
              {metrics.averageLatency.toFixed(1)}ms
            </div>
            <div className="text-xs text-success mt-1">Normal</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-muted-foreground">Throughput</div>
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            <div className="text-3xl font-bold font-mono-data">
              {(metrics.throughput / 1000).toFixed(1)}Mbps
            </div>
            <div className="text-xs text-success mt-1">Optimal</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-muted-foreground">Active Connections</div>
              <Activity className="w-4 h-4 text-primary" />
            </div>
            <div className="text-3xl font-bold font-mono-data">
              {metrics.activeConnections}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Vehicles</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">Network Performance</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2 text-sm">
                  <span className="text-muted-foreground">Packet Delivery Ratio</span>
                  <span className="font-mono-data">{metrics.packetDeliveryRatio.toFixed(2)}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-success transition-all"
                    style={{ width: `${metrics.packetDeliveryRatio}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2 text-sm">
                  <span className="text-muted-foreground">Duplicate Packet Ratio</span>
                  <span className="font-mono-data">{metrics.duplicatePacketRatio.toFixed(2)}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-warning transition-all"
                    style={{ width: `${metrics.duplicatePacketRatio * 10}%` }}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-border grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground mb-1">Average Latency</div>
                  <div className="text-2xl font-bold font-mono-data">
                    {metrics.averageLatency.toFixed(1)}ms
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Throughput</div>
                  <div className="text-2xl font-bold font-mono-data">
                    {metrics.throughput.toFixed(0)}kbps
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">RSU Infrastructure</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-muted-foreground text-sm mb-1">Total RSUs</div>
                  <div className="text-3xl font-bold font-mono-data">{mockRSUs.length}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm mb-1">Online</div>
                  <div className="text-3xl font-bold font-mono-data text-success">{onlineRSUs}</div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2 text-sm">
                  <span className="text-muted-foreground">Average Uptime</span>
                  <span className="font-mono-data">{avgUptime.toFixed(1)}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-success transition-all"
                    style={{ width: `${avgUptime}%` }}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-border space-y-2">
                {mockRSUs.map((rsu) => (
                  <div key={rsu.id} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{rsu.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono-data">{rsu.uptime.toFixed(1)}%</span>
                      <div className={`w-2 h-2 rounded-full ${
                        rsu.status === 'online' ? 'bg-success' :
                        rsu.status === 'maintenance' ? 'bg-warning' : 'bg-destructive'
                      }`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">System Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-success/10 border border-success/20">
              <div className="text-sm text-muted-foreground mb-1">Network Status</div>
              <div className="text-lg font-bold text-success">Optimal</div>
            </div>
            <div className="p-4 rounded-lg bg-success/10 border border-success/20">
              <div className="text-sm text-muted-foreground mb-1">Database Status</div>
              <div className="text-lg font-bold text-success">Online</div>
            </div>
            <div className="p-4 rounded-lg bg-success/10 border border-success/20">
              <div className="text-sm text-muted-foreground mb-1">API Status</div>
              <div className="text-lg font-bold text-success">Operational</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SystemHealth;
