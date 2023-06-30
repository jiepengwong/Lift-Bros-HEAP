package config

import (
	"encoding/csv"
	"errors"
	"os"
	"strconv"
	"strings"

	"github.com/jiepengwong/Lift-Bros-HEAP/app/models"
	"gorm.io/gorm"
)

func SetUpAssociations(db *gorm.DB) error {
	// if err := db.SetupJoinTable(&models.User{}, "Routines", &models.Routine{}); err != nil {
	// 	return err
	// }
	if err := db.SetupJoinTable(&models.Exercise{}, "MuscleGroups", &models.ExerciseMuscleGroup{}); err != nil {
		return err
	}
	if err := db.SetupJoinTable(&models.Routine{}, "Exercises", &models.RoutineExercise{}); err != nil {
		return err
	}
	if err := db.SetupJoinTable(&models.Routine{}, "Tags", &models.RoutineTag{}); err != nil {
		return err
	}
	return nil
}

// func AssociateMuscleGroup(db *gorm.DB) error {
// 	if err := db.SetupJoinTable(&models.Exercise{}, "MuscleGroups", &models.ExerciseMuscleGroup{}); err != nil {
// 		return err
// 	}
// 	return nil
// }

// func AssociateExercise(db *gorm.DB) error {
// 	if err := db.SetupJoinTable(&models.Routine{}, "Exercises", &models.RoutineExercise{}); err != nil {
// 		return err
// 	}
// 	return nil
// }

// func AssociateTag(db *gorm.DB) error {
// 	if err := db.SetupJoinTable(&models.Routine{}, "Tags", &models.RoutineTag{}); err != nil {
// 		return err
// 	}
// 	return nil
// }

func MigrateAndSeedDB(db *gorm.DB) error {
	SetUpAssociations(db)
	// AssociateMuscleGroup(db)
	// AssociateExercise(db)
	// AssociateTag(db)
	db.AutoMigrate(&models.User{})

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

	// hasRoutineTable = db.Migrator().HasTable(&models.Routine{})
	db.AutoMigrate(&models.Routine{})
	// if hasRoutineTable {
	// 	// do nothing
	// } else if err := seedRoutineDataFromCSV("app/config/routine.csv"); err != nil {
	// 	return err
	// }

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
