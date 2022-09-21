const fs = require("fs/promises");

const listContacts = require("./listContacts");
const contactsPath = require("./contactsPath");

async function updateContactById(id, { name, email, phone }) {
  try {
    const data = { name, email, phone };
    const contacts = await listContacts();
    const idx = contacts.findIndex((contact) => contact.id === id);
    if (idx === -1) {
      return null;
    }
    contacts[idx] = { id, ...data };
    await fs.writeFile(contactsPath, JSON.stringify(contacts), null, "\t");
    return contacts[idx];
  } catch (error) {
    console.log(error);
  }
}

module.exports = updateContactById;
