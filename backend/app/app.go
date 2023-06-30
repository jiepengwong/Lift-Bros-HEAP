package app

import (
	"github.com/gofiber/fiber/v2"
	"github.com/jiepengwong/Lift-Bros-HEAP/app/config"
	"github.com/jiepengwong/Lift-Bros-HEAP/app/controllers"
	"github.com/joho/godotenv"
)

func Start() {
	app := fiber.New()

	// Init database
	config.InitDatabase()
	defer config.CloseDB()

	// Register routes
	controllers.SetupRoutes(app)

	// Load .env file
	if err := godotenv.Load(".env"); err != nil {
		panic("Error loading .env file")
	}

	app.Listen(":8080")
}
