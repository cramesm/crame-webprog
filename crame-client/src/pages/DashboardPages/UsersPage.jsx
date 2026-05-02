import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Card, CardContent, Box, Divider, Avatar } from '@mui/material';
import Stack from '@mui/material/Stack';
import GroupsIcon from '@mui/icons-material/Groups';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import SpeedIcon from '@mui/icons-material/Speed';

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

const statusColors = {
  Active: { bg: 'rgba(34, 197, 94, 0.15)', color: NEON_GREEN, border: 'rgba(34, 197, 94, 0.4)' },
  Deployed: { bg: 'rgba(59, 130, 246, 0.15)', color: NEON_BLUE, border: 'rgba(59, 130, 246, 0.4)' },
  Inactive: { bg: 'rgba(148, 163, 184, 0.1)', color: MUTED, border: 'rgba(148, 163, 184, 0.3)' },
  MIA: { bg: 'rgba(255, 42, 42, 0.15)', color: NEON_RED, border: 'rgba(255, 42, 42, 0.4)' },
};

const rows = [
  { id: 1, codename: 'Iron Man', realName: 'Tony Stark', team: 'Avengers', status: 'Active', clearance: 10, missions: 72, avatar: '🦾' },
  { id: 2, codename: 'Captain America', realName: 'Steve Rogers', team: 'Avengers', status: 'Active', clearance: 10, missions: 85, avatar: '🛡️' },
  { id: 3, codename: 'Thor', realName: 'Thor Odinson', team: 'Avengers', status: 'Deployed', clearance: 10, missions: 64, avatar: '⚡' },
  { id: 4, codename: 'Black Widow', realName: 'Natasha Romanoff', team: 'Avengers', status: 'MIA', clearance: 10, missions: 93, avatar: '🕷️' },
  { id: 5, codename: 'Hulk', realName: 'Bruce Banner', team: 'Avengers', status: 'Active', clearance: 9, missions: 55, avatar: '💪' },
  { id: 6, codename: 'Hawkeye', realName: 'Clint Barton', team: 'Avengers', status: 'Inactive', clearance: 8, missions: 68, avatar: '🏹' },
  { id: 7, codename: 'Spider-Man', realName: 'Peter Parker', team: 'New Avengers', status: 'Active', clearance: 7, missions: 42, avatar: '🕸️' },
  { id: 8, codename: 'Scarlet Witch', realName: 'Wanda Maximoff', team: 'Avengers', status: 'MIA', clearance: 9, missions: 38, avatar: '🔮' },
  { id: 9, codename: 'Doctor Strange', realName: 'Stephen Strange', team: 'Illuminati', status: 'Active', clearance: 10, missions: 31, avatar: '✨' },
  { id: 10, codename: 'Black Panther', realName: "T'Challa", team: 'Avengers', status: 'Active', clearance: 10, missions: 47, avatar: '🐆' },
  { id: 11, codename: 'War Machine', realName: 'James Rhodes', team: 'Avengers', status: 'Deployed', clearance: 9, missions: 52, avatar: '🤖' },
  { id: 12, codename: 'Falcon', realName: 'Sam Wilson', team: 'New Avengers', status: 'Active', clearance: 8, missions: 45, avatar: '🦅' },
  { id: 13, codename: 'Ant-Man', realName: 'Scott Lang', team: 'Avengers', status: 'Active', clearance: 7, missions: 22, avatar: '🐜' },
  { id: 14, codename: 'Star-Lord', realName: 'Peter Quill', team: 'Guardians', status: 'Deployed', clearance: 6, missions: 35, avatar: '🚀' },
  { id: 15, codename: 'Gamora', realName: 'Gamora Zen-Whoberi', team: 'Guardians', status: 'Active', clearance: 7, missions: 40, avatar: '⚔️' },
];

const columns = [
  {
    field: 'avatar', headerName: '', width: 70, sortable: false, filterable: false,
    renderCell: (params) => (
      <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.05)', border: `1px solid ${GLASS_BORDER}`, fontSize: '1.2rem', width: 40, height: 40 }}>{params.value}</Avatar>
    ),
  },
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'codename', headerName: 'Codename', width: 180, cellClassName: 'codename-cell' },
  { field: 'realName', headerName: 'Real Name', width: 180 },
  { field: 'team', headerName: 'Team', width: 140 },
  {
    field: 'status', headerName: 'Status', width: 140,
    renderCell: (params) => {
      const s = statusColors[params.value] || statusColors.Inactive;
      return (
        <Box sx={{
          display: 'inline-flex', alignItems: 'center', gap: 1, px: 1.5, py: 0.5,
          bgcolor: s.bg, border: `1px solid ${s.border}`, borderRadius: '100px',
        }}>
          {params.value === 'Active' && <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: s.color, boxShadow: `0 0 8px ${s.color}`, animation: 'pulse 2s infinite' }} />}
          <Typography sx={{ color: s.color, fontWeight: 700, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{params.value}</Typography>
        </Box>
      );
    },
  },
  { field: 'clearance', headerName: 'Clearance', width: 110, type: 'number' },
  { field: 'missions', headerName: 'Missions', width: 110, type: 'number' },
];

