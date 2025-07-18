import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFormByPublicId, submitResponse } from '../services/api';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Paper from '@mui/material/Paper';

function PublicForm() {
  const { publicId } = useParams();
  const [form, setForm] = useState(null);
  const [name, setName] = useState('');
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchForm() {
      try {
        const res = await getFormByPublicId(publicId);
        setForm(res.data.form);
        setAnswers(res.data.form.questions.map(() => ''));
      } catch (err) {
        setError('Form not found');
      }
    }
    fetchForm();
  }, [publicId]);

  const handleChange = (idx, value) => {
    setAnswers(ans => ans.map((a, i) => i === idx ? value : a));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      setError('Name is required.');
      return;
    }
    if (answers.some(a => !a)) {
      setError('Please answer all questions.');
      return;
    }
    try {
      const formattedAnswers = form.questions.map((q, idx) => ({
        questionId: q._id,
        answer: answers[idx]
      }));
      await submitResponse(publicId, { name, answers: formattedAnswers });
      setSubmitted(true);
    } catch (err) {
      setError('Submission failed');
    }
  };

  if (error) return <Container maxWidth="sm"><Typography color="error">{error}</Typography></Container>;
  if (!form) return <Container maxWidth="sm"><Typography>Loading...</Typography></Container>;
  if (submitted) return <Container maxWidth="sm"><Typography variant="h5" sx={{ mt: 4 }}>Thank you for your feedback!</Typography></Container>;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>{form.title}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Your Name" fullWidth margin="normal" value={name} onChange={e => setName(e.target.value)} required />
        {form.questions.map((q, idx) => (
          <Paper key={q._id} sx={{ p: 2, mb: 2 }}>
            <Typography>{q.text}</Typography>
            {q.type === 'text' ? (
              <TextField fullWidth margin="normal" value={answers[idx]} onChange={e => handleChange(idx, e.target.value)} required />
            ) : (
              <RadioGroup value={answers[idx]} onChange={e => handleChange(idx, e.target.value)}>
                {q.options.map((opt, optIdx) => (
                  <FormControlLabel key={optIdx} value={opt} control={<Radio />} label={opt} />
                ))}
              </RadioGroup>
            )}
          </Paper>
        ))}
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Submit Feedback</Button>
      </form>
    </Container>
  );
}

export default PublicForm;
