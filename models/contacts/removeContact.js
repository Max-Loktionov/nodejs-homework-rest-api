const listContacts = require("./listContacts");
const updateList = require("./updateList");

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex((contact) => contact.id === contactId);
    if (idx === -1) {
      return null;
    }
    const [deletedContact] = contacts.splice(idx, 1);
    updateList(contacts);
    return deletedContact;
  } catch (error) {
    console.log(error);
  }
}

module.exports = removeContact;
