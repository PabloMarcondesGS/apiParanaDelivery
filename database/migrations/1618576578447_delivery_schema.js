"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class DeliverySchema extends Schema {
  up() {
    this.create("deliveries", (table) => {
      table.increments();
      table.integer("user_id").unsigned().references("id").inTable("users");
      table.string("client_name", 254);
      table.string("phone", 254);
      table.string("address", 254);
      table.string("city", 254);
      table.string("state", 254);
      table.string("cep", 254);
      table.bool("status");
      table.timestamps();
    });
  }

  down() {
    this.drop("deliveries");
  }
}

module.exports = DeliverySchema;
