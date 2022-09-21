const fs = require("fs").promises;

const contactsPath = require("./contactsPath");

const updateList = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, "\t"));
};

module.exports = updateList;
