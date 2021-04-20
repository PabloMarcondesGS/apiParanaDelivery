"use strict";

const Route = use("Route");
Route.post("sessions", "SessionController.store");
Route.post("recover", "RecoverController.store");

Route.group(() => {
  Route.post("users", "UserController.store");
  Route.get("users-motoboy", "UserController.indexMotoboy");
  Route.get("users", "UserController.index");
  Route.put("users/:id", "UserController.update");
  Route.delete("users/:id", "UserController.destroy");

  Route.post("deliveries", "DeliveryController.store");
  Route.get("deliveries-user", "DeliveryController.indexByUser");
  Route.get("deliveries", "DeliveryController.index");
  Route.put("deliveries/:id", "DeliveryController.update");
  Route.delete("deliveries/:id", "DeliveryController.destroy");
}).middleware("auth");
