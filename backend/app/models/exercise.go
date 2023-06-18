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
