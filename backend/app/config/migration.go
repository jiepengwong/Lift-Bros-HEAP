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

func AssociateMuscleGroup(db *gorm.DB) error {
	if err := db.SetupJoinTable(&models.Exercise{}, "MuscleGroups", &models.ExerciseMuscleGroup{}); err != nil {
		return err
	}
	return nil
}

func MigrateAndSeedMuscleGroup(db *gorm.DB) error {
	hasMuscleGroupTable := db.Migrator().HasTable(&models.MuscleGroup{})
	hasExerciseTable := db.Migrator().HasTable(&models.Exercise{})
	db.AutoMigrate(&models.MuscleGroup{}, &models.Exercise{})
	AssociateMuscleGroup(db)
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

	return nil
}

func seedMuscleGroupData(db *gorm.DB) error {
	muscleGroups := []models.MuscleGroup{
		{Name: "TRAPS"},
		{Name: "FRONTDELTS"},
		{Name: "MIDDELTS"},
		{Name: "REARDELTS"},
		{Name: "TRICEP"},
		{Name: "BICEP"},
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
		{Name: "HAMSTRING"},
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
