import { useState, useEffect } from 'react';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  Card,
  CardContent,
  Divider,
  MenuItem,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';

import ArticleIcon from '@mui/icons-material/Article';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PostAddIcon from '@mui/icons-material/PostAdd';
import SearchIcon from '@mui/icons-material/Search';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

import { fetchArticles, createArticle, updateArticle, deleteArticle } from '../../services/ArticleServices';

// ── Theme Constants (S.H.I.E.L.D. Standard) ──
const NEON_RED = '#ff2a2a';
const NEON_GOLD = '#ffc107';
const NEON_BLUE = '#3b82f6';
const DARK_BG = '#050505';
const GLASS_BG = 'rgba(15, 15, 20, 0.6)';
const GLASS_BORDER = 'rgba(255, 255, 255, 0.08)';
const MUTED = '#94a3b8';

const glassCardSx = {
  bgcolor: GLASS_BG,
  backdropFilter: 'blur(12px)',
  border: `1px solid ${GLASS_BORDER}`,
  borderRadius: 3,
  color: '#fff',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: `0 12px 40px rgba(0,0,0,0.5), 0 0 20px rgba(255, 42, 42, 0.15)`,
    borderColor: 'rgba(255, 42, 42, 0.3)',
  },
};

const pageBgSx = {
  bgcolor: DARK_BG, minHeight: '100vh', pb: 6, position: 'relative', zIndex: 0,
  '&::before': {
    content: '""', position: 'absolute', inset: 0, zIndex: -1,
    background: `radial-gradient(circle at 50% 0%, rgba(255,42,42,0.12) 0%, rgba(0,0,0,0) 60%)`,
  }
};

