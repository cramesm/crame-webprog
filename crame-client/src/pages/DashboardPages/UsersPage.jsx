import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { DataGrid } from '@mui/x-data-grid';
import usersSeed from '../../data/users.json?raw';

import GroupsIcon from '@mui/icons-material/Groups';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SecurityIcon from '@mui/icons-material/Security';
import SearchIcon from '@mui/icons-material/Search';

// ── Theme Constants ──
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
  Inactive: { bg: 'rgba(148, 163, 184, 0.1)', color: MUTED, border: 'rgba(148, 163, 184, 0.3)' },
};

// ── Form Constants & Utils ──
const roles = ['admin', 'editor', 'viewer'];
const genders = ['male', 'female', 'other'];

const blankForm = {
  firstName: '', lastName: '', age: '', gender: '', contactNumber: '',
  email: '', role: 'editor', username: '', password: '', address: '', isActive: true,
};

const labelize = (value) => value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

const loadUsers = () => {
  try {
    return {
      users: JSON.parse(usersSeed).map((user, index) => ({
        id: Number(user.id) || index + 1,
        firstName: String(user.firstName ?? '').trim(),
        lastName: String(user.lastName ?? '').trim(),
        age: String(user.age ?? '').trim(),
        gender: genders.includes(String(user.gender ?? '').trim().toLowerCase()) ? String(user.gender ?? '').trim().toLowerCase() : '',
        contactNumber: String(user.contactNumber ?? '').trim(),
        email: String(user.email ?? '').trim().toLowerCase(),
        role: roles.includes(String(user.role ?? '').trim().toLowerCase()) ? String(user.role ?? '').trim().toLowerCase() : 'editor',
        username: String(user.username ?? '').trim().toLowerCase(),
        password: String(user.password ?? ''),
        address: String(user.address ?? '').trim(),
        isActive: typeof user.isActive === 'boolean' ? user.isActive : true,
      })),
      error: '',
    };
  } catch {
    return { users: [], error: 'Unable to read users from src/assets/users.json.' };
  }
};

const seed = loadUsers();

