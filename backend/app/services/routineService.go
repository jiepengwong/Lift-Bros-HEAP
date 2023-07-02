package services

import (
	"errors"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/jiepengwong/Lift-Bros-HEAP/app/config"
	"github.com/jiepengwong/Lift-Bros-HEAP/app/models"
	"gorm.io/gorm"
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

func getRoutineByName(name string, routine *models.Routine) error {
	db := config.GetDB()
	if err := db.Preload("Tags").First(&routine, "name = ?", name).Error; err != nil {
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
	return c.JSON(routines)
}

// Get routines specific to a user
func GetRoutineBySpecificUser(c *fiber.Ctx) error {
	db := config.GetDB()
	routines := []models.Routine{}
	userName := c.Params("username") // Retrieve the user name from the request URL parameter

	if err := db.Preload("Exercises").Find(&routines, "created_by = ?", userName).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"error": "routine not found",
			})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	return c.JSON(routines)
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
		"routine":         routine,
		"routineExercise": routineExercises,
	})
}

// GetRoutine retrieves a specific routine by name
func GetRoutine(c *fiber.Ctx) error {
	db := config.GetDB()
	name := strings.ReplaceAll(c.Params("name"), "%20", " ")
	routine := new(models.Routine)
	err := getRoutineByName(name, routine)
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
	return c.Status(fiber.StatusOK).JSON(routines)
}

// // UpdateRoutine updates an existing routine
// func UpdateRoutine(c *fiber.Ctx) error {
// 	db := config.GetDB()
// 	name := strings.ReplaceAll(c.Params("name"), "%20", " ")

// 	existingRoutine, err := getRoutineByName(name)
// 	if err != nil {
// 		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": err.Error()})
// 	}

// 	updatedRoutine := new(models.Routine)
// 	if err := c.BodyParser(&updatedRoutine); err != nil {
// 		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request payload"})
// 	}

// 	// TODO: Validation and error handling

// 	// Update the existing routine in the database using submitted updated routine
// 	if updatedRoutine.Name != "" {
// 		existingRoutine.Name = updatedRoutine.Name
// 	}
// 	if updatedRoutine.Description != "" {
// 		existingRoutine.Description = updatedRoutine.Description
// 	}
// 	if updatedRoutine.Difficulty != "" {
// 		existingRoutine.Difficulty = updatedRoutine.Difficulty
// 	}
// 	if updatedRoutine.DefaultRep != "" {
// 		existingRoutine.DefaultRep = updatedRoutine.DefaultRep
// 	}
// 	if updatedRoutine.CaloriesPerMin != 0 {
// 		existingRoutine.CaloriesPerMin = updatedRoutine.CaloriesPerMin
// 	}
// 	if updatedRoutine.MuscleGroups != nil {
// 		// retrieve all muscle group id from the database using their name
// 		if err := ProcessMuscleGroupNames(&updatedRoutine.MuscleGroups); err != nil {
// 			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
// 				"error": err.Error(),
// 			})
// 		}
// 		// replace all muscle groups associated to the routine
// 		if err := db.Model(&existingRoutine).Association("MuscleGroups").Replace(updatedRoutine.MuscleGroups); err != nil {
// 			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
// 				"error": err,
// 			})
// 		}
// 	}
// 	// Save the routine to the database & omit creation of muscle groups
// 	if err := db.Omit("MuscleGroups").Save(&existingRoutine).Error; err != nil {
// 		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
// 			"error": err.Error(),
// 		})
// 	}

// 	return c.Status(fiber.StatusOK).JSON(fiber.Map{
// 		"message": "Routine successfully updated",
// 	})
// }

// DeleteRoutine deletes an existing routine
func DeleteRoutine(c *fiber.Ctx) error {
	db := config.GetDB()
	name := strings.ReplaceAll(c.Params("name"), "%20", " ")
	routine := new(models.Routine)
	err := getRoutineByName(name, routine)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": err.Error()})
	}

	// remove all exercises associated to the routine
	if err := db.Unscoped().Model(&routine).Association("Exercises").Unscoped().Clear(); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err,
		})
	}

	// remove all tags associated to the routine
	if err := db.Unscoped().Model(&routine).Association("Tags").Unscoped().Clear(); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err,
		})
	}

	db.Delete(&routine)

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Routine successfully deleted",
	})
}
