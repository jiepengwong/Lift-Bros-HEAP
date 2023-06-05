package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/jiepengwong/Lift-Bros-HEAP/app/config"
	"github.com/jiepengwong/Lift-Bros-HEAP/app/services"
)

func SetupUserRoutes(app *fiber.App) {
	authorisedUser := app.Group("/user", config.AuthMiddleware())
	authorisedUser.Get("/:username", services.GetUser)
	authorisedUser.Get("/", services.GetUsers)
	authorisedUser.Put("/:username", services.UpdateUser)
	authorisedUser.Delete("/:username", services.DeleteUser)
	authorisedUser.Post("/logout", services.Logout)
	app.Post("/login", services.Login)
	app.Post("/newUser", services.CreateUser)
}
