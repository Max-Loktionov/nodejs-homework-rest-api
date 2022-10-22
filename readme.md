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

### Dependencies:

---

| bcryptjs | cors | cross-env | dotenv | express | gravatar | jimp | joi | jsonwebtoken | mongoose | morgan | multer | @sendgrid/mail |
| -------- | ---- | --------- | ------ | ------- | -------- | ---- | --- | ------------ | -------- | ------ | ------ | -------------- |

---

### Branches:

---

- 'main' -- it contains last version of app;
- 'hw-02-express' -- use file contacts.json for storage data and express for run server;
- '03-mongodb' -- contains configuration for connection to mongoDB, use mongoose for CRUD operations;
- '04-auth' -- add authentication, authorization for users, you can use pagination for contacts;
- '05-avatar' -- add avatar image for user;
- '06-email' -- Verification email for register, Dockerfile.

### API:

---

**Use api on routes: /api/contacts**

- get/api/contacts
- get/api/contacts/contactId
- put/api/contacts/contactId/favorite

some action with data:

| action             | method mongoose  | route                                 |     |
| ------------------ | :--------------: | ------------------------------------- | --: |
| getAll             |       find       | /api/contacts                         |  00 |
| getById            |     findOne      | /api/contacts/contactId               |  01 |
| add                |      create      | /api/contacts                         |  02 |
| updateById         | findOneAndUpdate | /api/contacts/contactId               |  03 |
| updateFavoriteById | findOneAndUpdate | patch/api/contacts/contactId/favorite |  04 |
| removeById         |  findOneDelete   | delete/api/contacts/contactId         |  05 |
|                    |                  |                                       |     |
| register           |      create      | post/api/users/register               |  06 |
| login              | findOneAndUpdate | post/api/users/login                  |  07 |

**Use api on routes: /api/users **

- post/api/users/register
- post/api/users/login
- post/api/users/logout
- get/api/users/current
- patch/api/users
- patch/api/users/avatars
- get/api/users/verify/:verificationToken
- post/api/users/verify

| route                                   | response                                                                                                                         | action                                                                                                                                                                                                                |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| patch/api/users                         | status:200; body={ "status": "success","code": "200","data": { "email": "max2@company.com","subscription": "starter"}}           | update the field "subscription                                                                                                                                                                                        |
| get/api/users/current                   | status:200; body={"status":"success","code":"200","data":{"email":"max2@company.com","subscription":"starter"}}                  | get current user                                                                                                                                                                                                      |
| post/api/users/logout                   | status:204; empty body                                                                                                           | remove the authorization                                                                                                                                                                                              |
| post/api/users/register                 | status:201; body = {"status":"success","code":201,"user":{"email":"max7@company.com","subscription":"starter"}}                  | create a new user                                                                                                                                                                                                     |
| post/api/users/login                    | status:200; body={"status":"success","code":200,"response":{"token":"x...x","user":{"email":"user@user.com","subscription":""}}} | send the token for valid user; the token is valid for one day                                                                                                                                                         |
| patch/api/users/avatars                 | status:200; body ={"email": "max2@company.com", "avatarURL": avatars\\6335b75bf66dc38c54cccc36_max2.jpg"}                        | changes user avatar (maxAvatarSize = 9000000; Max avatar value size (in bytes);File format should be jpeg, png, jpg, bmp; Request body has to contain field avatar and attached image; enctype="multipart/form-data") |
| get/api/users/verify/:verificationToken | status:200 body={status: "success", code: 200, response: { message: "Verification successful", }}                                | check if verification token in email is correct, than make email is confirmed                                                                                                                                         |
| post/api/users/verify                   | status:200 body={status: "success", code: 200,response: {message: "Verification email sent"}}                                    | resend verification email for user if it`s needed                                                                                                                                                                     |

- if you need pagination, you have to add two parameters (page=2&limit=2) page=Number (number of page wich could be choosen with amount=limit contacts on each pages), limit=Number [by default
  (GET api/contacts?page=1&limit=20)]

- you can change your user {subscription} at endpoint: PATCH api/users , all you need for this action have valid auth and to choose one of the allowed values ['starter', 'pro', 'business']

- would you like filter your contacts by the field {favorite}? you can do it at (GET api/contacts?favorite=true) if add parameter {favorite=true} or {favorite=false} to the headers