// ── Main Component ──
const UsersPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [users, setUsers] = useState(seed.users);
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  
  // Enhancement 2: Users Page Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ role: 'all', gender: 'all', status: 'all' });

  const filteredUsers = users.filter((user) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      String(user.firstName).toLowerCase().includes(searchLower) ||
      String(user.lastName).toLowerCase().includes(searchLower) ||
      String(user.email).toLowerCase().includes(searchLower) ||
      String(user.username).toLowerCase().includes(searchLower);
      
    const matchesRole = filters.role === 'all' || user.role === filters.role;
    const matchesGender = filters.gender === 'all' || user.gender === filters.gender;
    const matchesStatus = filters.status === 'all' || 
      (filters.status === 'active' ? user.isActive : !user.isActive);

    return matchesSearch && matchesRole && matchesGender && matchesStatus;
  });

  const resetForm = () => { setForm({ ...blankForm }); setErrors({}); };

  const openModal = (user) => {
    setModal({ open: true, id: user?.id ?? null });
    setForm(user ? { ...blankForm, ...user } : { ...blankForm });
    setErrors({});
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setShowPassword(false);
    resetForm();
  };

  const handleChange = ({ target: { name, value, checked, type } }) => {
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const nextErrors = {};
    const email = form.email.trim().toLowerCase();
    const username = form.username.trim().toLowerCase();

    [
      ['firstName', 'First name'], ['lastName', 'Last name'], ['age', 'Age'],
      ['gender', 'Gender'], ['contactNumber', 'Contact number'], ['email', 'Email'],
      ['role', 'Role'], ['username', 'Username'], ['password', 'Password'], ['address', 'Address'],
    ].forEach(([key, label]) => {
      if (!String(form[key]).trim()) nextErrors[key] = `${label} is required.`;
    });

    if (!nextErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Enter a valid email address.';
    if (!nextErrors.email && users.some((user) => user.id !== modal.id && user.email === email)) nextErrors.email = 'Email address already exists.';
    if (!nextErrors.username && users.some((user) => user.id !== modal.id && user.username === username)) nextErrors.username = 'Username already exists.';
    
    // Enhancement 3: Form Validations
    if (!nextErrors.password && form.password.length < 8) nextErrors.password = 'Password must be at least 8 characters.';
    if (!nextErrors.contactNumber && !/^\d{11}$/.test(form.contactNumber)) nextErrors.contactNumber = 'Contact number must be exactly 11 digits.';
    if (!nextErrors.age && !/^\d+$/.test(form.age)) nextErrors.age = 'Age must be a number only.';
    if (!nextErrors.username && /\s/.test(form.username)) nextErrors.username = 'Username must not contain spaces.';

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) { setErrors(nextErrors); return; }

    const nextUser = {
      firstName: form.firstName.trim(), lastName: form.lastName.trim(), age: form.age.trim(),
      gender: form.gender.trim().toLowerCase(), contactNumber: form.contactNumber.trim(),
      email: form.email.trim().toLowerCase(), role: form.role.trim().toLowerCase(),
      username: form.username.trim().toLowerCase(), password: form.password,
      address: form.address.trim(), isActive: form.isActive,
    };

    setUsers((prev) =>
      modal.id ? prev.map((user) => (user.id === modal.id ? { ...user, ...nextUser } : user))
        : [...prev, { id: prev.reduce((max, user) => Math.max(max, Number(user.id) || 0), 0) + 1, ...nextUser }]
    );
    closeModal();
  };

  const toggleStatus = (id) => {
    setUsers((prev) => prev.map((user) => user.id === id ? { ...user, isActive: !user.isActive } : user));
  };

  const fieldProps = (name, label, extra = {}) => {
    const { select, ...restExtra } = extra;
    return {
      name, label, value: form[name], onChange: handleChange,
      error: Boolean(errors[name]), helperText: errors[name],
      fullWidth: true, variant: 'outlined', select: select,
      sx: {
        '& .MuiOutlinedInput-root': {
          color: '#fff',
          '& fieldset': { borderColor: GLASS_BORDER },
          '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
          '&.Mui-focused fieldset': { borderColor: NEON_RED },
        },
        '& .MuiInputLabel-root': { color: MUTED },
        '& .MuiInputLabel-root.Mui-focused': { color: NEON_RED },
        '& .MuiSvgIcon-root': { color: MUTED },
      },
      ...(select && {
        SelectProps: {
          MenuProps: {
            PaperProps: {
              sx: {
                bgcolor: DARK_BG, border: `1px solid ${GLASS_BORDER}`,
                '& .MuiMenuItem-root': { color: '#fff' },
                '& .MuiMenuItem-root:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
                '& .MuiMenuItem-root.Mui-selected': { bgcolor: 'rgba(255, 42, 42, 0.2)', color: NEON_RED },
                '& .MuiMenuItem-root.Mui-selected:hover': { bgcolor: 'rgba(255, 42, 42, 0.3)' },
              }
            }
          }
        }
      }),
      ...restExtra,
    };
  };

  const columns = [
    {
      field: 'avatar', headerName: '', width: 70, sortable: false, filterable: false,
      renderCell: (params) => {
        const icons = { male: '👨‍💼', female: '👩‍💼', other: '👤' };
        const icon = icons[params.row.gender] || '👤';
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.05)', border: `1px solid ${GLASS_BORDER}`, fontSize: '1.2rem' }}>
            {icon}
          </Box>
        );
      },
    },
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'fullName', headerName: 'Full Name', flex: 1, minWidth: 170,
      valueGetter: (_, row) => `${row.firstName} ${row.lastName}`.trim(),
      cellClassName: 'codename-cell',
    },
    { field: 'username', headerName: 'Username', minWidth: 120 },
    { field: 'age', headerName: 'Age', width: 70, type: 'number' },
    { field: 'gender', headerName: 'Gender', width: 90, valueGetter: (_, row) => labelize(row.gender) },
    { field: 'contactNumber', headerName: 'Contact Number', minWidth: 160 },
    { field: 'email', headerName: 'Email', flex: 1.5, minWidth: 220 },
    { field: 'role', headerName: 'Role', width: 100, valueGetter: (_, row) => labelize(row.role) },
    {
      field: 'status', headerName: 'Status', width: 120, sortable: false,
      renderCell: ({ row }) => {
        const s = row.isActive ? statusColors.Active : statusColors.Inactive;
        const statusText = row.isActive ? 'Active' : 'Inactive';
        return (
          <Box sx={{
            display: 'inline-flex', alignItems: 'center', gap: 1, px: 1.5, py: 0.5,
            bgcolor: s.bg, border: `1px solid ${s.border}`, borderRadius: '100px',
          }}>
            {row.isActive && <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: s.color, boxShadow: `0 0 8px ${s.color}`, animation: 'pulse 2s infinite' }} />}
            <Typography sx={{ color: s.color, fontWeight: 700, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{statusText}</Typography>
          </Box>
        );
      },
    },
    {
      field: 'actions', headerName: 'Actions', minWidth: 180, sortable: false, filterable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1} sx={{ py: 0.5 }}>
          <Button size="small" variant="outlined" onClick={() => openModal(row)} sx={{ color: NEON_BLUE, borderColor: 'rgba(59, 130, 246, 0.5)', '&:hover': { borderColor: NEON_BLUE, bgcolor: 'rgba(59, 130, 246, 0.1)' } }}>
            Edit
          </Button>
          <Button size="small" variant="outlined" onClick={() => toggleStatus(row.id)}
            sx={{
              color: row.isActive ? MUTED : NEON_GREEN,
              borderColor: row.isActive ? 'rgba(148, 163, 184, 0.5)' : 'rgba(34, 197, 94, 0.5)',
              '&:hover': { borderColor: row.isActive ? MUTED : NEON_GREEN, bgcolor: row.isActive ? 'rgba(148, 163, 184, 0.1)' : 'rgba(34, 197, 94, 0.1)' }
            }}
          >
            {row.isActive ? 'Disable' : 'Activate'}
          </Button>
        </Stack>
      ),
    },
  ];

  const activeCount = users.filter((r) => r.isActive).length;
  const adminCount = users.filter((r) => r.role === 'admin').length;
  const editorCount = users.filter((r) => r.role === 'editor').length;

  const summaryCards = [
    { label: 'Total Personnel', value: users.length, icon: <GroupsIcon sx={{ fontSize: 32, color: NEON_RED, filter: `drop-shadow(0 0 8px ${NEON_RED})` }} />, sub: `${activeCount} currently active` },
    { label: 'Active Status', value: activeCount, icon: <VerifiedUserIcon sx={{ fontSize: 32, color: NEON_GREEN, filter: `drop-shadow(0 0 8px ${NEON_GREEN})` }} />, sub: 'Ready for deployment' },
    { label: 'Admins', value: adminCount, icon: <AdminPanelSettingsIcon sx={{ fontSize: 32, color: NEON_GOLD, filter: `drop-shadow(0 0 8px ${NEON_GOLD})` }} />, sub: 'Top-level clearance' },
    { label: 'Editors', value: editorCount, icon: <SecurityIcon sx={{ fontSize: 32, color: NEON_BLUE, filter: `drop-shadow(0 0 8px ${NEON_BLUE})` }} />, sub: 'Field operators' },
  ];

  return (
    <Box sx={pageBgSx}>
      <Box sx={{ mb: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography sx={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.3em', color: NEON_RED, mb: 0.5 }}>Classified Roster</Typography>
          <Typography variant="h3" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.02em', background: 'linear-gradient(to right, #fff, #a1a1aa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
            S.H.I.E.L.D. Personnel Database
          </Typography>
          <Divider sx={{ borderColor: 'rgba(255,42,42,0.3)', borderWidth: 1, mt: 2, width: 120, boxShadow: `0 2px 10px ${NEON_RED}` }} />
        </Box>
        <Button variant="contained" onClick={() => openModal()}
          sx={{
            bgcolor: 'rgba(255, 42, 42, 0.1)', color: NEON_RED, border: `1px solid rgba(255, 42, 42, 0.5)`,
            boxShadow: `0 0 10px rgba(255, 42, 42, 0.2)`, fontWeight: 700, letterSpacing: '0.1em',
            '&:hover': { bgcolor: 'rgba(255, 42, 42, 0.2)', boxShadow: `0 0 20px rgba(255, 42, 42, 0.4)`, borderColor: NEON_RED }
          }}
        >
          ADD PERSONNEL
        </Button>
      </Box>

      {seed.error && <Alert severity="error" sx={{ mb: 4, bgcolor: 'rgba(255, 42, 42, 0.1)', color: NEON_RED, border: `1px solid rgba(255, 42, 42, 0.3)` }}>{seed.error}</Alert>}

      {/* Summary Cards */}
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
                <Box sx={{ p: 1, borderRadius: 2, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>{c.icon}</Box>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* DataGrid */}
      <Card sx={glassCardSx}>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ p: 3, borderBottom: `1px solid ${GLASS_BORDER}`, background: 'rgba(255,255,255,0.02)' }}>
            <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2}>
              <Box>
                <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: NEON_RED, mb: 0.5 }}>Personnel Records</Typography>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>System Registry</Typography>
              </Box>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ width: { xs: '100%', md: 'auto' } }}>
                <TextField 
                  size="small" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: MUTED, fontSize: 20 }} /></InputAdornment> }}
                  sx={{ width: { xs: '100%', sm: 200 }, '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: GLASS_BORDER }, '&:hover fieldset': { borderColor: MUTED }, '&.Mui-focused fieldset': { borderColor: NEON_RED } } }}
                />
                <TextField select size="small" value={filters.role} onChange={(e) => setFilters(p => ({...p, role: e.target.value}))}
                  sx={{ minWidth: 120, '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: GLASS_BORDER }, '&:hover fieldset': { borderColor: MUTED }, '&.Mui-focused fieldset': { borderColor: NEON_RED } }, '& .MuiSelect-icon': { color: MUTED } }}>
                  <MenuItem value="all">All Roles</MenuItem>
                  {roles.map(r => <MenuItem key={r} value={r}>{labelize(r)}</MenuItem>)}
                </TextField>
                <TextField select size="small" value={filters.gender} onChange={(e) => setFilters(p => ({...p, gender: e.target.value}))}
                  sx={{ minWidth: 120, '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: GLASS_BORDER }, '&:hover fieldset': { borderColor: MUTED }, '&.Mui-focused fieldset': { borderColor: NEON_RED } }, '& .MuiSelect-icon': { color: MUTED } }}>
                  <MenuItem value="all">All Genders</MenuItem>
                  {genders.map(g => <MenuItem key={g} value={g}>{labelize(g)}</MenuItem>)}
                </TextField>
                <TextField select size="small" value={filters.status} onChange={(e) => setFilters(p => ({...p, status: e.target.value}))}
                  sx={{ minWidth: 120, '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: GLASS_BORDER }, '&:hover fieldset': { borderColor: MUTED }, '&.Mui-focused fieldset': { borderColor: NEON_RED } }, '& .MuiSelect-icon': { color: MUTED } }}>
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </TextField>
              </Stack>
            </Stack>
          </Box>
          <Box sx={{ height: 600, width: '100%' }}>
            {filteredUsers.length ? (
              <DataGrid
                rows={filteredUsers}
                columns={columns}
                initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                pageSizeOptions={[5, 10, 15]}
                disableRowSelectionOnClick
                rowHeight={60}
                sx={{
                  border: 'none', borderRadius: 0, color: '#fff', '--DataGrid-rowBorderColor': GLASS_BORDER,
                  '& .MuiDataGrid-columnHeaders': { bgcolor: 'transparent', color: MUTED, textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.1em', fontWeight: 800, borderBottom: `2px solid rgba(255,42,42,0.3)` },
                  '& .MuiDataGrid-cell': { display: 'flex', alignItems: 'center' },
                  '& .codename-cell': { fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em', textShadow: '0 0 10px rgba(255,255,255,0.3)' },
                  '& .MuiDataGrid-row:hover': { bgcolor: 'rgba(255, 42, 42, 0.05)', boxShadow: `inset 0 0 20px rgba(255, 42, 42, 0.1)` },
                  '& .MuiDataGrid-footerContainer': { borderTop: `1px solid ${GLASS_BORDER}`, bgcolor: 'transparent', color: MUTED },
                  '& .MuiTablePagination-root': { color: MUTED },
                  '& .MuiCheckbox-root': { color: MUTED },
                  '& .MuiCheckbox-root.Mui-checked': { color: NEON_RED },
                  '& .MuiDataGrid-columnSeparator': { display: 'none' },
                }}
              />
            ) : (
              <Alert severity="info" sx={{ m: 3, bgcolor: 'rgba(59, 130, 246, 0.1)', color: NEON_BLUE, border: `1px solid rgba(59, 130, 246, 0.3)` }}>
                No personnel found. Use Add Personnel to create your first record.
              </Alert>
            )}
          </Box>
        </CardContent>
      </Card>

      <Dialog open={modal.open} onClose={closeModal} fullWidth fullScreen={isMobile} maxWidth="md"
        PaperProps={{
          sx: {
            bgcolor: DARK_BG, color: '#fff', border: `1px solid rgba(255, 42, 42, 0.3)`, boxShadow: `0 0 30px rgba(255, 42, 42, 0.15)`,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle sx={{ borderBottom: `1px solid ${GLASS_BORDER}`, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800, color: NEON_RED }}>
            {modal.id ? 'Edit Personnel' : 'Add Personnel'}
          </DialogTitle>
          <DialogContent sx={{ px: { xs: 2, sm: 3 }, py: 3, mt: 1 }}>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('firstName', 'First Name')} />
                <TextField {...fieldProps('lastName', 'Last Name')} />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('age', 'Age')} />
                <TextField {...fieldProps('gender', 'Gender', { select: true })}>
                  {genders.map((gender) => <MenuItem key={gender} value={gender}>{labelize(gender)}</MenuItem>)}
                </TextField>
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('contactNumber', 'Contact Number')} />
                <TextField {...fieldProps('email', 'Email Address', { type: 'email' })} />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('role', 'Role', { select: true })}>
                  {roles.map((role) => <MenuItem key={role} value={role}>{labelize(role)}</MenuItem>)}
                </TextField>
                <TextField {...fieldProps('username', 'Username')} />
              </Stack>
              <TextField
                {...fieldProps('password', 'Password', {
                  type: showPassword ? 'text' : 'password',
                  InputProps: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)} onMouseDown={(e) => e.preventDefault()} sx={{ color: MUTED }}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                })}
              />
              <TextField {...fieldProps('address', 'Address', { multiline: true, rows: 3 })} />
              <FormControlLabel
                control={<Switch name="isActive" checked={form.isActive} onChange={handleChange} sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: NEON_GREEN }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: NEON_GREEN } }} />}
                label={form.isActive ? 'Status: Active' : 'Status: Inactive'}
                sx={{ '& .MuiFormControlLabel-label': { color: form.isActive ? NEON_GREEN : MUTED, fontWeight: 600 } }}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2, borderTop: `1px solid ${GLASS_BORDER}` }}>
            <Button onClick={closeModal} sx={{ color: MUTED, '&:hover': { color: '#fff' } }}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{
              bgcolor: 'rgba(255, 42, 42, 0.1)', color: NEON_RED, border: `1px solid rgba(255, 42, 42, 0.5)`,
              '&:hover': { bgcolor: 'rgba(255, 42, 42, 0.3)', borderColor: NEON_RED }
            }}>
              {modal.id ? 'Update Record' : 'Save Record'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
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
};

export default UsersPage;