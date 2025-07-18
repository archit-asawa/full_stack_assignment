const Form = require('../models/Form');

exports.createForm = async (req, res) => {
  try {
    const { title, questions } = req.body;
    // Use dynamic import for nanoid
    const { nanoid } = await import('nanoid');
    const publicId = nanoid(10);
    const form = new Form({ title, questions, owner: req.user.id, publicId });
    await form.save();
    res.status(201).json({ form });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getForms = async (req, res) => {
  try {
    const forms = await Form.find({ owner: req.user.id });
    res.json({ forms });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getFormByPublicId = async (req, res) => {
  try {
    const form = await Form.findOne({ publicId: req.params.publicId });
    if (!form) return res.status(404).json({ message: 'Form not found' });
    res.json({ form });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
