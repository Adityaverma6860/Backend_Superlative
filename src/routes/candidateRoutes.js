const express = require('express');
const {
  createCandidate,
  getAllCandidates,
  getCandidateById,
  updateCandidate,
  deleteCandidate,
  searchCandidates,
} = require('../controller/candidateController');
const { jwtAuthMiddleware} = require('../middleware/jwt');

const router = express.Router();
router.use(jwtAuthMiddleware);

router.post('/', createCandidate);
router.get('/', jwtAuthMiddleware, getAllCandidates);
router.get('/search', searchCandidates);
router.get('/:id', getCandidateById);
router.put('/:id', updateCandidate);
router.delete('/:id', deleteCandidate);

module.exports = router;
