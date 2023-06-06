package services

import (
	"github.com/gofiber/fiber/v2"
	"github.com/jiepengwong/Lift-Bros-HEAP/app/config"
	"github.com/jiepengwong/Lift-Bros-HEAP/app/models"
	"gorm.io/gorm"
)

// CreateExercise creates a new exercise
func CreateExercise(c *fiber.Ctx) error {
	db := config.GetDB()
	exercise := new(models.Exercise)
	if err := c.BodyParser(exercise); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request payload",
		})
	}

	// TODO: Validation and error handling

	// Save the exercise to the database
	// Assuming you have a 'db' variable of type *gorm.DB
	db.Create(&exercise)

	return c.JSON(exercise)
}

// GetExercise retrieves a specific exercise by ID
func GetExercise(c *fiber.Ctx) error {
	db := config.GetDB()
	id := c.Params("id")

	exercise := new(models.Exercise)
	result := db.First(&exercise, id)
	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Exercise not found"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Database error"})
	}

	return c.JSON(exercise)
}

// UpdateExercise updates an existing exercise
func UpdateExercise(c *fiber.Ctx) error {
	db := config.GetDB()
	id := c.Params("id")

	exercise := new(models.Exercise)
	result := db.First(&exercise, id)
	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Exercise not found"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Database error"})
	}

	if err := c.BodyParser(&exercise); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request payload"})
	}

	// TODO: Validation and error handling

	// Update the exercise in the database
	db.Save(&exercise)

	return c.JSON(exercise)
}

// DeleteExercise deletes an existing exercise
func DeleteExercise(c *fiber.Ctx) error {
	db := config.GetDB()
	id := c.Params("id")

	exercise := new(models.Exercise)
	result := db.Delete(&exercise, id)
	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Exercise not found"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Database error"})
	}

	return c.SendStatus(fiber.StatusNoContent)
}
