import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Card, CardContent, Box, Divider, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import GroupsIcon from '@mui/icons-material/Groups';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import RadarIcon from '@mui/icons-material/Radar';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PeopleIcon from '@mui/icons-material/People';
import 'leaflet/dist/leaflet.css';

// Lazy load heavy components for better performance (LCP/FCP)
const BarChart = React.lazy(() => import('@mui/x-charts/BarChart').then(m => ({ default: m.BarChart })));
const PieChart = React.lazy(() => import('@mui/x-charts/PieChart').then(m => ({ default: m.PieChart })));
const Gauge = React.lazy(() => import('@mui/x-charts/Gauge').then(m => ({ default: m.Gauge })));

// Encapsulate the map component to avoid React Leaflet context errors during Suspense unmounts
const MapWidget = React.lazy(() => import('./MapWidget'));

// Fallback for Suspense
const LoadingFallback = ({ height = 200, message = "LOADING HUD..." }) => (
  <Box sx={{ height, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, animation: 'pulse 1.5s infinite' }}>
      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ff2a2a', boxShadow: '0 0 10px #ff2a2a' }} />
      <Typography sx={{ color: '#ff2a2a', fontWeight: 800, fontSize: '0.7rem', letterSpacing: '0.2em' }}>{message}</Typography>
    </Box>
  </Box>
);

// ── Premium Cinematic Design Tokens ──
const NEON_RED = '#ff2a2a';
const NEON_GOLD = '#ffc107';
const NEON_BLUE = '#3b82f6';
const NEON_GREEN = '#22c55e';
const DARK_BG = '#050505';
const GLASS_BG = 'rgba(15, 15, 20, 0.6)';
const GLASS_BORDER = 'rgba(255, 255, 255, 0.08)';
const MUTED = '#94a3b8';

const glassCardSx = {
  bgcolor: GLASS_BG,
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: `1px solid ${GLASS_BORDER}`,
  borderRadius: 3,
  color: '#fff',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&::before': {
    content: '""', position: 'absolute', top: 0, left: '10%', width: '80%', height: '1px',
    background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)`,
    transition: 'all 0.3s ease',
  },
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 12px 40px rgba(0,0,0,0.5), 0 0 20px rgba(255, 42, 42, 0.15)`,
    borderColor: 'rgba(255, 42, 42, 0.3)',
    '&::before': { background: `linear-gradient(90deg, transparent, ${NEON_RED}, transparent)` }
  },
};

const pageBgSx = {
  bgcolor: DARK_BG, minHeight: '100vh', pb: 6, position: 'relative', zIndex: 0,
  '&::before': {
    content: '""', position: 'absolute', inset: 0, zIndex: -1,
    background: `radial-gradient(circle at 50% 0%, rgba(255,42,42,0.12) 0%, rgba(0,0,0,0) 60%)`,
  },
  '&::after': {
    content: '""', position: 'fixed', inset: 0, zIndex: -2,
    backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
    backgroundSize: '40px 40px', pointerEvents: 'none',
  }
};

const labelSx = { fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: NEON_RED, mb: 0.5 };
const titleSx = { fontWeight: 800, color: '#fff', mb: 3, textTransform: 'uppercase', letterSpacing: '0.05em' };

const stats = [
  { label: 'Active Heroes', value: '12', sub: '+2 this month', icon: <GroupsIcon sx={{ fontSize: 32, color: NEON_RED, filter: `drop-shadow(0 0 8px ${NEON_RED})` }} /> },
  { label: 'Threat Level', value: 'GAMMA', sub: 'Elevated', icon: <WarningAmberIcon sx={{ fontSize: 32, color: NEON_GOLD, filter: `drop-shadow(0 0 8px ${NEON_GOLD})` }} /> },
  { label: 'Missions Completed', value: '347', sub: '+18 this week', icon: <TaskAltIcon sx={{ fontSize: 32, color: NEON_GREEN, filter: `drop-shadow(0 0 8px ${NEON_GREEN})` }} /> },
  { label: 'Active Operations', value: '5', sub: '3 covert', icon: <RadarIcon sx={{ fontSize: 32, color: NEON_BLUE, filter: `drop-shadow(0 0 8px ${NEON_BLUE})` }} /> },
];

