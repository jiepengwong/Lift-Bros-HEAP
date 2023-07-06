package services

import (
	"errors"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/jiepengwong/Lift-Bros-HEAP/app/config"
	"github.com/jiepengwong/Lift-Bros-HEAP/app/models"
	"gorm.io/gorm"
)

// func ProcessMuscleGroupNames(db *gorm.DB, muscleGroups *[]models.MuscleGroup) error {
func ProcessMuscleGroupNames(muscleGroups *[]models.MuscleGroup) error {
	db := config.GetDB()
	// retrieve all muscle group id from the database using their name
	var muscleGroupNames []string
	for _, muscleGroup := range *muscleGroups {
		muscleGroupNames = append(muscleGroupNames, muscleGroup.Name)
	}

	db.Where("name IN ?", muscleGroupNames).Find(muscleGroups)
	if len(*muscleGroups) != len(muscleGroupNames) {
		return errors.New("one or more muscle groups not found")
	}
	return nil
}

func getExerciseByName(name string, exercise *models.Exercise) error {
	db := config.GetDB()
	if err := db.Preload("MuscleGroups").First(exercise, "name = ?", name).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return errors.New("exercise not found")
		}
		return err
	}
	return nil
}

// CreateExercise creates a new exercise
func CreateExercise(c *fiber.Ctx) error {
	db := config.GetDB()
	exercise := new(models.Exercise) // creates a pointer to a null Exercise
	if err := c.BodyParser(exercise); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	// retrieve all muscle group id from the database using their name
	if err := ProcessMuscleGroupNames(&exercise.MuscleGroups); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	// Save the exercise to the database & omit creation of muscle groups
	if err := db.Omit("MuscleGroups.*").Create(&exercise).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"data": exercise,
	})
}

// GetExercise retrieves a specific exercise by name
func GetExercise(c *fiber.Ctx) error {
	name := strings.ReplaceAll(c.Params("name"), "%20", " ")
	exercise := new(models.Exercise) // creates a pointer to a null Exercise
	err := getExerciseByName(name, exercise)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"data": exercise,
	})
}

func GetExercises(c *fiber.Ctx) error {
	db := config.GetDB()
	var exercises []models.Exercise
	if err := db.Preload("MuscleGroups").Find(&exercises).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"data": exercises,
	})
}

// UpdateExercise updates an existing exercise
func UpdateExercise(c *fiber.Ctx) error {
	db := config.GetDB()
	name := strings.ReplaceAll(c.Params("name"), "%20", " ")

	existingExercise := new(models.Exercise) // creates a pointer to a null Exercise
	err := getExerciseByName(name, existingExercise)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": err.Error()})
	}

	updatedExercise := new(models.Exercise)
	if err := c.BodyParser(&updatedExercise); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request payload"})
	}

	// TODO: Validation and error handling

	// Update the existing exercise in the database using submitted updated exercise
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
		// retrieve all muscle group id from the database using their name
		if err := ProcessMuscleGroupNames(&updatedExercise.MuscleGroups); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": err.Error(),
			})
		}
		// replace all muscle groups associated to the exercise
		if err := db.Model(&existingExercise).Association("MuscleGroups").Replace(updatedExercise.MuscleGroups); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": err,
			})
		}
	}
	// Save the exercise to the database & omit creation of muscle groups
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

	exercise := new(models.Exercise) // creates a pointer to a null Exercise
	err := getExerciseByName(name, exercise)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": err.Error()})
	}

	// remove all muscle groups associated to the exercise
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
