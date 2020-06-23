const express = require('express')
const { check } = require('express-validator')

const draftCrtl = require('../controllers/projects.controller')
const token = require('../middlewares/token')

const router = express.Router()

router.post('/',
  [token],
  [check('name', 'El nombre es obligatorio').not().isEmpty()],
draftCrtl.postDraft)

router.get('/', [token], draftCrtl.getProjects)

router.put('/:id',
  [token],
  [check('name', 'El nombre es obligatorio').not().isEmpty()],
draftCrtl.updateDraft)

router.delete('/:id', [token], draftCrtl.deleteDraft)

module.exports = router
