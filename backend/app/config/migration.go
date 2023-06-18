package config

import (
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
	db.AutoMigrate(&models.MuscleGroup{}, &models.Exercise{})
	if hasMuscleGroupTable {
		return nil
	}
	if err := seedMuscleGroupData(db); err != nil {
		return err
	}
	AssociateMuscleGroup(db)
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
	// Old code
	// for _, muscleGroup := range muscleGroups {
	// 	if err := db.Create(&muscleGroup).Error; err != nil {
	// 		return err
	// 	}
	// }

	return nil
}
