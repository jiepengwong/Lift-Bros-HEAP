package app

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/jiepengwong/Lift-Bros-HEAP/app/config"
	"github.com/jiepengwong/Lift-Bros-HEAP/app/routes"
)

func Start() {
	app := fiber.New()

	// Init database
	config.InitDatabase()
	defer config.CloseDB()

	// Provide a Firebase config
    config.ConfigureFirebase(app)

	// Register routes
	routes.SetupUserRoutes(app)
	fmt.Println("Server is running on port 8080")
	app.Listen(":8080")
}
