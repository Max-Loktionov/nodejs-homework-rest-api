const { v4 } = require("uuid");
const listContacts = require("./listContacts");
const contactsPath = require("./contactsPath");
const fs = require("fs").promises;

async function addContact({ name, email, phone }) {
  try {
    const data = { name, email, phone };
    const contacts = await listContacts();
    const newContact = { id: v4(), ...data };

    await fs.writeFile(
      contactsPath,
      JSON.stringify([newContact, ...contacts], null, "\t")
    );
    return newContact;
  } catch (error) {
    console.log(error);
  }
}
module.exports = addContact;
