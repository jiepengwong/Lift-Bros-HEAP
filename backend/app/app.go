package app

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/jiepengwong/Lift-Bros-HEAP/app/config"
	"github.com/jiepengwong/Lift-Bros-HEAP/app/controllers"
	"github.com/joho/godotenv"
)

func Start() {
	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:3000, http://127.0.0.1:3000, https://liftbro.netlify.app/",
		AllowCredentials: true,
	}))

	// Load .env file
	if err := godotenv.Load(".env"); err != nil {
		panic("Error loading .env file")
	}

	// Init database
	config.InitDatabase()
	defer config.CloseDB()

	// Register routes
	controllers.SetupRoutes(app)

	app.Listen(":8080")
}
