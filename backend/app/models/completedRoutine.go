package models

import (
	"strconv"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/jiepengwong/Lift-Bros-HEAP/app/utils"
	"gorm.io/gorm"
)

type CompletedRoutine struct {
	ID                 uuid.UUID           `gorm:"primaryKey" json:"id"`
	UserID             uuid.UUID           `gorm:"size:191" json:"-"`
	RoutineID          uuid.UUID           `gorm:"size:191" json:"-"`
	DateTimeCompleted  time.Time           `json:"dateTimeCompleted"`
	RoutineDuration    string              `json:"routineDuration"`
	CaloriesBurned     int                 `json:"caloriesBurned"`
	RoutineIntensity   int                 `json:"routineIntensity"`
	Username           string              `json:"username"`
	RoutineName        string              `json:"routineName"`
	CompletedExercises []CompletedExercise `gorm:"foreignKey:CompletedRoutineID" json:"completedExercises"`
}

type CompletedExercise struct {
	ID                  uuid.UUID `gorm:"primaryKey" json:"-"`
	CompletedRoutineID  uuid.UUID `gorm:"size:191" json:"-"`
	ExerciseID          uuid.UUID `gorm:"size:191" json:"-"`
	ExerciseName        string    `json:"exerciseName"`
	TargetReps          []int     `gorm:"-" json:"targetReps"`
	TargetRepsString    string    `json:"-"`
	TargetWeights       []int     `gorm:"-" json:"targetWeights"`
	TargetWeightsString string    `json:"-"`
	ActualReps          []int     `gorm:"-" json:"actualReps"`
	ActualRepsString    string    `json:"-"`
	ActualWeights       []int     `gorm:"-" json:"actualWeights"`
	ActualWeightsString string    `json:"-"`
}

type DailyRoutineInfo struct {
	Weekday        string `json:"weekday"`
	CaloriesBurned int    `json:"caloriesBurned"`
	Date           string `json:"date"`
}

func (completedRoutine *CompletedRoutine) BeforeCreate(tx *gorm.DB) (err error) {
	if completedRoutine.ID == uuid.Nil {
		completedRoutine.ID = uuid.New()
	}
	timeList := strings.Split(completedRoutine.RoutineDuration, ":")
	hours, err := strconv.Atoi(timeList[0])
	if err != nil {
		return err
	}
	minutes, err := strconv.Atoi(timeList[1])
	if err != nil {
		return err
	}
	completedRoutine.CaloriesBurned = (hours*60 + minutes) * 4
	return
}

func (completedExercise *CompletedExercise) BeforeCreate(tx *gorm.DB) (err error) {
	if completedExercise.ID == uuid.Nil {
		completedExercise.ID = uuid.New()
	}
	completedExercise.TargetRepsString = utils.IntsToString(completedExercise.TargetReps)
	completedExercise.TargetWeightsString = utils.IntsToString(completedExercise.TargetWeights)
	completedExercise.ActualRepsString = utils.IntsToString(completedExercise.ActualReps)
	completedExercise.ActualWeightsString = utils.IntsToString(completedExercise.ActualWeights)
	return
}

func (completedExercise *CompletedExercise) AfterFind(tx *gorm.DB) (err error) {
	completedExercise.TargetReps = utils.StringToInts(completedExercise.TargetRepsString)
	completedExercise.TargetWeights = utils.StringToInts(completedExercise.TargetWeightsString)
	completedExercise.ActualReps = utils.StringToInts(completedExercise.ActualRepsString)
	completedExercise.ActualWeights = utils.StringToInts(completedExercise.ActualWeightsString)
	return
}

func (completedRoutine *CompletedRoutine) BeforeDelete(tx *gorm.DB) (err error) {
	// remove all completed exercises associated to the completed routine
	if err := tx.Unscoped().Model(&completedRoutine).Association("CompletedExercises").Unscoped().Clear(); err != nil {
		return err
	}
	return
}
