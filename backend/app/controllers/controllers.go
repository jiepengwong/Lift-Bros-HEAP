package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/jiepengwong/Lift-Bros-HEAP/app/config"
	"github.com/jiepengwong/Lift-Bros-HEAP/app/services"
)

func SetupRoutes(app *fiber.App) {
	setupUserRoutes(app)
	setupExerciseRoutes(app)
}

func setupUserRoutes(app *fiber.App) {
	authorisedUser := app.Group("/user", config.AuthMiddleware())
	authorisedUser.Get("/:username", services.GetUser)
	authorisedUser.Get("/", services.GetUsers)
	authorisedUser.Put("/:username", services.UpdateUser)
	authorisedUser.Delete("/:username", services.DeleteUser)
	authorisedUser.Post("/logout", services.Logout)
	app.Post("/login", services.Login)
	app.Post("/newUser", services.CreateUser)
}

func setupExerciseRoutes(app *fiber.App) {
	exercise := app.Group("/exercise", config.AuthMiddleware())
	exercise.Post("/new", services.CreateExercise)
	exercise.Get("/:name", services.GetExercise)
	exercise.Get("/", services.GetExercises)
	exercise.Put("/:name", services.UpdateExercise)
	exercise.Delete("/:name", services.DeleteExercise)
}
