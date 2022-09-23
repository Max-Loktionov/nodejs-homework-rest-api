const { v4 } = require("uuid");
const listContacts = require("./listContacts");
const updateList = require("./updateList");

async function addContact({ name, email, phone }) {
  try {
    const data = { name, email, phone };
    const contacts = await listContacts();
    const newContact = { id: v4(), ...data };
    updateList([newContact, ...contacts]);
    return newContact;
  } catch (error) {
    console.log(error);
  }
}
module.exports = addContact;
