const contacts = require("./contacts");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
console.log("argv: ", argv);

// const { program } = require("commander");
// const nodemon = require("nodemon");
// console.log("contacts: ", contacts);
// const { Command } = require("commander");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.getListContacts();
      return console.table(allContacts);
    case "get":
      const oneContact = await contacts.getContactById(id);
      return console.log(oneContact);
    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      return console.log(newContact);
    case "update":
      const updateContact = await contacts.updateContactById(id, {
        name,
        email,
        phone,
      });
      return console.log(updateContact);
    case "remove":
      const removeContact = await contacts.removeContactById(id);
      return console.log(removeContact);
    default:
      console.warn("\x1B[31m Unknown action type!");
    //   return console.log("Unknown action type!");
  }
};

invokeAction(argv);

// program
//   .option("-a, --action, <type>")
//   .option("-i, --id, <type>")
//   .option("-n, --name, <type>")
//   .option("-e, --email, <type>")
//   .option("-p, --phone, <type>");

// program.parse();

// const options = program.opts();
// console.log("options: ", options);
// invokeAction(options);

// const actionIndex = process.argv.indexOf("--action");
// if (actionIndex !== -1) {
//   const action = process.argv[actionIndex + 1];
//   //   console.log("action: ", action);
//   invokeAction({ action });
// }

// invokeAction({ action });
