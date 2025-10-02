import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Bell, Database } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Admin = () => {
  const handleSaveThresholds = () => {
    toast({
      title: 'Settings Saved',
      description: 'System thresholds have been updated successfully.',
    });
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="h-16 border-b border-border bg-card/50 px-6 flex items-center">
        <Shield className="w-6 h-6 mr-3 text-primary" />
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-bold">Alert Thresholds</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="highConfidence">High Confidence Threshold (%)</Label>
                <Input
                  id="highConfidence"
                  type="number"
                  defaultValue={90}
                  className="mt-2 font-mono-data"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Minimum confidence score to classify as high confidence alert
                </p>
              </div>

              <div>
                <Label htmlFor="criticalImpact">Critical Impact Force Threshold</Label>
                <Input
                  id="criticalImpact"
                  type="number"
                  defaultValue={75}
                  className="mt-2 font-mono-data"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Impact force value to trigger critical severity classification
                </p>
              </div>

              <div>
                <Label htmlFor="responseTarget">Target Response Time (seconds)</Label>
                <Input
                  id="responseTarget"
                  type="number"
                  defaultValue={60}
                  className="mt-2 font-mono-data"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Expected time to dispatch from alert received
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Database className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-bold">System Settings</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="dataRetention">Data Retention Period (days)</Label>
                <Input
                  id="dataRetention"
                  type="number"
                  defaultValue={90}
                  className="mt-2 font-mono-data"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  How long to keep incident logs before archiving
                </p>
              </div>

              <div>
                <Label htmlFor="mapRefresh">Map Refresh Interval (seconds)</Label>
                <Input
                  id="mapRefresh"
                  type="number"
                  defaultValue={5}
                  className="mt-2 font-mono-data"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  How often to update real-time map data
                </p>
              </div>
            </div>
          </Card>

          <div className="flex gap-3">
            <Button onClick={handleSaveThresholds} className="flex-1">
              Save All Settings
            </Button>
            <Button variant="outline">
              Reset to Defaults
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
