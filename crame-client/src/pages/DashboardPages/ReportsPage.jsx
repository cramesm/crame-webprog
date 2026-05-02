import React, { Suspense } from 'react';
import { Typography, Card, CardContent, Box, Divider } from '@mui/material';
import Stack from '@mui/material/Stack';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SecurityIcon from '@mui/icons-material/Security';
import PublicIcon from '@mui/icons-material/Public';
import BoltIcon from '@mui/icons-material/Bolt';

// Lazy load heavy chart components for chunk splitting
const BarChart = React.lazy(() => import('@mui/x-charts/BarChart').then(m => ({ default: m.BarChart })));
const PieChart = React.lazy(() => import('@mui/x-charts/PieChart').then(m => ({ default: m.PieChart })));
const LineChart = React.lazy(() => import('@mui/x-charts/LineChart').then(m => ({ default: m.LineChart })));
const ScatterChart = React.lazy(() => import('@mui/x-charts/ScatterChart').then(m => ({ default: m.ScatterChart })));

// Fallback for Suspense
const LoadingFallback = ({ height = 300, message = "LOADING DATA..." }) => (
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
const NEON_PURPLE = '#a855f7';
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

const axisSx = {
  '& .MuiChartsAxis-tickLabel': { fill: MUTED, fontFamily: 'inherit' },
  '& .MuiChartsAxis-label': { fill: MUTED, fontFamily: 'inherit' },
  '& .MuiChartsLegend-label': { fill: '#fff !important', fontFamily: 'inherit' },
  '& .MuiChartsAxis-line': { stroke: GLASS_BORDER },
  '& .MuiChartsAxis-tick': { stroke: GLASS_BORDER },
};

const labelSx = { fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: NEON_RED, mb: 0.5 };
const titleSx = { fontWeight: 800, color: '#fff', mb: 3, textTransform: 'uppercase', letterSpacing: '0.05em' };

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const stats = [
  { label: 'Total Incidents (YTD)', value: '1,247', icon: <SecurityIcon sx={{ fontSize: 32, color: NEON_RED, filter: `drop-shadow(0 0 8px ${NEON_RED})` }} />, sub: '+12% vs last year' },
  { label: 'Neutralized Threats', value: '1,089', icon: <TrendingUpIcon sx={{ fontSize: 32, color: NEON_GREEN, filter: `drop-shadow(0 0 8px ${NEON_GREEN})` }} />, sub: '87.3% success' },
  { label: 'Active Threat Vectors', value: '158', icon: <BoltIcon sx={{ fontSize: 32, color: NEON_GOLD, filter: `drop-shadow(0 0 8px ${NEON_GOLD})` }} />, sub: '-8 from last month' },
  { label: 'Global Coverage', value: '94%', icon: <PublicIcon sx={{ fontSize: 32, color: NEON_BLUE, filter: `drop-shadow(0 0 8px ${NEON_BLUE})` }} />, sub: '194 countries' },
];
const scatter = [
  { id: 's1', x: 1, y: 78 }, { id: 's2', x: 1, y: 85 }, { id: 's3', x: 2, y: 82 },
  { id: 's4', x: 2, y: 90 }, { id: 's5', x: 3, y: 88 }, { id: 's6', x: 3, y: 91 },
  { id: 's7', x: 4, y: 93 }, { id: 's8', x: 5, y: 95 }, { id: 's9', x: 5, y: 91 },
  { id: 's10', x: 6, y: 97 }, { id: 's11', x: 6, y: 94 }, { id: 's12', x: 8, y: 98 },
  { id: 's13', x: 10, y: 96 }, { id: 's14', x: 12, y: 99 },
];

const ReportsPage = () => (
  <Box sx={pageBgSx}>
    {/* ── Holographic Enhancement Label ── 
        Enhancement 2: Charts / Data Visualization 
    */}

    <Box sx={{ mb: 5 }}>
      <Typography sx={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.3em', color: NEON_RED, mb: 0.5 }}>Data Analytics Division</Typography>
      <Typography variant="h3" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.02em', background: 'linear-gradient(to right, #fff, #a1a1aa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
        Intelligence Reports
      </Typography>
      <Divider sx={{ borderColor: 'rgba(255,42,42,0.3)', borderWidth: 1, mt: 2, width: 120, boxShadow: `0 2px 10px ${NEON_RED}` }} />
    </Box>

    {/* Stats */}
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mb: 5, flexWrap: 'wrap' }} useFlexGap>
      {stats.map((s) => (
        <Card key={s.label} sx={{ ...glassCardSx, flex: '1 1 220px' }}>
          <CardContent sx={{ p: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
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

    {/* Line Chart */}
    <Card sx={{ ...glassCardSx, mb: 5 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography sx={labelSx}>Trend Analysis</Typography>
        <Typography variant="h6" sx={titleSx}>Monthly Threat Incidents</Typography>
        <Suspense fallback={<LoadingFallback height={320} message="LOADING TRENDS..." />}>
          <LineChart xAxis={[{ data: months, scaleType: 'point', label: 'Month' }]}
            series={[
              { data: [65, 72, 58, 89, 95, 110, 130, 118, 98, 85, 72, 60], label: 'Cosmic', color: NEON_PURPLE },
              { data: [45, 38, 52, 61, 55, 48, 42, 50, 63, 71, 68, 55], label: 'Terrestrial', color: NEON_RED },
              { data: [20, 25, 18, 30, 22, 35, 28, 32, 25, 19, 24, 30], label: 'Mystical', color: NEON_GOLD },
            ]}
            height={320} sx={axisSx} />
        </Suspense>
      </CardContent>
    </Card>

    {/* Bar + Pie */}
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 5 }}>
      <Card sx={{ ...glassCardSx, flex: 1.2 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography sx={labelSx}>Personnel Evaluation</Typography>
          <Typography variant="h6" sx={titleSx}>Hero Performance Ratings</Typography>
          <Suspense fallback={<LoadingFallback height={300} message="LOADING RATINGS..." />}>
            <BarChart
              xAxis={[{ data: ['Iron Man', 'Cap. America', 'Thor', 'Black Widow', 'Hulk', 'Hawkeye'], scaleType: 'band' }]}
              series={[
                { data: [95, 92, 98, 88, 85, 82], label: 'Combat', color: NEON_RED },
                { data: [99, 78, 70, 90, 60, 75], label: 'Intel', color: NEON_BLUE },
                { data: [88, 96, 80, 94, 65, 90], label: 'Leadership', color: NEON_GOLD },
              ]}
              height={300} sx={axisSx} />
          </Suspense>
        </CardContent>
      </Card>
      <Card sx={{ ...glassCardSx, flex: 0.8 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography sx={labelSx}>Classification Matrix</Typography>
          <Typography variant="h6" sx={titleSx}>Threat Categories</Typography>
          <Suspense fallback={<LoadingFallback height={260} message="LOADING CLASSIFICATIONS..." />}>
            <PieChart
              series={[{
                data: [
                  { id: 0, value: 28, label: 'Cosmic', color: NEON_PURPLE },
                  { id: 1, value: 25, label: 'Terrestrial', color: NEON_RED },
                  { id: 2, value: 18, label: 'Mystical', color: NEON_GOLD },
                  { id: 3, value: 17, label: 'Technological', color: NEON_BLUE },
                  { id: 4, value: 12, label: 'Mutant', color: NEON_GREEN },
                ], innerRadius: 50, paddingAngle: 3, cornerRadius: 5
              }]}
              width={380} height={260}
              sx={{ '& .MuiChartsLegend-label': { fill: '#fff !important', fontFamily: 'inherit' } }} />
          </Suspense>
        </CardContent>
      </Card>
    </Stack>

    {/* Scatter */}
    <Card sx={glassCardSx}>
      <CardContent sx={{ p: 3 }}>
        <Typography sx={labelSx}>Correlation Analysis</Typography>
        <Typography variant="h6" sx={titleSx}>Mission Success Rate vs. Team Size</Typography>
        <Suspense fallback={<LoadingFallback height={350} message="LOADING CORRELATIONS..." />}>
          <ScatterChart height={350}
            series={[{ data: scatter, label: 'Missions', color: NEON_RED }]}
            xAxis={[{ label: 'Team Size (Members)', min: 0, max: 14 }]}
            yAxis={[{ label: 'Success Rate (%)', min: 70, max: 100 }]}
            sx={{
              ...axisSx,
              '& .MuiScatterChart-mark': {
                filter: `drop-shadow(0 0 6px ${NEON_RED})`,
              }
            }} />
        </Suspense>
      </CardContent>
    </Card>
  </Box>
);

export default ReportsPage;