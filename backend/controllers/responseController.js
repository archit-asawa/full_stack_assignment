const express = require('express');
const router = express.Router();
const Response = require('../models/Response');
const Form = require('../models/Form');
const { Parser } = require('json2csv');

exports.submitResponse = async (req, res) => {
  try {
    const { publicId } = req.params;
    const { name, answers } = req.body;
    const form = await Form.findOne({ publicId });
    if (!form) return res.status(404).json({ message: 'Form not found' });
    if (!name) return res.status(400).json({ message: 'Name is required' });
    const response = new Response({ form: form._id, name, answers });
    await response.save();
    res.status(201).json({ message: 'Response submitted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getResponses = async (req, res) => {
  try {
    const { formId } = req.params;
    const responses = await Response.find({ form: formId });
    res.json({ responses });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.exportCSV = async (req, res) => {
  try {
    const { formId } = req.params;
    const responses = await Response.find({ form: formId }).lean();
    if (!responses.length) return res.status(404).json({ message: 'No responses found' });
    const parser = new Parser();
    const csv = parser.parse(responses);
    res.header('Content-Type', 'text/csv');
    res.attachment('responses.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
