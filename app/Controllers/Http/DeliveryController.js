"use strict";

const Delivery = use("App/Models/Delivery");
class DeliveryController {
  async index() {
    const deliveries = Delivery.query()
      .with("user")
      .orderBy("created_at", "desc")
      .fetch();
    return deliveries;
  }

  async indexByUser({ auth }) {
    const userLogged = auth.user;
    const deliveries = Delivery.query()
      .where("user_id", userLogged.id)
      .with("user")
      .orderBy("created_at", "asc")
      .fetch();
    return deliveries;
  }

  async store({ request, response }) {
    const data = request.only([
      "user_id",
      "client_name",
      "phone",
      "address",
      "city",
      "state",
      "cep",
    ]);
    const delivery = await Delivery.create({
      ...data,
      status: true,
    });
    return delivery;
  }

  async update({ params, request }) {
    const delivery = await Delivery.query()
      .where("id", params.id)
      .firstOrFail();
    const data = request.only([
      "user_id",
      "client_name",
      "phone",
      "address",
      "city",
      "state",
      "cep",
      "status",
    ]);

    delivery.merge(data);
    await delivery.save();
    return delivery;
  }

  async destroy({ params }) {
    const delivery = await Delivery.query()
      .where("id", params.id)
      .firstOrFail();
    await delivery.delete();
  }
}

module.exports = DeliveryController;
