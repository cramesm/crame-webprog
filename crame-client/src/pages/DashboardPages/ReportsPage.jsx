import React, { useRef } from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { BarChart } from "@mui/x-charts/BarChart";
import { Gauge } from "@mui/x-charts/Gauge";
import { PieChart } from "@mui/x-charts/PieChart";
import { DataGrid } from '@mui/x-data-grid';

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
const titleSx = { fontWeight: 800, color: '#fff', mb: 1, textTransform: 'uppercase', letterSpacing: '0.05em' };

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'firstName', headerName: 'First name', width: 150, editable: true },
  { field: 'lastName', headerName: 'Last name', width: 150, editable: true },
  { field: 'age', headerName: 'Age', type: 'number', width: 110, editable: true },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const ReportsPage = () => {
  const printRef = useRef(null);

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '_blank', 'width=1200,height=900');
    if (!printWindow) return;

    const headMarkup = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map((node) => node.outerHTML)
      .join('');

    const exportedAt = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'long', timeStyle: 'short',
    }).format(new Date());

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Print Report</title>
          ${headMarkup}
          <style>
            @page { size: A4 landscape; margin: 10mm; }
            * { box-sizing: border-box; }
            body { 
              margin: 0; font-family: Arial, Helvetica, sans-serif; 
              background: #050505 !important; color: #fff !important; 
              -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; 
            }
            .report-shell { padding: 10px; }
            .report-header { margin-bottom: 24px; padding-bottom: 14px; border-bottom: 1px solid rgba(255, 42, 42, 0.3); }
            .report-header h1 { margin: 0 0 6px; font-size: 20px; font-weight: 700; color: #ff2a2a; text-transform: uppercase; letter-spacing: 0.1em; }
            .report-header p { margin: 0; font-size: 14px; color: #94a3b8; line-height: 1.5; }
            
            /* Enhancement 1: ReportsPage Printing Design */
            /* Preserve cinematic dark theme for printing */
            .report-content .MuiCard-root {
              break-inside: avoid;
              page-break-inside: avoid;
            }
            .report-content .MuiDataGrid-root {
              max-height: none !important;
            }
            /* Adjust scaling to ensure it fits on one page */
            .report-content {
              zoom: 0.60;
            }
          </style>
        </head>
        <body>
          <main class="report-shell">
            <header class="report-header">
              <h1>Reports Summary</h1>
              <p>Analytics overview for generated reports, category breakdown, and completion performance.</p>
              <p>Prepared on ${exportedAt}</p>
            </header>
            <section class="report-content">
              ${printContent.outerHTML}
            </section>
          </main>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.setTimeout(() => { printWindow.print(); }, 500);
  };

  return (
    <Box sx={pageBgSx}>
      <Box sx={{ mb: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography sx={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.3em', color: NEON_RED, mb: 0.5 }}>Data Analytics Division</Typography>
          <Typography variant="h3" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.02em', background: 'linear-gradient(to right, #fff, #a1a1aa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
            Reports Overview
          </Typography>
          <Typography variant="body2" sx={{ color: MUTED, mt: 1, maxWidth: 500 }}>
            Report analytics overview showing generated reports, category breakdown, and current completion performance.
          </Typography>
          <Divider sx={{ borderColor: 'rgba(255,42,42,0.3)', borderWidth: 1, mt: 2, width: 120, boxShadow: `0 2px 10px ${NEON_RED}` }} />
        </Box>

        <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
          <Button variant="contained" sx={{ bgcolor: 'rgba(255, 42, 42, 0.1)', color: NEON_RED, border: `1px solid rgba(255, 42, 42, 0.5)`, '&:hover': { bgcolor: 'rgba(255, 42, 42, 0.2)', borderColor: NEON_RED }}}>Generate</Button>
          <Button variant="outlined" onClick={handlePrint} sx={{ color: NEON_BLUE, borderColor: 'rgba(59, 130, 246, 0.5)', '&:hover': { borderColor: NEON_BLUE, bgcolor: 'rgba(59, 130, 246, 0.1)' } }}>Export</Button>

        </Stack>
      </Box>

      <Stack ref={printRef} spacing={4}>
        <Card sx={glassCardSx}>
          <CardContent sx={{ p: 3 }}>
            <Typography sx={labelSx}>Output Volume</Typography>
            <Typography variant="h6" sx={titleSx}>Monthly Report Output</Typography>
            <Typography variant="body2" sx={{ color: MUTED, mb: 3 }}>
              This chart compares how many reports were generated and how many were completed across the last four months.
            </Typography>
            <BarChart
              series={[
                { data: [10, 24, 20, 27], label: "Generated", color: NEON_BLUE },
                { data: [12, 19, 17, 23], label: "Completed", color: NEON_GREEN },
              ]}
              height={300}
              xAxis={[
                {
                  data: ["January", "February", "March", "April"],
                  scaleType: "band",
                  label: "Months",
                },
              ]}
              sx={axisSx}
            />
          </CardContent>
        </Card>

        <Stack direction={{ xs: "column", lg: "row" }} spacing={4}>
          <Card sx={{ ...glassCardSx, flex: 1 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography sx={labelSx}>Distribution</Typography>
              <Typography variant="h6" sx={titleSx}>Report Category Share</Typography>
              <Typography variant="body2" sx={{ color: MUTED, mb: 3 }}>
                This chart shows the distribution of report requests by category for the current reporting period.
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: 14, label: "Sales", color: NEON_RED },
                        { id: 1, value: 10, label: "Users", color: NEON_BLUE },
                        { id: 2, value: 8, label: "Inventory", color: NEON_GOLD },
                        { id: 3, value: 6, label: "Finance", color: NEON_GREEN },
                      ],
                      innerRadius: 40, paddingAngle: 2, cornerRadius: 4,
                    }
                  ]}
                  width={340}
                  height={220}
                  sx={{ '& .MuiChartsLegend-label': { fill: '#fff !important', fontFamily: 'inherit' } }}
                />
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ ...glassCardSx, flex: 1 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography sx={labelSx}>Performance</Typography>
              <Typography variant="h6" sx={titleSx}>Completion Rate</Typography>
              <Typography variant="body2" sx={{ color: MUTED, mb: 3 }}>
                The gauge highlights the current percentage of reports completed on time based on the latest reporting cycle.
              </Typography>
              <Box sx={{ minHeight: 220, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Gauge 
                  width={180} 
                  height={180} 
                  value={78} 
                  sx={{ 
                    '& .MuiGauge-valueArc': { fill: NEON_GREEN }, 
                    '& .MuiGauge-valueText': { fill: '#fff', fontWeight: 800 } 
                  }} 
                />
              </Box>
            </CardContent>
          </Card>
        </Stack>

        <Card sx={glassCardSx}>
          <CardContent sx={{ p: 0 }}>
            <Box sx={{ p: 3, borderBottom: `1px solid ${GLASS_BORDER}`, background: 'rgba(255,255,255,0.02)' }}>
              <Typography sx={labelSx}>Data Table</Typography>
              <Typography variant="h6" sx={titleSx}>Recent Activity Log</Typography>
            </Box>
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                experimentalFeatures={{ newEditingApi: true }}
                initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
                sx={{
                  border: 'none', borderRadius: 0, color: '#fff', '--DataGrid-rowBorderColor': GLASS_BORDER,
                  '& .MuiDataGrid-columnHeaders': { bgcolor: 'transparent', color: MUTED, textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.1em', fontWeight: 800, borderBottom: `2px solid rgba(255,42,42,0.3)` },
                  '& .MuiDataGrid-cell': { display: 'flex', alignItems: 'center' },
                  '& .MuiDataGrid-row:hover': { bgcolor: 'rgba(255, 42, 42, 0.05)', boxShadow: `inset 0 0 20px rgba(255, 42, 42, 0.1)` },
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
      </Stack>
    </Box>
  );
};

export default ReportsPage;