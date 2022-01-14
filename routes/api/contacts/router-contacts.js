import { Router } from 'express';
import {
  validateCreate,
  validateId,
  validateUpdate,
  validateUpdateFavorite,
  validateQuery
} from './validation-contact';
import {
  getAddContact,
  getContactById,
  getContacts,
  getRemoveContact,
  getUpdateContact
} from '../../../controllers/contacts/controllers-index';
import guard from '../../../middlewares/guard';


const router = new Router();

router.get('/', [guard, validateQuery], getContacts);

router.get('/:id', [guard, validateId], getContactById);

router.post('/', [guard, validateCreate], getAddContact);

router.delete('/:id', [guard, validateId], getRemoveContact);

router.put('/:id', [guard, validateId, validateUpdate], getUpdateContact);

router.patch(
  '/:id/favorite',
  [guard, validateId, validateUpdateFavorite],
  getUpdateContact
);

export default router;
