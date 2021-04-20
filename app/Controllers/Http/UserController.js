"use strict";
const User = use("App/Models/User");

class UserController {
  async index({ request }) {
    const data = request.only(["name"]);
    if (data.name) {
      const users = User.query()
        .where("name", "like", `%${data.name}%`)
        .with("deliveries")
        .orderBy("name", "desc")
        .fetch();
      return users;
    }
    const users = User.query()
      .with("deliveries")
      .orderBy("name", "desc")
      .fetch();

    return users;
  }

  async indexMotoboy() {
    const users = User.query()
      .where("level", "motoboy")
      .orderBy("name", "desc")
      .fetch();

    return users;
  }

  async store({ request, response }) {
    const data = request.only(["name", "email", "password", "phone", "level"]);
    const userData = await User.query().where("email", data.email).first();
    if (userData) {
      return response.status(400).send({
        error: {
          message: "O email já está cadastrado em outra conta.",
        },
      });
    }
    const user = await User.create({ ...data, status: true });
    return user;
  }

  async update({ params, request }) {
    const user = await User.query().where("id", params.id).firstOrFail();
    const data = request.only([
      "name",
      "email",
      "password",
      "phone",
      "level",
      "device_token",
      "status",
    ]);
    if (!data.password) {
      delete data.password;
    }
    user.merge(data);
    await user.save();
    return user;
  }

  async show({ params }) {
    const user = await User.query()
      .with("deliveries", (queryBuilder) =>
        queryBuilder.orderBy("created_at", "asc")
      )
      .where("id", params.id)
      .firstOrFail();

    return user;
  }

  async destroy({ params }) {
    const user = await User.query().where("id", params.id).firstOrFail();
    await user.delete();
  }
}

module.exports = UserController;