const activeCount = rows.filter((r) => r.status === 'Active').length;
const highClearance = rows.filter((r) => r.clearance >= 7).length;
const totalMissions = rows.reduce((sum, r) => sum + r.missions, 0);

const summaryCards = [
  { label: 'Total Agents', value: rows.length, icon: <GroupsIcon sx={{ fontSize: 32, color: NEON_RED, filter: `drop-shadow(0 0 8px ${NEON_RED})` }} />, sub: `${activeCount} currently active` },
  { label: 'Active Status', value: activeCount, icon: <VerifiedUserIcon sx={{ fontSize: 32, color: NEON_GREEN, filter: `drop-shadow(0 0 8px ${NEON_GREEN})` }} />, sub: 'Ready for deployment' },
  { label: 'Clearance Lvl 7+', value: highClearance, icon: <MilitaryTechIcon sx={{ fontSize: 32, color: NEON_GOLD, filter: `drop-shadow(0 0 8px ${NEON_GOLD})` }} />, sub: 'Top-level clearance' },
  { label: 'Total Missions', value: totalMissions, icon: <SpeedIcon sx={{ fontSize: 32, color: NEON_BLUE, filter: `drop-shadow(0 0 8px ${NEON_BLUE})` }} />, sub: 'Combined field ops' },
];

const UsersPage = () => (
  <Box sx={pageBgSx}>
    {/* ── Holographic Enhancement Label ── 
        Enhancement 3: User List / Table 
    */}

    <Box sx={{ mb: 5 }}>
      <Typography sx={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.3em', color: NEON_RED, mb: 0.5 }}>Classified Roster</Typography>
      <Typography variant="h3" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.02em', background: 'linear-gradient(to right, #fff, #a1a1aa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
        S.H.I.E.L.D. Personnel Database
      </Typography>
      <Divider sx={{ borderColor: 'rgba(255,42,42,0.3)', borderWidth: 1, mt: 2, width: 120, boxShadow: `0 2px 10px ${NEON_RED}` }} />
    </Box>

    {/* Summary */}
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mb: 5, flexWrap: 'wrap' }} useFlexGap>
      {summaryCards.map((c) => (
        <Card key={c.label} sx={{ ...glassCardSx, flex: '1 1 220px' }}>
          <CardContent sx={{ p: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: MUTED, mb: 1 }}>{c.label}</Typography>
                <Typography variant="h3" sx={{ fontWeight: 900, color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{c.value}</Typography>
                <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', mt: 1 }}>{c.sub}</Typography>
              </Box>
              <Box sx={{ p: 1, borderRadius: 2, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                {c.icon}
              </Box>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>

    {/* DataGrid */}
    <Card sx={glassCardSx}>
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ p: 3, borderBottom: `1px solid ${GLASS_BORDER}`, background: 'rgba(255,255,255,0.02)' }}>
          <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: NEON_RED, mb: 0.5 }}>Personnel Records</Typography>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Hero Roster — Active Registry</Typography>
        </Box>
        <Box sx={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            pageSizeOptions={[5, 10, 15]}
            checkboxSelection
            disableRowSelectionOnClick
            rowHeight={60}
            sx={{
              border: 'none',
              borderRadius: 0,
              color: '#fff',
              '--DataGrid-rowBorderColor': GLASS_BORDER,
              '& .MuiDataGrid-columnHeaders': {
                bgcolor: 'transparent',
                color: MUTED,
                textTransform: 'uppercase',
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                fontWeight: 800,
                borderBottom: `2px solid rgba(255,42,42,0.3)`
              },
              '& .MuiDataGrid-cell': { display: 'flex', alignItems: 'center' },
              '& .codename-cell': { fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em', textShadow: '0 0 10px rgba(255,255,255,0.3)' },
              '& .MuiDataGrid-row:hover': {
                bgcolor: 'rgba(255, 42, 42, 0.05)',
                boxShadow: `inset 0 0 20px rgba(255, 42, 42, 0.1)`,
              },
              '& .MuiDataGrid-footerContainer': { borderTop: `1px solid ${GLASS_BORDER}`, bgcolor: 'transparent', color: MUTED },
              '& .MuiTablePagination-root': { color: MUTED },
              '& .MuiCheckbox-root': { color: MUTED },
              '& .MuiCheckbox-root.Mui-checked': { color: NEON_RED },
              '& .MuiDataGrid-columnSeparator': { display: 'none' },
            }}
          />
        </Box>
      </CardContent>
    </Card>
    <style>
      {`
        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
          50% { opacity: 0.5; transform: scale(0.95); box-shadow: 0 0 0 4px rgba(34, 197, 94, 0); }
          100% { opacity: 1; transform: scale(1); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
        }
      `}
    </style>
  </Box>
);

export default UsersPage;