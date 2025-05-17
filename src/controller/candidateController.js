const Candidate = require('../models/candidate');

// Create Candidate
const createCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.create(req.body);
    res.status(201).json({
      success: true,
      message: "Candidate created successfully",
      candidate,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get All Candidates
const getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json({
      success: true,
      candidates,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Candidate by ID
const getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }
    res.status(200).json({
      success: true,
      candidate,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Candidate
const updateCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Candidate updated successfully",
      candidate,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete Candidate
const deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    await candidate.deleteOne();
    res.status(200).json({
      success: true,
      message: "Candidate deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Search Candidates (by fullName, email, skills, state, country)
const searchCandidates = async (req, res) => {
  const { fullName, email, skills, state, country } = req.query;
  let query = {};

  if (fullName) query.fullName = { $regex: fullName, $options: "i" };
  if (email) query.email = { $regex: email, $options: "i" };
  if (skills) query.technicalSkills = { $regex: skills, $options: "i" };
  if (state) query.state = { $regex: state, $options: "i" };
  if (country) query.country = { $regex: country, $options: "i" };

  try {
    const candidates = await Candidate.find(query);
    res.status(200).json({
      success: true,
      candidates,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Export all as object
module.exports = {
  createCandidate,
  getAllCandidates,
  getCandidateById,
  updateCandidate,
  deleteCandidate,
  searchCandidates,
};
