# The Juice Box

## Developing

To run this application locally for development, you'll need to:

1. `git clone` this repo
2. `cd` into the local repo
3. `cd` into the `backend` folder and `npm install`
4. Create your own `.env` file in the `backend` based on the `.env.example` there
5. Create a user that matches the only you identified in your `.env` file in PostgreSQL
6. Run `npx dotenv sequelize db:create` to create the database
    * If the `sequelize` module is not found, try running `npx dotenv sequelize-cli db:create` and replace `sequelize` with `sequelize-cli` for the rest of these commands
7. Run `npx dotenv sequelize db:migrate` to run the migrations
8. Run `npx dotenv sequelize db:seed:all` to seed the database
9. Open another terminal and `cd` into the `frontend` directory and `npm install` there
10. Run `npm start` in your `backend` and then another `npm start` in your `frontend`.
11. The React server will open up a browser window with the correct address, and you can begin your work from there.
12. If you are planning on developing, please make a branch for your changes instead of writing directly to master.

## Technologies Used

* PostgreSQL
* Express.js
* Sequelize
* JavaScript
* TailwindCSS
* Bcryptjs
* Express-session
* Express-validator
* Node.js
* AWS S3
* Heroku
* React
* Redux

## Live Site

[Here's](http://thejuicebox.herokuapp.com/) a link to the live app!

## Wiki

[Here's](https://github.com/Lazytangent/TheJuiceBox/wiki) a link to the Documentation!

## Features

Users can:

* View Drinks
* Create Drinks
* Edit their Drinks
* Delete their Drinks
* View Reviews of Drinks
* Create Reviews of Drinks
* Edit their Reviews of Drinks
* Delete their Reviews of Drinks

## Two Challenges

## Code Snippets
