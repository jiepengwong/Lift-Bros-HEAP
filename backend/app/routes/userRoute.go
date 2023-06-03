package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/jiepengwong/Lift-Bros-HEAP/app/services"
)

func SetupUserRoutes(app *fiber.App) {
	user := app.Group("/user")
	user.Get("/:username", services.GetUser)
	user.Get("/", services.GetUsers)
	user.Post("/", services.CreateUser)
	user.Put("/:username", services.UpdateUser)
	user.Delete("/:username", services.DeleteUser)
}
