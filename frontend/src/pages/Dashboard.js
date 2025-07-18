import React, { useEffect, useState } from 'react';
import { getForms } from '../services/api';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Dashboard({ auth }) {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = auth?.token;

  useEffect(() => {
    async function fetchForms() {
      try {
        const res = await getForms(token);
        setForms(res.data.forms);
      } catch (err) {
        // handle error
      } finally {
        setLoading(false);
      }
    }
    fetchForms();
  }, [token]);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      <Button variant="contained" component={Link} to="/create-form" sx={{ mb: 2 }}>Create New Form</Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Questions</TableCell>
              <TableCell>Public Link</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {forms.map(form => (
              <TableRow key={form._id}>
                <TableCell>{form.title}</TableCell>
                <TableCell>{form.questions.length}</TableCell>
                <TableCell>
                  <a href={`/form/${form.publicId}`} target="_blank" rel="noopener noreferrer">
                    /form/{form.publicId}
                  </a>
                </TableCell>
                <TableCell>
                  <Button component={Link} to={`/responses/${form._id}`} variant="outlined" size="small">View Responses</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {loading && <Typography sx={{ mt: 2 }}>Loading...</Typography>}
      {!loading && forms.length === 0 && <Typography sx={{ mt: 2 }}>No forms found.</Typography>}
    </Container>
  );
}

export default Dashboard;
