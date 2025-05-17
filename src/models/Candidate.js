const mongoose = require('mongoose');

// Education Schema
const educationSchema = new mongoose.Schema({
  instituteName: {
    type: String,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  specialization: {
    type: String
  },
  percentage: {
    type: Number,
    required: true
  },
  startingYear: {
    type: Number,
    required: true
  },
  endingYear: {
    type: Number,
    required: true
  },
  currentlyPursuing: {
    type: Boolean,
    default: false
  }
});

// Experience Schema
const experienceSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  yearsOfExperience: {
    type: Number,
    required: true
  },
  currentSalary: {
    type: Number
  },
  expectedSalary: {
    type: Number
  },
  technologiesUsed: {
    type: String
  },
  fresher: {
    type: Boolean,
    default: false
  }
});

// Candidate Schema
const candidateSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    // required: true
  },
  gender: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    // required: true,
    match: [/^\d{10}$/, 'Please enter a valid phone number']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
  },
  permanentAddress: {
    type: String,
    required: true
  },
  currentAddress: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  education: {
    type: [educationSchema],
    required: true
  },
  experience: {
    type: [experienceSchema]
  }
}, {
  timestamps: true
});

// Create and Export Candidate Model
module.exports = mongoose.model('Candidate', candidateSchema);
