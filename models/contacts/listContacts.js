const fs = require("fs").promises;
const contactsPath = require("./contactsPath");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

module.exports = listContacts;
