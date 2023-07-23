package models

import (
	"github.com/google/uuid"
	"github.com/jiepengwong/Lift-Bros-HEAP/app/utils"
	"gorm.io/gorm"
)

type Routine struct {
	ID                uuid.UUID          `gorm:"primaryKey" json:"-"`
	UserID            uuid.UUID          `gorm:"size:191;uniqueIndex:user_routine" json:"-"`
	Name              string             `gorm:"size:191;uniqueIndex:user_routine" json:"name"`
	CreatedBy         string             `json:"createdBy"`
	Image             string             `json:"image"`
	Exercises         []Exercise         `gorm:"many2many:routine_exercises" json:"exercises"`
	Tags              []Tag              `gorm:"many2many:routine_tags" json:"tags"`
	CompletedRoutines []CompletedRoutine `gorm:"foreignKey:RoutineID" json:"completedRoutines"`
}

type RoutineData struct {
	Name         string         `json:"name"`
	CreatedBy    User           `json:"createdBy"`
	Image        string         `json:"image"`
	ExerciseData []ExerciseData `json:"exercises"`
	Tags         []Tag          `json:"tags"`
}

type ExerciseData struct {
	Name       string `json:"name"`
	TargetReps []int  `json:"targetReps"`
	RepBuffer  int    `json:"repBuffer"`
}

func (routine *Routine) BeforeCreate(tx *gorm.DB) (err error) {
	if routine.ID == uuid.Nil {
		routine.ID = uuid.New()
	}
	return
}

type Tag struct {
	ID   uuid.UUID `gorm:"primaryKey" json:"-"`
	Name string    `gorm:"unique" json:"name"`
}

func (tag *Tag) BeforeCreate(tx *gorm.DB) (err error) {
	if tag.ID == uuid.Nil {
		tag.ID = uuid.New()
	}
	return
}

type RoutineExercise struct {
	RoutineID        uuid.UUID `json:"-" gorm:"primaryKey"`
	RoutineName      string    `json:"routineName"`
	ExerciseID       uuid.UUID `json:"-" gorm:"primaryKey"`
	ExerciseName     string    `json:"exerciseName"`
	TargetReps       []int     `gorm:"-" json:"targetReps"`
	TargetRepsString string    `json:"-"`
	RepBuffer        int       `json:"repBuffer"`
}

func (routineExercise *RoutineExercise) BeforeCreate(tx *gorm.DB) (err error) {
	if routineExercise.RepBuffer == 0 {
		routineExercise.RepBuffer = 2
	}
	routineExercise.TargetRepsString = utils.IntsToString(routineExercise.TargetReps)
	return
}

func (routineExercise *RoutineExercise) AfterFind(tx *gorm.DB) (err error) {
	routineExercise.TargetReps = utils.StringToInts(routineExercise.TargetRepsString)
	return
}

type RoutineTag struct {
	RoutineID uuid.UUID `json:"routineId" gorm:"primaryKey"`
	TagID     uuid.UUID `json:"tagId" gorm:"primaryKey"`
}
