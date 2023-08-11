package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/jiepengwong/Lift-Bros-HEAP/app/config"
	"github.com/jiepengwong/Lift-Bros-HEAP/app/services"
)

func setupTestingRoutes(app *fiber.App) {
	app.Get("/ping", func(c *fiber.Ctx) error {
		return c.SendString("Pong! The server is up and running.")
	})
}

func SetupRoutes(app *fiber.App) {
	setupUserRoutes(app)
	setupExerciseRoutes(app)
	setupRoutineRoutes(app)
	setupCompletedRoutineRoutes(app)
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

func setupRoutineRoutes(app *fiber.App) {
	routine := app.Group("/routine", config.AuthMiddleware())
	routine.Post("/new", services.CreateRoutine)
	routine.Get("/templates", services.GetRoutineByTemplate)
	routine.Get("/find", services.GetRoutine)
	routine.Get("/user/:username", services.GetRoutineBySpecificUser)
	routine.Get("/", services.GetRoutines)
	routine.Put("/", services.UpdateRoutine)
	routine.Delete("/", services.DeleteRoutine)
}

func setupCompletedRoutineRoutes(app *fiber.App) {
	completedRoutine := app.Group("/completedRoutine", config.AuthMiddleware())
	completedRoutine.Post("/new", services.CreateCompletedRoutine)
	completedRoutine.Get("/pastWeek", services.GetCompletedRoutinesPastWeek)
	completedRoutine.Get("/user/:username", services.GetCompletedRoutineByUser)
	completedRoutine.Get("/recent", services.GetMostRecentCompletedRoutineByName)
	completedRoutine.Get("/:id", services.GetCompletedRoutine)
	completedRoutine.Get("/", services.GetCompletedRoutines)
	completedRoutine.Put("/:id", services.UpdateCompletedRoutine)
	completedRoutine.Delete("/:id", services.DeleteCompletedRoutine)
}
