const Employee = require('../models/employee');
const uploadSingleImageOnCloudinary = require('../config/cloudinary');

// Helper to upload a file and return its URL
const uploadFileFromRequest = async (files, fieldName) => {
  if (files?.[fieldName]?.[0]?.path) {
    const result = await uploadSingleImageOnCloudinary(files[fieldName][0].path);
    return result?.url || '';
  }
  return '';
};

exports.createEmployee = async (req, res) => {
  try {
    const {
      firstName, lastName, email, phoneNumber,
      department, designation, joiningDate,
      salaryCTC, baseSalary, address,
      otherDocumentName, accountNumber, ifscCode, bankName
    } = req.body;

    const files = req.files;

    const newEmployee = new Employee({
      firstName,
      lastName,
      email,
      phoneNumber,
      department,
      designation,
      joiningDate,
      salaryCTC,
      baseSalary,
      address,
      documents: {
        aadharCard: await uploadFileFromRequest(files, 'aadharCard'),
        panCard: await uploadFileFromRequest(files, 'panCard'),
        tenthMarksheet: await uploadFileFromRequest(files, 'tenthMarksheet'),
        twelfthMarksheet: await uploadFileFromRequest(files, 'twelfthMarksheet'),
        graduationMarksheet: await uploadFileFromRequest(files, 'graduationMarksheet'),
        workExperience: await uploadFileFromRequest(files, 'workExperience'),
        other: {
          name: otherDocumentName || '',
          fileUrl: await uploadFileFromRequest(files, 'otherDocument'),
        },
      },
      bankDetails: {
        accountNumber,
        ifscCode,
        bankName,
        passbookImage: await uploadFileFromRequest(files, 'passbookImage'),
      },
    });

    const saved = await newEmployee.save();
    res.status(201).json({ message: 'Employee created successfully', employee: saved });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create employee', error: err.message });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch employees', error: err.message });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching employee', error: err.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    const {
      firstName, lastName, email, phoneNumber,
      department, designation, joiningDate,
      salaryCTC, baseSalary, address,
      otherDocumentName, accountNumber, ifscCode, bankName
    } = req.body;

    const files = req.files;

    employee.firstName = firstName || employee.firstName;
    employee.lastName = lastName || employee.lastName;
    employee.email = email || employee.email;
    employee.phoneNumber = phoneNumber || employee.phoneNumber;
    employee.department = department || employee.department;
    employee.designation = designation || employee.designation;
    employee.joiningDate = joiningDate || employee.joiningDate;
    employee.salaryCTC = salaryCTC || employee.salaryCTC;
    employee.baseSalary = baseSalary || employee.baseSalary;
    employee.address = address || employee.address;

    employee.documents.aadharCard = await uploadFileFromRequest(files, 'aadharCard') || employee.documents.aadharCard;
    employee.documents.panCard = await uploadFileFromRequest(files, 'panCard') || employee.documents.panCard;
    employee.documents.tenthMarksheet = await uploadFileFromRequest(files, 'tenthMarksheet') || employee.documents.tenthMarksheet;
    employee.documents.twelfthMarksheet = await uploadFileFromRequest(files, 'twelfthMarksheet') || employee.documents.twelfthMarksheet;
    employee.documents.graduationMarksheet = await uploadFileFromRequest(files, 'graduationMarksheet') || employee.documents.graduationMarksheet;
    employee.documents.workExperience = await uploadFileFromRequest(files, 'workExperience') || employee.documents.workExperience;
    employee.documents.other = {
      name: otherDocumentName || employee.documents.other.name,
      fileUrl: await uploadFileFromRequest(files, 'otherDocument') || employee.documents.other.fileUrl,
    };

    employee.bankDetails = {
      accountNumber: accountNumber || employee.bankDetails.accountNumber,
      ifscCode: ifscCode || employee.bankDetails.ifscCode,
      bankName: bankName || employee.bankDetails.bankName,
      passbookImage: await uploadFileFromRequest(files, 'passbookImage') || employee.bankDetails.passbookImage,
    };

    const updated = await employee.save();
    res.status(200).json({ message: 'Employee updated successfully', employee: updated });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update employee', error: err.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const deleted = await Employee.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete employee', error: err.message });
  }
};




// const Employee = require("../models/employee");
// const uploadSingleImageOnCloudinary = require("../config/cloudinary");

// //  Helper to validate file type and upload
// const uploadFileFromRequest = async (files, fieldName) => {
//   if (files?.[fieldName]?.[0]?.path) {
//     const result = await uploadSingleImageOnCloudinary(
//       files[fieldName][0].path
//     );
//     return {
//       fileUrl: result?.url || "",
//       data: result || {},
//     };
//   }
//   return null;
// };

// //  CREATE Employee
// exports.createEmployee = async (req, res) => {
//   try {
//     const {
//       firstName,
//       lastName,
//       email,
//       phoneNumber,
//       department,
//       designation,
//       joiningDate,
//       salaryCTC,
//       baseSalary,
//       address,
//       otherDocumentName,
//       accountNumber,
//       ifscCode,
//       bankName,
//     } = req.body;

