import { useState } from 'react';
import { mockDeviceConfigs } from '@/lib/v2xMockData';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Settings, Save } from 'lucide-react';
import { DeviceConfig } from '@/types/v2x';
import { toast } from '@/hooks/use-toast';

const DeviceConfigPage = () => {
  const [configs] = useState<DeviceConfig[]>(mockDeviceConfigs);
  const [selectedConfig, setSelectedConfig] = useState<DeviceConfig>(configs[0]);

  const handleSave = () => {
    toast({
      title: 'Configuration Saved',
      description: `Settings for ${selectedConfig.deviceId} have been updated.`,
    });
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="h-16 border-b border-border bg-card/50 px-6 flex items-center">
        <Settings className="w-6 h-6 mr-3 text-primary" />
        <h1 className="text-2xl font-bold">Device Configurations</h1>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="p-6 mb-6">
            <Label className="text-sm text-muted-foreground mb-2 block">
              Select Device
            </Label>
            <Select 
              value={selectedConfig.deviceId} 
              onValueChange={(value) => {
                const config = configs.find(c => c.deviceId === value);
                if (config) setSelectedConfig(config);
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {configs.map((config) => (
                  <SelectItem key={config.deviceId} value={config.deviceId}>
                    {config.deviceId} ({config.deviceType})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold mb-6">Device Settings</h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="deviceType">Device Type</Label>
                  <Input
                    id="deviceType"
                    value={selectedConfig.deviceType}
                    disabled
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="networkMode">Network Mode</Label>
                  <Select value={selectedConfig.networkMode}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LoRa">LoRa</SelectItem>
                      <SelectItem value="DSRC">DSRC</SelectItem>
                      <SelectItem value="C-V2X">C-V2X</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="retryInterval">Retry Interval (ms)</Label>
                  <Input
                    id="retryInterval"
                    type="number"
                    value={selectedConfig.retryInterval}
                    className="mt-2 font-mono-data"
                  />
                </div>

                <div>
                  <Label htmlFor="ttl">Time to Live (seconds)</Label>
                  <Input
                    id="ttl"
                    type="number"
                    value={selectedConfig.ttl}
                    className="mt-2 font-mono-data"
                  />
                </div>

                <div>
                  <Label htmlFor="broadcastRadius">Broadcast Radius (meters)</Label>
                  <Input
                    id="broadcastRadius"
                    type="number"
                    value={selectedConfig.broadcastRadius}
                    className="mt-2 font-mono-data"
                  />
                </div>

                <div>
                  <Label htmlFor="updateInterval">Update Interval (ms)</Label>
                  <Input
                    id="updateInterval"
                    type="number"
                    value={selectedConfig.updateInterval}
                    className="mt-2 font-mono-data"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <Label htmlFor="enableLogging" className="cursor-pointer">
                    Enable Logging
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Store device activity logs for debugging and analysis
                  </p>
                </div>
                <Switch
                  id="enableLogging"
                  checked={selectedConfig.enableLogging}
                />
              </div>

              <div className="pt-6 border-t border-border flex gap-3">
                <Button onClick={handleSave} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  Save Configuration
                </Button>
                <Button variant="outline">
                  Reset to Defaults
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DeviceConfigPage;
