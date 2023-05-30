package app

import (
	"github.com/gofiber/fiber/v2"
	"github.com/jiepengwong/Lift-Bros-HEAP/app/routes"
	"github.com/jiepengwong/Lift-Bros-HEAP/app/database"
)

func Start() {
	app := fiber.New()

	// Init database
	database.InitDatabase()
	defer database.CloseDB()

	// Register routes
	routes.SetupUserRoutes(app)

	app.Listen(":8080")
}