//     const files = req.files;
//     console.log(files);

//     const newEmployee = new Employee({
//       firstName,
//       lastName,
//       email,
//       phoneNumber,
//       department,
//       designation,
//       joiningDate,
//       salaryCTC,
//       baseSalary,
//       address,
//       documents: {
//         aadharCard: await uploadFileFromRequest(files, "aadharCard"),
//         panCard: await uploadFileFromRequest(files, "panCard"),
//         tenthMarksheet: await uploadFileFromRequest(files, "tenthMarksheet"),
//         twelfthMarksheet: await uploadFileFromRequest(
//           files,
//           "twelfthMarksheet"
//         ),
//         graduationMarksheet: await uploadFileFromRequest(
//           files,
//           "graduationMarksheet"
//         ),
//         workExperience: await uploadFileFromRequest(files, "workExperience"),
//         other: {
//           name: otherDocumentName || "",
//           ...((await uploadFileFromRequest(files, "otherDocument")) || {}),
//         },
//       },
//       bankDetails: {
//         accountNumber,
//         ifscCode,
//         bankName,
//         passbookImage:
//           (await uploadFileFromRequest(files, "passbookImage"))?.fileUrl || "",
//       },
//     });

//     const saved = await newEmployee.save();
//     res
//       .status(201)
//       .json({ message: "Employee created successfully", employee: saved });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Failed to create employee", error: err.message });
//   }
// };

// exports.getAllEmployees = async (req, res) => {
//   try {
//     const employees = await Employee.find().sort({ createdAt: -1 });
//     res.status(200).json(employees);
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Failed to fetch employees", error: err.message });
//   }
// };

// exports.getEmployeeById = async (req, res) => {
//   try {
//     const employee = await Employee.findById(req.params.id);
//     if (!employee)
//       return res.status(404).json({ message: "Employee not found" });
//     res.status(200).json(employee);
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Error fetching employee", error: err.message });
//   }
// };

// exports.updateEmployee = async (req, res) => {
//   try {
//     const employee = await Employee.findById(req.params.id);
//     if (!employee)
//       return res.status(404).json({ message: "Employee not found" });

//     const {
//       firstName,
//       lastName,
//       email,
//       phoneNumber,
//       department,
//       designation,
//       joiningDate,
//       salaryCTC,
//       baseSalary,
//       address,
//       otherDocumentName,
//       accountNumber,
//       ifscCode,
//       bankName,
//     } = req.body;

//     const files = req.files;

//     employee.firstName = firstName || employee.firstName;
//     employee.lastName = lastName || employee.lastName;
//     employee.email = email || employee.email;
//     employee.phoneNumber = phoneNumber || employee.phoneNumber;
//     employee.department = department || employee.department;
//     employee.designation = designation || employee.designation;
//     employee.joiningDate = joiningDate || employee.joiningDate;
//     employee.salaryCTC = salaryCTC || employee.salaryCTC;
//     employee.baseSalary = baseSalary || employee.baseSalary;
//     employee.address = address || employee.address;

//     const updateDoc = async (field) => {
//       const uploaded = await uploadFileFromRequest(files, field);
//       if (uploaded) employee.documents[field] = uploaded;
//     };

//     await updateDoc("aadharCard");
//     await updateDoc("panCard");
//     await updateDoc("tenthMarksheet");
//     await updateDoc("twelfthMarksheet");
//     await updateDoc("graduationMarksheet");
//     await updateDoc("workExperience");

//     //  Other document
//     const otherDoc = await uploadFileFromRequest(files, "otherDocument");
//     if (otherDoc) {
//       employee.documents.other = {
//         name: otherDocumentName || employee.documents.other?.name || "",
//         ...otherDoc,
//       };
//     }

//     //  Passbook Image
//     const passbook = await uploadFileFromRequest(files, "passbookImage");
//     if (passbook) {
//       employee.bankDetails.passbookImage = {
//         fileUrl: passbook.fileUrl,
//         data: passbook.data,
//       };
//     }

//     //  Bank Info
//     employee.bankDetails.accountNumber =
//       accountNumber || employee.bankDetails.accountNumber;
//     employee.bankDetails.ifscCode = ifscCode || employee.bankDetails.ifscCode;
//     employee.bankDetails.bankName = bankName || employee.bankDetails.bankName;

//     const updated = await employee.save();
//     res
//       .status(200)
//       .json({ message: "Employee updated successfully", employee: updated });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Failed to update employee", error: err.message });
//   }
// };

// // DELETE Employee
// exports.deleteEmployee = async (req, res) => {
//   try {
//     const deleted = await Employee.findByIdAndDelete(req.params.id);
//     if (!deleted)
//       return res.status(404).json({ message: "Employee not found" });
//     res.status(200).json({ message: "Employee deleted successfully" });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Failed to delete employee", error: err.message });
//   }
// };
