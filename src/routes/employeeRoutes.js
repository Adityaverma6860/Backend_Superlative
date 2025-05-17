const express = require("express");
const upload = require("../middleware/multer");
const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require("../controller/employeeController");

const router = express.Router();

const uploadFields = upload.fields([
  { name: "aadharCard", maxCount: 1 },
  { name: "panCard", maxCount: 1 },
  { name: "tenthMarksheet", maxCount: 1 },
  { name: "twelfthMarksheet", maxCount: 1 },
  { name: "graduationMarksheet", maxCount: 1 },
  { name: "workExperience", maxCount: 1 },
  { name: "otherDocument", maxCount: 1 },
  { name: "passbookImage", maxCount: 1 },
]);

router.post("/", uploadFields, createEmployee);
router.get("/", getAllEmployees);
router.get("/:id", getEmployeeById);
router.put("/:id", uploadFields, updateEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router;



// const express = require("express");
// const upload = require("../middleware/multer");
// const {
//   createEmployee,
//   getAllEmployees,
//   getEmployeeById,
//   updateEmployee,
//   deleteEmployee,
// } = require("../controller/employeeController");

// const router = express.Router();

// // Define expected upload fields
// const uploadFields = upload.fields([
//   { name: "aadharCard", maxCount: 1 },
//   { name: "panCard", maxCount: 1 },
//   { name: "tenthMarksheet", maxCount: 1 },
//   { name: "twelfthMarksheet", maxCount: 1 },
//   { name: "graduationMarksheet", maxCount: 1 },
//   { name: "workExperience", maxCount: 1 },
//   { name: "otherDocument", maxCount: 1 },
//   { name: "passbookImage", maxCount: 1 },
// ]);

// // Routes
// router.post("/", uploadFields, createEmployee);
// router.get("/", getAllEmployees);
// router.get("/:id", getEmployeeById);

// // ⚠️ Only include file upload on PUT if you allow updating files
// router.put("/:id", uploadFields, updateEmployee);

// router.delete("/:id", deleteEmployee);

// module.exports = router;

