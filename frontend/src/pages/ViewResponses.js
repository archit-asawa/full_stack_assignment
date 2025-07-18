import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getResponses } from '../services/api';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

function ViewResponses({ auth }) {
  const { formId } = useParams();
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = auth?.token;

  useEffect(() => {
    async function fetchResponses() {
      try {
        const res = await getResponses(formId, token);
        setResponses(res.data.responses);
      } catch (err) {
        // handle error
      } finally {
        setLoading(false);
      }
    }
    fetchResponses();
  }, [formId, token]);

  const handleExportCSV = () => {
    window.open(`/api/responses/export/${formId}`, '_blank');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>Form Responses</Typography>
      <Button variant="contained" onClick={handleExportCSV} sx={{ mb: 2 }}>Export as CSV</Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Submitted At</TableCell>
              <TableCell>Answers</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {responses.map((resp, idx) => (
              <TableRow key={resp._id || idx}>
                <TableCell>{resp.name}</TableCell>
                <TableCell>{new Date(resp.submittedAt).toLocaleString()}</TableCell>
                <TableCell>
                  {resp.answers.map((ans, i) => (
                    <div key={i}><strong>Q{i+1}:</strong> {JSON.stringify(ans.answer)}</div>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {loading && <Typography sx={{ mt: 2 }}>Loading...</Typography>}
      {!loading && responses.length === 0 && <Typography sx={{ mt: 2 }}>No responses found.</Typography>}
    </Container>
  );
}

export default ViewResponses;
