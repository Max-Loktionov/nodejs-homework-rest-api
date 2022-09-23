const listContacts = require("./listContacts");
const updateList = require("./updateList");

async function updateContactById(id, { name, email, phone }) {
  try {
    const data = { name, email, phone };
    const contacts = await listContacts();
    const idx = contacts.findIndex((contact) => contact.id === id);
    if (idx === -1) {
      return null;
    }
    contacts[idx] = { id, ...data };
    await updateList(contacts);
    return contacts[idx];
  } catch (error) {
    console.log(error);
  }
}

module.exports = updateContactById;
