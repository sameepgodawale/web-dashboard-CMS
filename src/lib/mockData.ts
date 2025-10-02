import { AccidentAlert, SystemHealth, SeverityLevel } from '@/types/emergency';

const severityColors: Record<SeverityLevel, number> = {
  critical: 9,
  warning: 6,
  moderate: 3,
};

// Generate unique accident ID using timestamp + random
let accidentCounter = 1000;

export const generateMockAccident = (id?: string): AccidentAlert => {
  const uniqueId = id || `ACC-${Date.now()}-${accidentCounter++}`;
  const severities: SeverityLevel[] = ['critical', 'warning', 'moderate'];
  const severity = severities[Math.floor(Math.random() * severities.length)];
  
  const addresses = [
    'Interstate 95, Mile Marker 127',
    'Main Street & 5th Avenue Intersection',
    'Highway 101 Northbound, Exit 42',
    'Oak Boulevard near Central Park',
    'Veterans Memorial Parkway',
  ];

  return {
    id: uniqueId,
    severity,
    status: 'new',
    location: {
      lat: 40.7128 + (Math.random() - 0.5) * 0.1,
      lng: -74.0060 + (Math.random() - 0.5) * 0.1,
    },
    address: addresses[Math.floor(Math.random() * addresses.length)],
    timestamp: new Date(),
    vehicle: {
      id: `VEH-${Math.floor(Math.random() * 10000)}`,
      type: ['Sedan', 'SUV', 'Truck', 'Motorcycle'][Math.floor(Math.random() * 4)],
      speed: Math.floor(Math.random() * 80) + 20,
      direction: Math.floor(Math.random() * 360),
    },
    dispatchETA: Math.floor(Math.random() * 300) + 120,
    description: severity === 'critical' 
      ? 'Multi-vehicle collision with potential injuries'
      : severity === 'warning'
      ? 'Single vehicle accident, possible property damage'
      : 'Minor vehicle incident',
    nodeId: `NODE-${Math.floor(Math.random() * 100)}`,
    impactForce: Math.floor(Math.random() * 100),
    injuryLikelihood: severity === 'critical' ? 'high' : severity === 'warning' ? 'medium' : 'low',
  };
};

export const mockSystemHealth: SystemHealth = {
  vanetConnectivity: 98,
  databaseLatency: 45,
  apiStatus: 'online',
  lastUpdate: new Date(),
};

export const initialMockAlerts: AccidentAlert[] = [
  {
    id: 'ACC-001',
    severity: 'critical',
    status: 'new',
    location: { lat: 40.7580, lng: -73.9855 },
    address: 'Times Square, Manhattan',
    timestamp: new Date(Date.now() - 30000),
    vehicle: {
      id: 'VEH-1234',
      type: 'Sedan',
      speed: 45,
      direction: 180,
    },
    dispatchETA: 180,
    description: 'Multi-vehicle collision with potential injuries',
    nodeId: 'NODE-42',
    impactForce: 85,
    injuryLikelihood: 'high',
  },
  {
    id: 'ACC-002',
    severity: 'warning',
    status: 'new',
    location: { lat: 40.7489, lng: -73.9680 },
    address: 'Queens Midtown Tunnel',
    timestamp: new Date(Date.now() - 120000),
    vehicle: {
      id: 'VEH-5678',
      type: 'SUV',
      speed: 30,
      direction: 90,
    },
    dispatchETA: 240,
    description: 'Single vehicle accident, possible property damage',
    nodeId: 'NODE-17',
    impactForce: 45,
    injuryLikelihood: 'medium',
  },
];
