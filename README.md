It is a role based access control admin panel.
**If there is a application error after logging in then please referesh once.**
**The project was made in rush, so please consider the above request.**
This project is build using **NextJs** and **Typescript**.
For design **Bootstrap** is used.

To run this project visit **https://vrvassigment-production.up.railway.app**

Create a account then login using the same credentails.
**Admins** can create a new user but **can not delete or update.**
**SuperAdmins can delete and update**

It has a **Dark theme**.

_to run this project on localmachine first download xampp and migrate the schema into your xampp database_
_then follow these commands_

1. **npm install**
2. **npx prisma generate**
3. _change the **NEXTAUTH_URL** to **http://localhost:3000**_
4. **npm run dev**

and boom you are ready to go.....