const gauges = [
  { label: 'System Integrity', value: 98, color: NEON_GREEN },
  { label: 'Power Core', value: 85, color: NEON_GOLD },
  { label: 'Network', value: 92, color: NEON_BLUE },
];

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={pageBgSx}>
      {/* ── Holographic Enhancement Label ── 
          Enhancement 1: Overview / Summary 
      */}

      <Box sx={{ mb: 5 }}>
        <Typography sx={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.3em', color: NEON_RED, mb: 0.5 }}>S.H.I.E.L.D. Command</Typography>
        <Typography variant="h3" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.02em', background: 'linear-gradient(to right, #fff, #a1a1aa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
          Operations Center
        </Typography>
        <Divider sx={{ borderColor: 'rgba(255,42,42,0.3)', borderWidth: 1, mt: 2, width: 120, boxShadow: `0 2px 10px ${NEON_RED}` }} />
      </Box>

    {/* Summary Cards */ }
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mb: 5, flexWrap: 'wrap' }} useFlexGap>
      {stats.map((s) => (
        <Card key={s.label} sx={{ ...glassCardSx, flex: '1 1 220px' }}>
          <CardContent sx={{ p: 3 }}>
            <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: MUTED, mb: 1 }}>{s.label}</Typography>
                <Typography variant="h3" sx={{ fontWeight: 900, color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{s.value}</Typography>
                <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', mt: 1 }}>{s.sub}</Typography>
              </Box>
              <Box sx={{ p: 1, borderRadius: 2, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                {s.icon}
              </Box>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>

    <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3} sx={{ mb: 5 }}>
      {/* Bar Chart */}
      <Card sx={{ ...glassCardSx, flex: 2 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography sx={labelSx}>Field Operations</Typography>
          <Typography variant="h6" sx={titleSx}>Quarterly Mission Stats</Typography>
          <Suspense fallback={<LoadingFallback height={300} message="LOADING CHART DATA..." />}>
            <BarChart
              series={[
                { data: [42, 58, 36, 51], label: 'Completed', color: NEON_RED },
                { data: [12, 8, 15, 9], label: 'Ongoing', color: NEON_GOLD },
              ]}
              height={300}
              xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band', label: 'Quarter' }]}
              sx={{
                '& .MuiChartsAxis-tickLabel': { fill: MUTED, fontFamily: 'inherit' },
                '& .MuiChartsAxis-label': { fill: MUTED, fontFamily: 'inherit' },
                '& .MuiChartsLegend-label': { fill: '#fff !important', fontFamily: 'inherit' },
                '& .MuiChartsAxis-line': { stroke: GLASS_BORDER },
                '& .MuiChartsAxis-tick': { stroke: GLASS_BORDER },
              }}
            />
          </Suspense>
        </CardContent>
      </Card>

      {/* Pie Chart */}
      <Card sx={{ ...glassCardSx, flex: 1 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography sx={labelSx}>Resource Allocation</Typography>
          <Typography variant="h6" sx={titleSx}>Division Allocation</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Suspense fallback={<LoadingFallback height={260} message="LOADING DIVISION DATA..." />}>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 35, label: 'Avengers', color: NEON_RED },
                      { id: 1, value: 25, label: 'S.W.O.R.D.', color: NEON_GOLD },
                      { id: 2, value: 20, label: 'X-Force', color: NEON_BLUE },
                      { id: 3, value: 15, label: 'Guardians', color: '#8b5cf6' },
                      { id: 4, value: 5, label: 'Reserves', color: '#64748b' },
                    ],
                    innerRadius: 30,
                    paddingAngle: 2,
                    cornerRadius: 4,
                  },
                ]}
                width={350}
                height={260}
                sx={{
                  '& .MuiChartsLegend-label': { fill: '#fff !important', fontFamily: 'inherit' },
                }}
              />
            </Suspense>
          </Box>
        </CardContent>
      </Card>
    </Stack>

  {/* Gauges */ }
  <Card sx={{ ...glassCardSx, mb: 5 }}>
    <CardContent sx={{ p: 3 }}>
      <Typography sx={labelSx}>Diagnostics</Typography>
      <Typography variant="h6" sx={titleSx}>System Status</Typography>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ justifyContent: 'space-around' }}>
        {gauges.map((gauge) => (
          <Box key={gauge.label} sx={{ textAlign: 'center' }}>
            <Suspense fallback={<LoadingFallback height={200} message="ANALYZING..." />}>
              <Gauge
                width={200}
                height={200}
                value={gauge.value}
                valueMin={0}
                valueMax={100}
                sx={{
                  '& .MuiGauge-valueText': { fontSize: 36, fontWeight: 900, fill: '#fff', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' },
                  '& .MuiGauge-valueArc': { fill: gauge.color, filter: `drop-shadow(0 0 4px ${gauge.color})` },
                  '& .MuiGauge-referenceArc': { fill: 'rgba(255,255,255,0.05)' },
                }}
              />
            </Suspense>
            <Typography sx={{ mt: 1, fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: MUTED }}>
              {gauge.label}
            </Typography>
          </Box>
        ))}
      </Stack>
    </CardContent>
  </Card>

  {/* Map */ }
    <Card sx={glassCardSx}>
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ p: 3, borderBottom: `1px solid ${GLASS_BORDER}`, background: 'rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography sx={labelSx}>Global Surveillance</Typography>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Threat Monitoring</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 0.5, bgcolor: 'rgba(255,42,42,0.1)', borderRadius: 1, border: `1px solid rgba(255,42,42,0.3)` }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: NEON_RED, boxShadow: `0 0 8px ${NEON_RED}`, animation: 'pulse 1.5s infinite' }} />
            <Typography sx={{ color: NEON_RED, fontWeight: 800, fontSize: '0.65rem', letterSpacing: '0.15em' }}>LIVE</Typography>
          </Box>
        </Box>
        <Box sx={{ height: 500, width: '100%', position: 'relative' }}>
          <Suspense fallback={<LoadingFallback height={500} message="CONNECTING TO SATELLITE..." />}>
            <MapWidget />
          </Suspense>
          {/* Inner glass shadow to embed the map */}
          <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)', zIndex: 1000 }} />
        </Box>
      </CardContent>
    </Card>

    <style>
      {`
        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}
    </style>
  </Box>
  );
};

export default DashboardPage;