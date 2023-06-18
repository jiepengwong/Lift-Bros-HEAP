package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Exercise struct {
	ID             uuid.UUID     `gorm:"primaryKey" json:"-"`
	Name           string        `gorm:"unique" json:"name"`
	Description    string        `json:"description"`
	Difficulty     Difficulty    `json:"difficulty"`
	DefaultRep     DefaultRep    `json:"defaultRep"`
	CaloriesPerMin int           `json:"caloriesPerMin"`
	MuscleGroups   []MuscleGroup `gorm:"many2many:exercise_muscle_groups;foreignKey:ID;joinForeignKey:ExerciseID;References:ID;joinReferences:MuscleGroupID" json:"muscleGroups"`
}

func (exercise *Exercise) BeforeCreate(tx *gorm.DB) (err error) {
	if exercise.ID == uuid.Nil {
		exercise.ID = uuid.New()
	}
	return
}

type Difficulty string

// Enum values for Difficulty
const (
	DifficultyBeginner     Difficulty = "BEG"
	DifficultyIntermediate Difficulty = "INT"
	DifficultyAdvanced     Difficulty = "ADV"
)

type DefaultRep string

// Enum values for DefaultRep
const (
	DefaultRepLow DefaultRep = "LOW"
	DefaultRepMed DefaultRep = "MED"
	DefaultRepHi  DefaultRep = "HI"
)

type MuscleGroup struct {
	ID   uuid.UUID `gorm:"primaryKey" json:"-"`
	Name string    `gorm:"unique" json:"name"`
}

func (muscleGroup *MuscleGroup) BeforeCreate(tx *gorm.DB) (err error) {
	if muscleGroup.ID == uuid.Nil {
		muscleGroup.ID = uuid.New()
	}
	return
}

type ExerciseMuscleGroup struct {
	ExerciseID    uuid.UUID `json:"exerciseId" gorm:"primaryKey"`
	MuscleGroupID uuid.UUID `json:"muscleGroupId" gorm:"primaryKey"`
}

func AssociateMuscleGroup(db *gorm.DB) error {
	if err := db.SetupJoinTable(&Exercise{}, "MuscleGroups", &ExerciseMuscleGroup{}); err != nil {
		return err
	}
	return nil
	// This is to associate and not create join table, i will leave it here for reference
	// if err := db.Model(&Exercise{}).Association("MuscleGroups").Append(&[]MuscleGroup{muscleGroup}).Error; err != nil {
	// 	return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	// }
}

func MigrateAndSeedMuscleGroup(db *gorm.DB) error {
	hasMuscleGroupTable := db.Migrator().HasTable(&MuscleGroup{})
	db.AutoMigrate(&MuscleGroup{}, &Exercise{})
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
	muscleGroups := []MuscleGroup{
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
