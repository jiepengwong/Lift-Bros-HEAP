package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/jiepengwong/Lift-Bros-HEAP/app/services"
)

func SetupUserRoutes(app *fiber.App) {
	user := app.Group("/user")
	user.Get("/:username", models.GetUser)
	user.Get("/", models.GetUsers)
	user.Post("/", models.CreateUser)
	user.Put("/:username", models.UpdateUser)
	user.Delete("/:username", models.DeleteUser)
}
