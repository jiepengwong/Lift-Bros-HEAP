package services

import (
	"fmt"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/jiepengwong/Lift-Bros-HEAP/app/config"
	"github.com/jiepengwong/Lift-Bros-HEAP/app/models"
	"gorm.io/gorm"
)

// CreateExercise creates a new exercise
func CreateExercise(c *fiber.Ctx) error {
	db := config.GetDB()
	exercise := new(models.Exercise) // creates a pointer to a null Exercise
	if err := c.BodyParser(exercise); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	// Find all muscle groups
	var muscleGroupNames []string
	for _, muscleGroup := range exercise.MuscleGroups {
		muscleGroupNames = append(muscleGroupNames, muscleGroup.Name)
	}

	db.Where("name IN ?", muscleGroupNames).Find(&exercise.MuscleGroups)
	if len(exercise.MuscleGroups) != len(muscleGroupNames) {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "One or more muscle groups not found",
		})
	}
	// Save the exercise to the database & omit creation of muscle groups
	if err := db.Omit("MuscleGroups.*").Create(&exercise).Error; err != nil {
		fmt.Println(exercise)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	return c.Status(fiber.StatusCreated).JSON(exercise)
}

// GetExercise retrieves a specific exercise by name
func GetExercise(c *fiber.Ctx) error {
	db := config.GetDB()
	name := strings.ReplaceAll(c.Params("name"), "%20", " ")
	exercise := new(models.Exercise)
	if err := db.Preload("MuscleGroups").First(&exercise, "name = ?", name).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Exercise not found"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err})
	}

	return c.Status(fiber.StatusOK).JSON(exercise)
}

func GetExercises(c *fiber.Ctx) error {
	db := config.GetDB()
	var exercises []models.Exercise
	if err := db.Preload("MuscleGroups").Find(&exercises).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	return c.Status(fiber.StatusOK).JSON(exercises)
}

// UpdateExercise updates an existing exercise
func UpdateExercise(c *fiber.Ctx) error {
	db := config.GetDB()
	name := strings.ReplaceAll(c.Params("name"), "%20", " ")

	existingExercise := new(models.Exercise)
	if err := db.Preload("MuscleGroups").First(&existingExercise, "name = ?", name).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Exercise not found"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Database error"})
	}

	updatedExercise := new(models.Exercise)
	if err := c.BodyParser(&updatedExercise); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request payload"})
	}

	// TODO: Validation and error handling

	// Update the exercise in the database
	if updatedExercise.Name != "" {
		existingExercise.Name = updatedExercise.Name
	}
	if updatedExercise.Description != "" {
		existingExercise.Description = updatedExercise.Description
	}
	if updatedExercise.Difficulty != "" {
		existingExercise.Difficulty = updatedExercise.Difficulty
	}
	if updatedExercise.DefaultRep != "" {
		existingExercise.DefaultRep = updatedExercise.DefaultRep
	}
	if updatedExercise.CaloriesPerMin != 0 {
		existingExercise.CaloriesPerMin = updatedExercise.CaloriesPerMin
	}
	if updatedExercise.MuscleGroups != nil {
		var muscleGroupNames []string
		for _, muscleGroup := range updatedExercise.MuscleGroups {
			muscleGroupNames = append(muscleGroupNames, muscleGroup.Name)
		}

		db.Where("name IN ?", muscleGroupNames).Find(&updatedExercise.MuscleGroups)
		if len(updatedExercise.MuscleGroups) != len(muscleGroupNames) {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "One or more muscle groups not found",
			})
		}
		if err := db.Model(&existingExercise).Association("MuscleGroups").Replace(updatedExercise.MuscleGroups); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": err,
			})
		}
	}

	if err := db.Omit("MuscleGroups").Save(&existingExercise).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Exercise successfully updated",
	})
}

// DeleteExercise deletes an existing exercise
func DeleteExercise(c *fiber.Ctx) error {
	db := config.GetDB()
	name := strings.ReplaceAll(c.Params("name"), "%20", " ")

	exercise := new(models.Exercise)
	if err := db.Preload("MuscleGroups").First(&exercise, "name = ?", name).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Exercise not found"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err})
	}

	if err := db.Unscoped().Model(&exercise).Association("MuscleGroups").Unscoped().Clear(); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err,
		})
	}

	db.Delete(&exercise)

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Exercise successfully deleted",
	})
}
