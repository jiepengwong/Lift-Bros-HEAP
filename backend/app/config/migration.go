package config

import (
	"encoding/csv"
	"encoding/json"
	"errors"
	"io"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/jiepengwong/Lift-Bros-HEAP/app/models"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func SetUpAssociations(db *gorm.DB) error {
	if err := db.SetupJoinTable(&models.Exercise{}, "MuscleGroups", &models.ExerciseMuscleGroup{}); err != nil {
		return err
	}
	if err := db.SetupJoinTable(&models.Routine{}, "Exercises", &models.RoutineExercise{}); err != nil {
		return err
	}
	if err := db.SetupJoinTable(&models.Routine{}, "Tags", &models.RoutineTag{}); err != nil {
		return err
	}
	if err := db.SetupJoinTable(&models.User{}, "Routines", &models.Routine{}); err != nil {
		return err
	}
	return nil
}

func MigrateAndSeedDB(db *gorm.DB) error {
	SetUpAssociations(db)
	db.AutoMigrate(&models.User{})
	// Create admin user if not exist
	var adminUser models.User
	if err := db.First(&adminUser, "username = ?", "LiftBro").Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			if err := CreateAdminUser(db); err != nil {
				return err
			}
		} else {
			return err
		}
	}

	hasMuscleGroupTable := db.Migrator().HasTable(&models.MuscleGroup{})
	hasExerciseTable := db.Migrator().HasTable(&models.Exercise{})
	db.AutoMigrate(&models.MuscleGroup{}, &models.Exercise{})
	if hasMuscleGroupTable {
		// do nothing
	} else if err := seedMuscleGroupData(db); err != nil {
		return err
	}
	if hasExerciseTable {
		// do nothing
	} else if err := seedExerciseDataFromCSV("app/config/exercise.csv"); err != nil {
		return err
	}

	hasTagTable := db.Migrator().HasTable(&models.Tag{})
	db.AutoMigrate(&models.Tag{})
	if hasTagTable {
		// do nothing
	} else if err := seedTagData(db); err != nil {
		return err
	}

	hasRoutineTable := db.Migrator().HasTable(&models.Routine{})
	db.AutoMigrate(&models.Routine{})
	if hasRoutineTable {
		// do nothing
	} else if err := CreateRoutineFromJson(db); err != nil {
		return err
	}

	db.AutoMigrate(&models.CompletedRoutine{})
	db.AutoMigrate(&models.CompletedExercise{})
	return nil
}

func CreateAdminUser(db *gorm.DB) error {
	var adminPassword = os.Getenv("ADMIN_PASSWORD")
	bytePassword, err := bcrypt.GenerateFromPassword([]byte(adminPassword), bcrypt.DefaultCost) // DefaultCost = 10
	if err != nil {
		return err
	}
	admin := models.User{
		Username: "LiftBro",
		Password: bytePassword,
		Name:     "LiftBro",
		Email:    "liftbro@liftbro.com",
		DOB:      time.Now(),
		PhoneNo:  "68280100",
	}
	if err := db.Omit("Routines").Create(&admin).Error; err != nil {
		return err
	}
	return nil
}

func seedMuscleGroupData(db *gorm.DB) error {
	muscleGroups := []models.MuscleGroup{
		{Name: "TRAPS"},
		{Name: "FRONTDELTS"},
		{Name: "MIDDELTS"},
		{Name: "REARDELTS"},
		{Name: "TRICEPS"},
		{Name: "BICEPS"},
		{Name: "FOREARMS"},
		{Name: "UPPERCHEST"},
		{Name: "MIDCHEST"},
		{Name: "LOWERCHEST"},
		{Name: "LATS"},
		{Name: "UPPERBACK"},
		{Name: "MIDBACK"},
		{Name: "LOWERBACK"},
		{Name: "ABS"},
		{Name: "OBLIQUES"},
		{Name: "GLUTES"},
		{Name: "QUADS"},
		{Name: "HAMSTRINGS"},
		{Name: "CALVES"},
	}
	db.Create(&muscleGroups)
	return nil
}

