## GoIT Node.js Course Homework

This is an educational project from the course Node.js for GoIT-school.

A web-app is created with Node.js application using MVC. The next modules are created:

**Server** : contains main app file with base configurations - contains configuration of PORT and connection to DB;

**Models**: contains models of DB entities in MongoDB - contact, includes contactSchema and joiSchema (validation schemes for validate the data from front);

**Controllers**: functions of interaction with the DB entities (CRUD);

**Routes**: build REST API architecture using CRUD-methods;

### Commands:

---

```bash
npm start
```

- start the server in mode production;

```bash
npm run start:dev
```

- start the server in mode development;

```bash
npm run lint
```

- run code validation from eslint. It is necessary to perform before each PR and correct all errors of the linter;

```bash
npm lint:fix
```

- run code validation from eslint, but with automatic fixes of simple errors.

### Branches:

---

- 'main' -- it contains last version of app;

- 'hw-02-express' -- use file contacts.json for storage data and express for run server;

- '03-mongodb' -- contains configuration for connection to mongoDB, use mongoose for CRUD operations;

- '04-auth' -- add authentication, authorization for users, you can use pagination for contacts;

### API:

---

**Use api on routes: /api/contacts **

- get/api/contacts
- get/api/contacts/contactId
- put/api/contacts/contactId/favorite

  **Use api on routes: /api/users **

- post/api/users/register
- post/api/users/login
- post/api/users/logout
- get/api/users/current

some action with data:

| action             |  method mongoose  | route                                 |     |
| ------------------ | :---------------: | ------------------------------------- | --: |
| getAll             |       find        | /api/contacts                         |  00 |
| getById            |     findById      | /api/contacts/contactId               |  01 |
| add                |      create       | /api/contacts                         |  02 |
| updateById         | findByIdAndUpdate | /api/contacts/contactId               |  03 |
| updateFavoriteById | findByIdAndUpdate | patch/api/contacts/contactId/favorite |  04 |
| removeById         | findByIdAndDelete | delete/api/contacts/contactId         |  05 |
|                    |                   |                                       |     |
| register           |       save        | post/api/users/register               |  06 |
| login              | findByIdAndUpdate | post/api/users/login                  |  07 |
| logout             |                   | post/api/users/logout                 |     |
| current            |                   | get/api/users/current                 |  08 |

| route                 | response                                                                                                                |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| patch/api/users       | status:200; body={ "status": "success","code": "200","data": { "email": "max2@company.com","subscription": "business"}} |
| get/api/users/current | status:200; body={"status":"success","code":"200","data":{"email":"max2@company.com","subscription":"business"}}        |

|post/api/users/logout | status:204; empty body |
|post/api/users/register | status:201; body = {"status":"success","code":201,"user":{"email":"max7@company.com","subscription":"starter"}} |
| |{"status":"success","code":200,"response":{"token":"x...x","user":{"email":"user@user.com","subscription":""}}} |
