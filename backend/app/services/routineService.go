package services

import (
	"errors"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/jiepengwong/Lift-Bros-HEAP/app/config"
	"github.com/jiepengwong/Lift-Bros-HEAP/app/models"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

func ProcessExerciseNames(exercisesData *[]models.ExerciseData, exercises *[]models.Exercise) error {
	db := config.GetDB()
	// retrieve all muscle group id from the database using their name
	var exerciseNames []string
	for _, exerciseData := range *exercisesData {
		exerciseNames = append(exerciseNames, exerciseData.Name)
	}

	db.Where("name IN ?", exerciseNames).Find(exercises)
	if len(*exercises) != len(exerciseNames) {
		return errors.New("one or more exercises not found")
	}
	return nil
}

func ProcessTagNames(tags *[]models.Tag) error {
	db := config.GetDB()
	// retrieve all muscle group id from the database using their name
	var tagNames []string
	for _, tag := range *tags {
		tagNames = append(tagNames, tag.Name)
	}

	db.Where("name IN ?", tagNames).Find(tags)
	if len(*tags) != len(tagNames) {
		return errors.New("one or more tags not found")
	}
	return nil
}

func getRoutineByUserIdAndName(userId uuid.UUID, name string, routine *models.Routine) error {
	db := config.GetDB()
	if err := db.Preload(clause.Associations).First(&routine, "user_id = ? AND name = ?", userId, name).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return errors.New("routine not found")
		}
		return err
	}
	return nil
}

// Get routine by created by created_by column
func GetRoutineByTemplate(c *fiber.Ctx) error {
	db := config.GetDB()
	routines := []models.Routine{}
	if err := db.Preload("Exercises").Find(&routines, "created_by = ?", "LiftBro").Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"error": "routine not found",
			})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	return c.JSON(fiber.Map{
		"data": routines,
	})
}

// Get routines specific to a user
func GetRoutineBySpecificUser(c *fiber.Ctx) error {
	db := config.GetDB()
	routines := []models.Routine{}
	username := c.Params("username") // Retrieve the user name from the request URL parameter

	// Get user using username
	user := new(models.User)
	if err := GetUserByUsername(username, user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	if err := db.Preload("Exercises").Find(&routines, "user_id = ?", user.ID).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"error": "routine not found",
			})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	return c.JSON(fiber.Map{
		"data": routines,
	})
}

// CreateRoutine creates a new routine
func CreateRoutine(c *fiber.Ctx) error {
	db := config.GetDB()
	routine := new(models.Routine)         // creates a pointer to a null Routine
	routineData := new(models.RoutineData) // creates a pointer to a null RoutineData
	if err := c.BodyParser(routineData); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	// retrieve user id from the database using their name
	if err := GetUserByUsername(routineData.CreatedBy.Username, &routineData.CreatedBy); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	// retrieve all exercise id from the database using their name
	if err := ProcessExerciseNames(&routineData.ExerciseData, &routine.Exercises); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	// retrieve all tag id from the database using their name
	if err := ProcessTagNames(&routineData.Tags); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	// assign values to the routine
	routine.UserID = routineData.CreatedBy.ID
	routine.Name = routineData.Name
	routine.CreatedBy = routineData.CreatedBy.Username
	routine.Tags = routineData.Tags
	routine.Image = routineData.Image

	// Save the routine to the database & omit creation of muscle groups
	if err := db.Omit("Exercises", "Tags.*").Create(&routine).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	// populate the RoutineExercise table
	routineExercises := []models.RoutineExercise{}
	for i, exerciseData := range routineData.ExerciseData {
		routineExercise := models.RoutineExercise{
			RoutineID:    routine.ID,
			RoutineName:  routineData.Name,
			ExerciseID:   routine.Exercises[i].ID,
			ExerciseName: exerciseData.Name,
			Description:  routine.Exercises[i].Description,
			TargetReps:   exerciseData.TargetReps,
			RepBuffer:    exerciseData.RepBuffer,
		}
		if err := db.Create(&routineExercise).Error; err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": err.Error(),
			})
		}
		routineExercises = append(routineExercises, routineExercise)
	}
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"data": fiber.Map{
			"routine":         routine,
			"routineExercise": routineExercises,
		},
	})
}

