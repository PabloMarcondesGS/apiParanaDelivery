"use strict";

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

const User = use("App/Models/User");
class DatabaseSeeder {
  async run() {
    await User.create({
      name: "Rodrigo",
      email: "rodrigoaraujo990@gmail.com",
      password: "108094ro",
      status: true,
      level: "admin",
    });
  }
}

module.exports = DatabaseSeeder;
