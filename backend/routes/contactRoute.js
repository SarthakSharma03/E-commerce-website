import { Router } from 'express'
import { asyncMiddlewareWrapper, asyncWrapper } from '../middleware/asyncWrapper.js'
import auth from '../middleware/auth.js'
import isAdmin from '../middleware/isAdmin.js'
import validateBody from '../middleware/validateBody.js'
import { contactSchema } from '../validation/contactValidation.js'
import { createContact, getContacts, updateContactStatus } from '../controllers/contactController.js'

const router = Router()
router.post('/', asyncMiddlewareWrapper(auth), validateBody(contactSchema), asyncWrapper(createContact))
router.get('/', asyncMiddlewareWrapper(auth), isAdmin, asyncWrapper(getContacts))
router.put('/:id/status', asyncMiddlewareWrapper(auth), isAdmin, asyncWrapper(updateContactStatus))


export default router