// GetRoutine retrieves a specific routine by name
func GetRoutine(c *fiber.Ctx) error {
	db := config.GetDB()
	username := strings.ReplaceAll(c.Query("username"), "%20", " ")
	name := strings.ReplaceAll(c.Query("name"), "%20", " ")

	// Get user using username
	user := new(models.User)
	if err := GetUserByUsername(username, user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	routine := new(models.Routine)
	err := getRoutineByUserIdAndName(user.ID, name, routine)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": err.Error()})
	}
	routineExercises := new([]models.RoutineExercise)
	if err := db.Where("routine_id = ?", routine.ID).Find(&routineExercises).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err,
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"exercises": routineExercises,
		"tags":      routine.Tags,
	})
}

func GetRoutines(c *fiber.Ctx) error {
	db := config.GetDB()
	var routines []models.Routine
	if err := db.Preload("Exercises").Preload("Tags").Find(&routines).Error; err != nil {
		// you can also use Preload(clause.Associations) to preload all associations
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"data": routines,
	})
}

// UpdateRoutine updates an existing routine
func UpdateRoutine(c *fiber.Ctx) error {
	db := config.GetDB()
	username := strings.ReplaceAll(c.Query("username"), "%20", " ")
	name := strings.ReplaceAll(c.Query("name"), "%20", " ")

	// Get user using username
	user := new(models.User)
	if err := GetUserByUsername(username, user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	existingRoutine := new(models.Routine)

	err := getRoutineByUserIdAndName(user.ID, name, existingRoutine)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": err.Error()})
	}

	updatedRoutineData := new(models.RoutineData)
	if err := c.BodyParser(&updatedRoutineData); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request payload"})
	}

	// TODO: Validation and error handling

	// Update the existing routine in the database using submitted updated routine
	if updatedRoutineData.Name != "" {
		existingRoutine.Name = updatedRoutineData.Name
	}
	if updatedRoutineData.Image != "" {
		existingRoutine.Image = updatedRoutineData.Image
	}
	if updatedRoutineData.ExerciseData != nil {
		// remove all muscle groups associated to the exercise
		if err := db.Unscoped().Model(&existingRoutine).Association("Exercises").Unscoped().Clear(); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": err,
			})
		}
		// retrieve all exercise id from the database using their name
		if err := ProcessExerciseNames(&updatedRoutineData.ExerciseData, &existingRoutine.Exercises); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": err.Error(),
			})
		}
		for i, exerciseData := range updatedRoutineData.ExerciseData {
			routineExercise := models.RoutineExercise{
				RoutineID:    existingRoutine.ID,
				RoutineName:  updatedRoutineData.Name,
				ExerciseID:   existingRoutine.Exercises[i].ID,
				ExerciseName: exerciseData.Name,
				TargetReps:   exerciseData.TargetReps,
				RepBuffer:    exerciseData.RepBuffer,
			}
			if err := db.Create(&routineExercise).Error; err != nil {
				return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
					"error": err.Error(),
				})
			}
		}
	}
	if updatedRoutineData.Tags != nil {
		// retrieve all muscle group id from the database using their name
		if err := ProcessTagNames(&updatedRoutineData.Tags); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": err.Error(),
			})
		}
		// replace all muscle groups associated to the routine
		if err := db.Model(&existingRoutine).Association("Tags").Replace(updatedRoutineData.Tags); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": err,
			})
		}
	}
	// Save the routine to the database & omit creation of muscle groups
	if err := db.Omit("Tags").Save(&existingRoutine).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Routine successfully updated",
	})
}

// DeleteRoutine deletes an existing routine
func DeleteRoutine(c *fiber.Ctx) error {
	db := config.GetDB()
	username := strings.ReplaceAll(c.Query("username"), "%20", " ")
	name := strings.ReplaceAll(c.Query("name"), "%20", " ")

	// Get user using username
	user := new(models.User)
	if err := GetUserByUsername(username, user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	routine := new(models.Routine)
	err := getRoutineByUserIdAndName(user.ID, name, routine)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": err.Error()})
	}

	db.Delete(&routine)

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Routine successfully deleted",
	})
}
