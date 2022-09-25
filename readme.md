## GoIT Node.js Course Homework

This is an educational project from the course Node.js for GoIT-school.

A web-app is created with Node.js application using MVC. The next modules are created:

**Server** : contains main app file with base configurations - contains configuration of PORT and connection to DB;

**Models**: contains models of DB entities in MongoDB - contact, includes contactSchema and joiSchema (validation schemes for validate the data from front);

**Controllers**: functions of interaction with the DB entities (CRUD);

**Routes**: build REST API architecture using POST methods;

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

- '03-mongodb' -- contains configuration for connection to mongoDB, use mongoose for CRUD operations.

### API:

---

some action with data
| action | method mongoose | |
| ------------- |:------------------:| -----:|
| getAll | find | 00 |
| getById | findById | 01 |
| add | create | 02 |
| updateById | findByIdAndUpdate | 03 |
| updateFavoriteById | findByIdAndUpdate | 04 |
| removeById | findByIdAndDelete | 05 |
