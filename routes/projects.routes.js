const express = require('express')
const { check } = require('express-validator')

const draftCrtl = require('../controllers/projects.controller')
const token = require('../middlewares/token')

const router = express.Router()

// ==============================================
//  Create draft
// ==============================================
router.post('/',
  [token],
  [check('name', 'El nombre es obligatorio').not().isEmpty()],
draftCrtl.postDraft)

// ==============================================
//  Get projects
// ==============================================
router.get('/', [token], draftCrtl.getProjects)

// ==============================================
//  Update draft
// ==============================================
router.put('/:id',
  [token],
  [check('name', 'El nombre es obligatorio').not().isEmpty()],
draftCrtl.updateDraft)

// ==============================================
//  Delete draft
// ==============================================
router.delete('/:id', [token], draftCrtl.deleteDraft)

module.exports = router
