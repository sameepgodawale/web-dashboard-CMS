import { SystemHealth } from '@/types/emergency';
import { Badge } from '@/components/ui/badge';
import { Activity, Database, Radio, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface SystemHealthBarProps {
  health: SystemHealth;
}

export const SystemHealthBar = ({ health }: SystemHealthBarProps) => {
  const getStatusVariant = (status: SystemHealth['apiStatus']) => {
    switch (status) {
      case 'online':
        return 'success';
      case 'degraded':
        return 'warning';
      case 'offline':
        return 'critical';
    }
  };

  const getConnectivityColor = (percentage: number) => {
    if (percentage >= 95) return 'text-success';
    if (percentage >= 80) return 'text-warning';
    return 'text-critical';
  };

  return (
    <div className="bg-card border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-12">
          {/* Left section - System status */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">System Status</span>
              <Badge variant={getStatusVariant(health.apiStatus)}>
                {health.apiStatus}
              </Badge>
            </div>

            <div className="h-6 w-[1px] bg-border" />

            <div className="flex items-center gap-2">
              <Radio className={`w-4 h-4 ${getConnectivityColor(health.vanetConnectivity)}`} />
              <span className="text-sm">VANET</span>
              <span className={`text-sm font-mono-data font-bold ${getConnectivityColor(health.vanetConnectivity)}`}>
                {health.vanetConnectivity}%
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">DB Latency</span>
              <span className="text-sm font-mono-data font-bold">
                {health.databaseLatency}ms
              </span>
            </div>
          </div>

          {/* Right section - Last update */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>
              Updated {formatDistanceToNow(health.lastUpdate, { addSuffix: true })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
