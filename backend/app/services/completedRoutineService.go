package services

import (
	"errors"

	"github.com/gofiber/fiber/v2"
	"github.com/jiepengwong/Lift-Bros-HEAP/app/config"
	"github.com/jiepengwong/Lift-Bros-HEAP/app/models"
	"gorm.io/gorm"
)

func getCompletedRoutineById(id string, completedRoutine *models.CompletedRoutine) error {
	db := config.GetDB()
	if err := db.Preload("CompletedExercises").First(&completedRoutine, "id = ?", id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return errors.New("completed routine not found")
		}
		return err
	}
	return nil
}

// Get completed routines specific to a user
func GetCompletedRoutineByUser(c *fiber.Ctx) error {
	db := config.GetDB()
	completedRoutines := []models.CompletedRoutine{}
	userName := c.Params("username") // Retrieve the user name from the request URL parameter

	// Retrieve user ID from the database
	user := new(models.User)
	if err := GetUserByUsername(userName, user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	if err := db.Preload("CompletedExercises").Find(&completedRoutines, "user_id = ?", user.ID).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"error": "No completed outine found",
			})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	return c.JSON(fiber.Map{
		"data": completedRoutines,
	})
}

// CreateCompletedRoutine creates a new completed routine
func CreateCompletedRoutine(c *fiber.Ctx) error {
	db := config.GetDB()
	completedRoutine := new(models.CompletedRoutine) // creates a pointer to a null CompletedRoutine
	if err := c.BodyParser(completedRoutine); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	user := new(models.User)
	// retrieve user id from the database using their name
	if err := GetUserByUsername(completedRoutine.Username, user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	completedRoutine.UserID = user.ID

	routine := new(models.Routine)
	// retrieve all exercise id from the database using their name
	if err := getRoutineByUserIdAndName(user.ID, completedRoutine.RoutineName, routine); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	completedRoutine.RoutineID = routine.ID

	// fetch Exercise IDs from Exercise Name
	for i, completedExercise := range completedRoutine.CompletedExercises {
		exercise := new(models.Exercise)
		if err := getExerciseByName(completedExercise.ExerciseName, exercise); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": err.Error(),
			})
		}
		completedRoutine.CompletedExercises[i].ExerciseID = exercise.ID
	}

	// Save the completedRoutine to the database & omit creation of muscle groups
	if err := db.Omit("User.*", "Routine.*", "Exercise.*").Create(&completedRoutine).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"data": completedRoutine,
	})
}

// GetCompletedRoutine retrieves a specific completed routine by id
func GetCompletedRoutine(c *fiber.Ctx) error {
	id := c.Params("id")
	completedRoutine := new(models.CompletedRoutine)
	err := getCompletedRoutineById(id, completedRoutine)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"data": completedRoutine,
	})
}

func GetCompletedRoutines(c *fiber.Ctx) error {
	db := config.GetDB()
	var completedRoutines []models.CompletedRoutine
	if err := db.Preload("CompletedExercises").Find(&completedRoutines).Error; err != nil {
		// you can also use Preload(clause.Associations) to preload all associations
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"data": completedRoutines,
	})
}

// UpdateCompletedRoutine updates an existing completed routine
func UpdateCompletedRoutine(c *fiber.Ctx) error {
	db := config.GetDB()
	id := c.Params("id")
	existingCompletedRoutine := new(models.CompletedRoutine)
	err := getCompletedRoutineById(id, existingCompletedRoutine)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": err.Error()})
	}

	updatedCompletedRoutine := new(models.CompletedRoutine)
	if err := c.BodyParser(&updatedCompletedRoutine); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request payload"})
	}

	// TODO: Validation and error handling

	// Update the existing completed routine in the database using submitted updated completed routine
	if updatedCompletedRoutine.DateTimeCompleted.IsZero() {
		existingCompletedRoutine.DateTimeCompleted = updatedCompletedRoutine.DateTimeCompleted
	}

	if updatedCompletedRoutine.RoutineDuration != "" {
		existingCompletedRoutine.RoutineDuration = updatedCompletedRoutine.RoutineDuration
	}

	if updatedCompletedRoutine.CaloriesBurned != 0 {
		existingCompletedRoutine.CaloriesBurned = updatedCompletedRoutine.CaloriesBurned
	}

	if updatedCompletedRoutine.RoutineIntensity != 0 {
		existingCompletedRoutine.RoutineIntensity = updatedCompletedRoutine.RoutineIntensity
	}
	if updatedCompletedRoutine.CompletedExercises != nil {
		// fetch Exercise IDs from Exercise Name
		for i, completedExercise := range updatedCompletedRoutine.CompletedExercises {
			exercise := new(models.Exercise)
			if err := getExerciseByName(completedExercise.ExerciseName, exercise); err != nil {
				return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
					"error": err.Error(),
				})
			}
			updatedCompletedRoutine.CompletedExercises[i].ExerciseID = exercise.ID
		}
		// replace all completed Exercise associated to the routine
		if err := db.Model(&existingCompletedRoutine).Association("CompletedExercises").Replace(updatedCompletedRoutine.CompletedExercises); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": err,
			})
		}
	}
	// Save the routine to the database & omit creation of muscle groups
	if err := db.Omit("CompletedExercises").Save(&existingCompletedRoutine).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "CompletedRoutine successfully updated",
	})
}

// DeleteCompletedRoutine deletes an existing completed routine
func DeleteCompletedRoutine(c *fiber.Ctx) error {
	db := config.GetDB()
	id := c.Params("id")
	completedRoutine := new(models.CompletedRoutine)
	err := getCompletedRoutineById(id, completedRoutine)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": err.Error()})
	}

	// remove all completed exercises associated to the completed routine
	if err := db.Unscoped().Model(&completedRoutine).Association("CompletedExercises").Unscoped().Clear(); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err,
		})
	}

	db.Delete(&completedRoutine)

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Completed Routine successfully deleted",
	})
}
