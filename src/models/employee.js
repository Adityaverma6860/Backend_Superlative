const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  // Personal Information
  // employee id
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String },

  // Job Information
  department: { type: String, required: true },
  designation: { type: String, required: true },
  joiningDate: { type: Date, required: true },

  // Salary
  salaryCTC: { type: Number, required: true },
  baseSalary: { type: Number, required: true },

  // Address
  address: { type: String },

  // Document Uploads (Cloudinary URLs)
  documents: {
    aadharCard: { type: String },
    panCard: { type: String },
    tenthMarksheet: { type: String },
    twelfthMarksheet: { type: String },
    graduationMarksheet: { type: String },
    workExperience: { type: String },
    other: {
      name: { type: String },
      fileUrl: { type: String }
    }
  },

  // Bank Details
  bankDetails: {
    accountNumber: { type: String },
    ifscCode: { type: String },
    bankName: { type: String },
    passbookImage: { type: String }
  }

}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);

// Some Update



// const mongoose = require('mongoose');

// // Sub-schema for document fields
// const documentFieldSchema = new mongoose.Schema({
//   fileUrl: { type: String, required: true },
//   data: { type: mongoose.Schema.Types.Mixed } 
// }, { _id: false });

// // Sub-schema for 'other' document
// const otherDocumentSchema = new mongoose.Schema({
//   name: { type: String },
//   fileUrl: { type: String },
//   data: { type: mongoose.Schema.Types.Mixed }
// }, { _id: false });

// // Main Employee Schema
// const employeeSchema = new mongoose.Schema({
//   // Personal Information
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   phoneNumber: { type: String },

//   // Job Information
//   department: { type: String, required: true },
//   designation: { type: String, required: true },
//   joiningDate: { type: Date, required: true },

//   // Salary
//   salaryCTC: { type: Number, required: true },
//   baseSalary: { type: Number, required: true },

//   // Address
//   address: { type: String },

//   // Document Uploads
//   documents: {
//     aadharCard: documentFieldSchema,
//     panCard: documentFieldSchema,
//     tenthMarksheet: documentFieldSchema,
//     twelfthMarksheet: documentFieldSchema,
//     graduationMarksheet: documentFieldSchema,
//     workExperience: documentFieldSchema,
//     other: otherDocumentSchema
//   },

//   // Bank Details
//   bankDetails: {
//     accountNumber: { type: String },
//     ifscCode: { type: String },
//     bankName: { type: String },
//     passbookImage: { type: String }
//   }

// }, { timestamps: true });

// module.exports = mongoose.model('Employee', employeeSchema);






