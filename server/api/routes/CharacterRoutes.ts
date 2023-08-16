import express from "express"
import * as characterController from "./../controllers/CharacterController"

const router = express.Router()

router.route('/')
    .post(characterController.createCharacter)
    .get(characterController.getCharacters)

router.route('/:id')
    .put(characterController.updateCharacter)
    .delete(characterController.deleteCharacter)
    .get(characterController.getCharacter)

export = router