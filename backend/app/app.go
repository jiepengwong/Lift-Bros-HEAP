package app

import (
	"github.com/gofiber/fiber/v2"
	"github.com/jiepengwong/Lift-Bros-HEAP/app/config"
	"github.com/jiepengwong/Lift-Bros-HEAP/app/routes"
)

func Start() {
	app := fiber.New()

	// Init database
	config.InitDatabase()
	defer config.CloseDB()

	// Register routes
	routes.SetupUserRoutes(app)

	app.Listen(":8080")
}
