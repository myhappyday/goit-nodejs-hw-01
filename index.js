const contacts = require('./contacts');
const { Command } = require('commander');
const program = new Command();

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const allContacts = await contacts.getListContacts();
      return console.table(allContacts);
    case 'get':
      const oneContact = await contacts.getContactById(id);
      return console.log(oneContact);
    case 'add':
      const newContact = await contacts.addContact({ name, email, phone });
      return console.log(newContact);
    case 'update':
      const updateContact = await contacts.updateContactById(id, {
        name,
        email,
        phone,
      });
      return console.log(updateContact);
    case 'remove':
      const removeContact = await contacts.removeContactById(id);
      return console.log(removeContact);
    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

invokeAction(argv);
