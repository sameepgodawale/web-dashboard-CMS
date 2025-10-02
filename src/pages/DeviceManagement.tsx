import { useState } from 'react';
import { mockRSUs, mockOBUs } from '@/lib/v2xMockData';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Radio, Wifi, MapPin, Activity, Power, Settings } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const DeviceManagement = () => {
  const [rsus] = useState(mockRSUs);
  const [obus] = useState(mockOBUs);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'online':
      case 'active':
        return 'success';
      case 'offline':
      case 'inactive':
        return 'destructive';
      case 'maintenance':
      case 'error':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="h-16 border-b border-border bg-card/50 px-6 flex items-center">
        <Radio className="w-6 h-6 mr-3 text-primary" />
        <h1 className="text-2xl font-bold">RSU/OBU Management</h1>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <Tabs defaultValue="rsu" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="rsu">RSU Devices ({rsus.length})</TabsTrigger>
            <TabsTrigger value="obu">OBU Devices ({obus.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="rsu" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {rsus.map((rsu) => (
                <Card key={rsu.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{rsu.name}</h3>
                      <p className="text-xs font-mono-data text-muted-foreground">
                        {rsu.id}
                      </p>
                    </div>
                    <Badge variant={getStatusVariant(rsu.status)}>
                      {rsu.status}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs">{rsu.address}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Uptime:</span>
                        <p className="font-bold font-mono-data">{rsu.uptime}%</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Coverage:</span>
                        <p className="font-bold font-mono-data">{rsu.coverageRadius}m</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Wifi className="w-4 h-4 text-success" />
                      <span className="font-mono-data">{rsu.connectedVehicles} vehicles</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                      <div>Sent: {rsu.packetsSent.toLocaleString()}</div>
                      <div>Received: {rsu.packetsReceived.toLocaleString()}</div>
                    </div>

                    <div className="pt-3 border-t border-border text-xs text-muted-foreground">
                      <div>Firmware: {rsu.firmware}</div>
                      <div>IP: {rsu.ipAddress}</div>
                      <div>Last: {formatDistanceToNow(rsu.lastHeartbeat, { addSuffix: true })}</div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Activity className="w-3 h-3 mr-1" />
                        Monitor
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Settings className="w-3 h-3 mr-1" />
                        Config
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="obu" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {obus.map((obu) => (
                <Card key={obu.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{obu.vehicleId}</h3>
                      <p className="text-xs font-mono-data text-muted-foreground">
                        {obu.id}
                      </p>
                    </div>
                    <Badge variant={getStatusVariant(obu.status)}>
                      {obu.status}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Type:</span>
                      <p className="font-medium">{obu.vehicleType}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Speed:</span>
                        <p className="font-bold font-mono-data">{obu.speed} km/h</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Direction:</span>
                        <p className="font-bold font-mono-data">{obu.direction}°</p>
                      </div>
                    </div>

                    <div className="text-sm">
                      <span className="text-muted-foreground">Connected RSU:</span>
                      <p className="font-mono-data">
                        {obu.connectedRSU || 'Not connected'}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Wifi className="w-4 h-4 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="text-xs text-muted-foreground mb-1">
                          Signal: {obu.signalStrength}%
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-success transition-all"
                            style={{ width: `${obu.signalStrength}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {obu.batteryLevel !== undefined && (
                      <div className="flex items-center gap-2">
                        <Power className="w-4 h-4 text-muted-foreground" />
                        <div className="flex-1">
                          <div className="text-xs text-muted-foreground mb-1">
                            Battery: {obu.batteryLevel}%
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all ${
                                obu.batteryLevel > 50 ? 'bg-success' : 
                                obu.batteryLevel > 20 ? 'bg-warning' : 'bg-destructive'
                              }`}
                              style={{ width: `${obu.batteryLevel}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="pt-3 border-t border-border text-xs text-muted-foreground">
                      <div>Firmware: {obu.firmware}</div>
                      <div>Last seen: {formatDistanceToNow(obu.lastSeen, { addSuffix: true })}</div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Activity className="w-3 h-3 mr-1" />
                        Track
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Settings className="w-3 h-3 mr-1" />
                        Config
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DeviceManagement;