// Enhancement 2: Dashboard Article Management System (CRUD based on UsersPage)
const DashArticleListPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState({ name: '', title: '', content: '', author: '' });
  const [errors, setErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [apiError, setApiError] = useState('');

  const loadArticles = async () => {
    try {
      setLoading(true);
      const { data } = await fetchArticles();
      setArticles(data);
      setApiError('');
    } catch (error) {
      console.error('Error fetching articles:', error);
      setApiError('Unable to access encrypted intel database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const filteredArticles = articles.filter((art) => 
    art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    art.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (article = null) => {
    setModal({ open: true, id: article?._id ?? null });
    if (article) {
      setForm({
        name: article.name,
        title: article.title,
        content: article.content.join('\n\n'), // Join paragraphs for editing
        author: article.author || 'S.H.I.E.L.D. Intel',
      });
    } else {
      setForm({ name: '', title: '', content: '', author: 'S.H.I.E.L.D. Intel' });
    }
    setErrors({});
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Slug name is required.';
    if (!form.title.trim()) nextErrors.title = 'Title is required.';
    if (!form.content.trim()) nextErrors.content = 'Content is required.';
    return nextErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) { setErrors(nextErrors); return; }

    try {
      const payload = {
        ...form,
        content: form.content.split('\n').filter(p => p.trim() !== '') // Convert back to array
      };

      if (modal.id) {
        await updateArticle(modal.id, payload);
      } else {
        await createArticle(payload);
      }
      
      await loadArticles();
      closeModal();
    } catch (error) {
      setApiError('Failed to commit intelligence report to database.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to shred this classified file?')) {
      try {
        await deleteArticle(id);
        await loadArticles();
      } catch (error) {
        setApiError('Unauthorized deletion attempt failed.');
      }
    }
  };

  const fieldProps = (name, label, extra = {}) => ({
    name, label, value: form[name], onChange: handleChange,
    error: Boolean(errors[name]), helperText: errors[name],
    fullWidth: true, variant: 'outlined',
    sx: {
      '& .MuiOutlinedInput-root': {
        color: '#fff',
        '& fieldset': { borderColor: GLASS_BORDER },
        '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
        '&.Mui-focused fieldset': { borderColor: NEON_RED },
      },
      '& .MuiInputLabel-root': { color: MUTED },
      '& .MuiInputLabel-root.Mui-focused': { color: NEON_RED },
    },
    ...extra,
  });

  const columns = [
    {
      field: 'icon', headerName: '', width: 60, sortable: false,
      renderCell: () => <ArticleIcon sx={{ color: NEON_GOLD, filter: `drop-shadow(0 0 5px ${NEON_GOLD})` }} />
    },
    { field: 'title', headerName: 'Intel Title', flex: 1.5, minWidth: 200, cellClassName: 'codename-cell' },
    { field: 'name', headerName: 'Slug/ID', flex: 1, minWidth: 150, cellClassName: 'slug-cell' },
    { field: 'author', headerName: 'Author', width: 150 },
    {
      field: 'createdAt', headerName: 'Date Logged', width: 180,
      valueGetter: (value) => new Date(value).toLocaleDateString() + ' ' + new Date(value).toLocaleTimeString()
    },
    {
      field: 'actions', headerName: 'Clearance Operations', minWidth: 150, sortable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-start' }}>
          <IconButton onClick={() => openModal(row)} sx={{ color: NEON_BLUE }}>
            <EditNoteIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(row._id)} sx={{ color: NEON_RED }}>
            <DeleteSweepIcon />
          </IconButton>
        </Stack>
      )
    }
  ];

  return (
    <Box sx={pageBgSx}>
      <Box sx={{ mb: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography sx={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.3em', color: NEON_RED, mb: 0.5 }}>Intelligence Archive</Typography>
          <Typography variant="h3" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.02em', background: 'linear-gradient(to right, #fff, #a1a1aa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Daily Bugle & Intel
          </Typography>
          <Divider sx={{ borderColor: 'rgba(255,42,42,0.3)', borderWidth: 1, mt: 2, width: 120 }} />
        </Box>
        <Button variant="contained" startIcon={<PostAddIcon />} onClick={() => openModal()}
          sx={{
            bgcolor: 'rgba(255, 42, 42, 0.1)', color: NEON_RED, border: `1px solid rgba(255, 42, 42, 0.5)`,
            fontWeight: 700, '&:hover': { bgcolor: 'rgba(255, 42, 42, 0.2)', borderColor: NEON_RED }
          }}
        >
          LOG NEW INTEL
        </Button>
      </Box>

      {apiError && <Alert severity="error" sx={{ mb: 4, bgcolor: 'rgba(255, 42, 42, 0.1)', color: NEON_RED, border: `1px solid rgba(255, 42, 42, 0.3)` }}>{apiError}</Alert>}

      <Card sx={glassCardSx}>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ p: 3, borderBottom: `1px solid ${GLASS_BORDER}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Article Registry</Typography>
            <TextField 
              size="small" placeholder="Search Archives..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: MUTED, fontSize: 20 }} /></InputAdornment> } }}
              sx={{ width: 300, '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: GLASS_BORDER }, '&.Mui-focused fieldset': { borderColor: NEON_RED } } }}
            />
          </Box>
          <Box sx={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={filteredArticles}
              columns={columns}
              getRowId={(row) => row._id}
              loading={loading}
              disableRowSelectionOnClick
              rowHeight={60}
              sx={{
                border: 'none', color: '#fff', '--DataGrid-rowBorderColor': GLASS_BORDER,
                '& .MuiDataGrid-columnHeaders': { bgcolor: 'rgba(255,255,255,0.02)', color: MUTED, textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 800 },
                '& .codename-cell': { fontWeight: 800, color: '#fff', textTransform: 'uppercase' },
                '& .slug-cell': { color: NEON_BLUE, fontFamily: 'monospace' },
                '& .MuiDataGrid-row:hover': { bgcolor: 'rgba(255, 42, 42, 0.05)' },
                '& .MuiDataGrid-footerContainer': { borderTop: `1px solid ${GLASS_BORDER}` },
                '& .MuiTablePagination-root': { color: MUTED },
              }}
            />
          </Box>
        </CardContent>
      </Card>

      <Dialog open={modal.open} onClose={closeModal} fullWidth maxWidth="md"
        slotProps={{ paper: { sx: { bgcolor: DARK_BG, color: '#fff', border: `1px solid rgba(255, 42, 42, 0.3)` } } }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle sx={{ color: NEON_RED, fontWeight: 800, textTransform: 'uppercase' }}>
            {modal.id ? 'Edit Intelligence Report' : 'File New Intelligence Report'}
          </DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 2 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('title', 'Article Title')} />
                <TextField {...fieldProps('name', 'Slug Name (e.g. spider-man-menace)')} disabled={Boolean(modal.id)} />
              </Stack>
              <TextField {...fieldProps('author', 'Author / Division')} />
              <TextField {...fieldProps('content', 'Intelligence Content (Use new lines for paragraphs)', { multiline: true, rows: 10 })} />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={closeModal} sx={{ color: MUTED }}>Abort</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: 'rgba(255, 42, 42, 0.1)', color: NEON_RED, border: `1px solid rgba(255, 42, 42, 0.5)` }}>
              {modal.id ? 'Confirm Update' : 'Commit to Database'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default DashArticleListPage;
