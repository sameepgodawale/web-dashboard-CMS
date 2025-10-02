import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface ResponseTimerProps {
  timestamp: Date;
}

export const ResponseTimer = ({ timestamp }: ResponseTimerProps) => {
  const startTime = timestamp;
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const start = new Date(startTime).getTime();
      setElapsed(Math.floor((now - start) / 1000));
    }, 100);

    return () => clearInterval(interval);
  }, [startTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getColorClass = () => {
    if (elapsed < 30) return 'text-success';
    if (elapsed < 45) return 'text-warning';
    return 'text-critical';
  };

  return (
    <div className="flex items-center gap-2">
      <Clock className={`w-5 h-5 ${getColorClass()}`} />
      <span className={`text-2xl font-mono-data font-bold ${getColorClass()}`}>
        {formatTime(elapsed)}
      </span>
      <span className="text-sm text-muted-foreground">
        / 1:00 target
      </span>
    </div>
  );
};
