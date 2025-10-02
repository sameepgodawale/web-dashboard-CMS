export interface RSU {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  status: 'online' | 'offline' | 'maintenance';
  uptime: number; // percentage
  coverageRadius: number; // meters
  connectedVehicles: number;
  packetsSent: number;
  packetsReceived: number;
  lastHeartbeat: Date;
  firmware: string;
  ipAddress: string;
}

export interface OBU {
  id: string;
  vehicleId: string;
  vehicleType: string;
  status: 'active' | 'inactive' | 'error';
  location: {
    lat: number;
    lng: number;
  };
  speed: number;
  direction: number;
  connectedRSU: string | null;
  signalStrength: number; // percentage
  lastSeen: Date;
  firmware: string;
  batteryLevel?: number;
}

export interface NetworkMetrics {
  packetDeliveryRatio: number; // percentage
  averageLatency: number; // milliseconds
  duplicatePacketRatio: number; // percentage
  throughput: number; // kbps
  activeConnections: number;
  timestamp: Date;
}

export interface IncidentLog {
  id: string;
  accidentId: string;
  timestamp: Date;
  severity: 'critical' | 'warning' | 'moderate';
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  vehicleId: string;
  status: 'pending' | 'acknowledged' | 'verified' | 'resolved';
  responseTime?: number; // seconds
  dispatchedUnits: string[];
  notes: string;
  confidenceScore: number; // 0-100
}

export interface DeviceConfig {
  deviceId: string;
  deviceType: 'RSU' | 'OBU';
  retryInterval: number; // milliseconds
  ttl: number; // time to live in seconds
  broadcastRadius: number; // meters
  networkMode: 'LoRa' | 'DSRC' | 'C-V2X';
  updateInterval: number; // milliseconds
  enableLogging: boolean;
}
