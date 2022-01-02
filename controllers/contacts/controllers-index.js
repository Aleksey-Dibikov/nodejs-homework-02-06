import repositoryContacts from '../../repository/repository-contacts'
import { HttpCode, ERROR } from '../../libs/constants';

const getContacts = async (req, res, next) => {
  const { id: userId } = req.user;
  const contacts = await repositoryContacts.listContacts(userId, req.query);
  res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: { ...contacts }
  })
};

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const contact = await repositoryContacts.getContactById(userId, id);
  contact ?
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { contact }
    }) :
    res.status(HttpCode.NOT_FOUND).json(ERROR);
};

const getAddContact = async (req, res, next) => {
  const { id: userId } = req.user;
  const newContact = await repositoryContacts.addContact(userId, req.body);
  res.status(HttpCode.CREATED).json({
    status: 'success',
      code: HttpCode.CREATED,
      data: { contact: newContact }
  });
};

const getRemoveContact = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const contact = await repositoryContacts.removeContact(userId, id)
  contact ?
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { contact }
    }) :
    res.status(HttpCode.NOT_FOUND).json(ERROR);
};

const getUpdateContact = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const contact = await repositoryContacts.updateContact(userId, id, req.body);
  contact ?
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { contact }
    }) :
    res.status(HttpCode.NOT_FOUND).json(ERROR);
};

export {
    getContacts,
    getContactById,
    getAddContact,
    getRemoveContact,
    getUpdateContact,
}
