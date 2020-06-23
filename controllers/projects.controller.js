const { validationResult } = require('express-validator')

const Draft = require('../models/Draft.model')

exports.postDraft = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.array()
    })
  }

  try {
    const draft = new Draft(req.body)

    draft.creator = req.user.id

    await draft.save()
    return res.status(201).json({
      ok: true,
      msg: `Proyecto creado - ${req.body.name}`
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      ok: false,
      msg: 'Hubo un error en la creacion del proyecto'
    })
  }
}

exports.getProjects = async (req, res) => {
  try {
    const projects = await Draft.find({ creator: req.user.id }).sort({ created_at: -1 })

    return res.status(200).json({
      ok: true,
      projects
    })
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: 'Hubo un error en la obtención de los proyectos'
    })
  }
}

exports.updateDraft = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.array()
    })
  }

  const { name } = req.body
  const newDraft = {}

  if (name) newDraft.name = name

  try {
    let draft = await Draft.findById(req.params.id)

    if (!draft) {
      return res.status(404).json({
        ok: false,
        msg: 'Proyecto no encontrado'
      })
    }

    if (draft.creator.toString() !== req.user.id) {
      return res.status(401).json({
        ok: false,
        msg: 'No autorizado'
      })
    }

    draft = await Draft.findByIdAndUpdate({ _id: req.params.id }, { $set: newDraft }, { new: true })

    return res.status(200).json({
      ok: true,
      draft
    })
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: 'Hubo un error en la actualización del proyecto'
    })
  }
}

exports.deleteDraft = async (req, res) => {
  try {
    let draft = await Draft.findById(req.params.id)

    if (draft.creator.toString() !== req.user.id) {
      return res.status(401).json({
        ok: false,
        msg: 'No autorizado'
      })
    }

    await Draft.findByIdAndDelete({ _id: req.params.id })
    return res.status(200).json({
      ok: true,
      msg: 'Proyecto eliminado'
    })
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: 'Hubo un error en la eliminación del proyecto'
    })
  }
}