func seedExerciseDataFromCSV(filePath string) error {
	// Open the CSV file
	file, err := os.Open(filePath)
	if err != nil {
		return err
	}
	defer file.Close()
	// Create a new CSV reader
	reader := csv.NewReader(file)
	// Read all the records from the CSV
	records, err := reader.ReadAll()
	if err != nil {
		return err
	}

	for i, record := range records {
		// Skip the header row
		if i == 0 {
			continue
		}

		// Convert CaloriesPerMin to integer
		caloriesPerMin, err := strconv.Atoi(record[4])
		if err != nil {
			return err
		}

		// Convert MuscleGroups to array of MuscleGroup
		muscleGroups := new([]models.MuscleGroup)
		muscleGroupNames := strings.Split(record[5], ", ")
		db := GetDB()
		db.Where("name IN ?", muscleGroupNames).Find(muscleGroups)
		if len(*muscleGroups) != len(muscleGroupNames) {
			return errors.New("one or more muscle groups not found")
		}

		// Create the Exercise struct
		exercise := models.Exercise{
			Name:           record[0],
			Description:    record[1],
			Difficulty:     models.Difficulty(record[2]),
			DefaultRep:     models.DefaultRep(record[3]),
			CaloriesPerMin: caloriesPerMin,
			MuscleGroups:   *muscleGroups,
		}

		if err := db.Omit("MuscleGroups.*").Create(&exercise).Error; err != nil {
			return err
		}

	}
	return nil
}

func seedTagData(db *gorm.DB) error {
	tags := []models.Tag{
		{Name: "UPPERBODY"},
		{Name: "LOWERBODY"},
		{Name: "FULLBODY"},
		{Name: "PUSH"},
		{Name: "PULL"},
		{Name: "LEGS"},
		{Name: "CHEST"},
		{Name: "BACK"},
		{Name: "SHOULDERS"},
		{Name: "ARMS"},
		{Name: "BACK-BICEPS"},
		{Name: "CHEST-TRICEPS"},
		{Name: "SHOULDERS-UPPERTRAPS"},
		{Name: "ABS"},
		{Name: "CHEST-BACK"},
		{Name: "LEG-SHOULDER"},
		{Name: "GLUTES"},
	}
	db.Create(&tags)
	return nil
}

func getUserByUsername(username string, user *models.User) error {
	db := GetDB()
	if err := db.First(&user, "name = ?", username).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return errors.New("user not found")
		}
		return err
	}
	return nil
}

func processExerciseNames(exercisesData *[]models.ExerciseData, exercises *[]models.Exercise) error {
	db := GetDB()
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

func processTagNames(tags *[]models.Tag) error {
	db := GetDB()
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

type RoutinesData struct {
	Routines []models.RoutineData `json:"routinesData"`
}

func CreateRoutineFromJson(db *gorm.DB) error {
	jsonFile, err := os.Open("app/config/templateRoutine.json")
	if err != nil {
		return err
	}
	defer jsonFile.Close()
	byteValue, err := io.ReadAll(jsonFile)
	if err != nil {
		return err
	}

	var routinesData RoutinesData
	json.Unmarshal(byteValue, &routinesData)
	if err != nil {
		return err
	}

	for _, routineData := range routinesData.Routines {
		routine := new(models.Routine)
		// retrieve user id from the database using their name
		if err := getUserByUsername(routineData.CreatedBy.Username, &routineData.CreatedBy); err != nil {
			return err
		}

		// retrieve all exercise id from the database using their name
		if err := processExerciseNames(&routineData.ExerciseData, &routine.Exercises); err != nil {
			return err
		}

		// retrieve all tag id from the database using their name
		if err := processTagNames(&routineData.Tags); err != nil {
			return err
		}

		// assign values to the routine
		routine.UserID = routineData.CreatedBy.ID
		routine.Name = routineData.Name
		routine.CreatedBy = routineData.CreatedBy.Name
		routine.Tags = routineData.Tags

		// Save the routine to the database & omit creation of muscle groups
		if err := db.Omit("Exercises", "Tags.*").Create(&routine).Error; err != nil {
			return err
		}
		// populate the RoutineExercise table
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
				return err
			}
		}
	}
	return nil
}
