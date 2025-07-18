import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createForm } from '../services/api';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Alert from '@mui/material/Alert';

function CreateForm({ auth }) {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([
    { text: '', type: 'text', options: [] }
  ]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const token = auth?.token;

  const handleQuestionChange = (idx, field, value) => {
    setQuestions(qs => qs.map((q, i) => i === idx ? { ...q, [field]: value } : q));
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { text: '', type: 'text', options: [] }]);
  };

  const handleRemoveQuestion = (idx) => {
    setQuestions(qs => qs.filter((_, i) => i !== idx));
  };

  const handleOptionChange = (qIdx, optIdx, value) => {
    setQuestions(qs => qs.map((q, i) => i === qIdx ? {
      ...q,
      options: q.options.map((opt, j) => j === optIdx ? value : opt)
    } : q));
  };

  const handleAddOption = (qIdx) => {
    setQuestions(qs => qs.map((q, i) => i === qIdx ? {
      ...q,
      options: [...q.options, '']
    } : q));
  };

  const handleRemoveOption = (qIdx, optIdx) => {
    setQuestions(qs => qs.map((q, i) => i === qIdx ? {
      ...q,
      options: q.options.filter((_, j) => j !== optIdx)
    } : q));
  };

  const validateForm = () => {
    if (!title) return 'Form must have a title.';
    if (questions.length < 3 || questions.length > 5) return 'Form must have 3-5 questions.';
    for (let q of questions) {
      if (!q.text) return 'All questions must have text.';
      if (q.type === 'multiple-choice') {
        if (!q.options.length) return 'Multiple-choice questions must have at least one option.';
        if (q.options.some(opt => !opt)) return 'All options must have text.';
      }
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      await createForm({ title, questions }, token);
      setSuccess('Form created successfully!');
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating form');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h5" gutterBottom>Create Feedback Form</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Form Title" fullWidth margin="normal" value={title} onChange={e => setTitle(e.target.value)} required />
        <Divider sx={{ my: 2 }} />
        {questions.map((q, idx) => (
          <Paper key={idx} sx={{ p: 2, mb: 3, background: '#f9f9f9', boxShadow: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {q.type === 'text' ? 'Text Question' : 'Multiple Choice Question'} #{idx + 1}
            </Typography>
            <TextField label={`Question ${idx + 1}`} fullWidth margin="normal" value={q.text} onChange={e => handleQuestionChange(idx, 'text', e.target.value)} required />
            <TextField select label="Type" value={q.type} onChange={e => handleQuestionChange(idx, 'type', e.target.value)} sx={{ mb: 2 }}>
              <MenuItem value="text">Text</MenuItem>
              <MenuItem value="multiple-choice">Multiple Choice</MenuItem>
            </TextField>
            {q.type === 'multiple-choice' && (
              <>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body2" sx={{ mb: 1 }}>Options:</Typography>
                {q.options.map((opt, optIdx) => (
                  <div key={optIdx} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                    <TextField label={`Option ${optIdx + 1}`} value={opt} onChange={e => handleOptionChange(idx, optIdx, e.target.value)} sx={{ flex: 1 }} />
                    <Tooltip title="Remove Option">
                      <Button variant="contained" color="error" size="small" onClick={() => handleRemoveOption(idx, optIdx)} style={{ marginLeft: 8, minWidth: 100 }}>Remove</Button>
                    </Tooltip>
                  </div>
                ))}
                <Tooltip title="Add Option">
                  <Button variant="contained" size="small" onClick={() => handleAddOption(idx)} sx={{ mt: 1, background: '#1976d2', color: '#fff', minWidth: 100 }}>Add Option</Button>
                </Tooltip>
              </>
            )}
            <Divider sx={{ my: 1 }} />
            <Tooltip title={questions.length <= 3 ? "Minimum 3 questions required" : "Remove Question"}>
              <span>
                <Button variant="contained" color="error" size="small" onClick={() => handleRemoveQuestion(idx)} disabled={questions.length <= 3} style={{ marginTop: 8, minWidth: 140 }}>Remove Question</Button>
              </span>
            </Tooltip>
          </Paper>
        ))}
        <Tooltip title={questions.length >= 5 ? "Maximum 5 questions allowed" : "Add Question"}>
          <span>
            <Button variant="contained" onClick={handleAddQuestion} disabled={questions.length >= 5} sx={{ mb: 2, background: '#1976d2', color: '#fff', minWidth: 140 }}>Add Question</Button>
          </span>
        </Tooltip>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, background: '#43a047', color: '#fff', minHeight: 48 }}>Create Form</Button>
      </form>
    </Container>
  );
}

export default CreateForm;
