package models

type Exercise struct {
	Name           string        `gorm:"primaryKey" json:"name"`
	Description    string        `json:"description"`
	Difficulty     Difficulty    `json:"difficulty"`
	DefaultRep     DefaultRep    `json:"defaultRep"`
	CaloriesPerMin int           `json:"caloriesPerMin"`
	MuscleGroups   []MuscleGroup `gorm:"type:varchar(255)[]" json:"muscleGroups"`
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

type MuscleGroup string

// Enum values for MuscleGroup
const (
	MuscleGroupTraps      MuscleGroup = "TRAPS"
	MuscleGroupFrontDelts MuscleGroup = "FRONTDELTS"
	MuscleGroupMidDelts   MuscleGroup = "MIDDELTS"
	MuscleGroupRearDelts  MuscleGroup = "REARDELTS"
	MuscleGroupTricep     MuscleGroup = "TRICEP"
	MuscleGroupBicep      MuscleGroup = "BICEP"
	MuscleGroupForearms   MuscleGroup = "FOREARMS"
	MuscleGroupUpperChest MuscleGroup = "UPPERCHEST"
	MuscleGroupMidChest   MuscleGroup = "MIDCHEST"
	MuscleGroupLowerChest MuscleGroup = "LOWERCHEST"
	MuscleGroupLats       MuscleGroup = "LATS"
	MuscleGroupUpperBack  MuscleGroup = "UPPERBACK"
	MuscleGroupMidBack    MuscleGroup = "MIDBACK"
	MuscleGroupLowerBack  MuscleGroup = "LOWERBACK"
	MuscleGroupAbs        MuscleGroup = "ABS"
	MuscleGroupObliques   MuscleGroup = "OBLIQUES"
	MuscleGroupGlutes     MuscleGroup = "GLUTES"
	MuscleGroupQuads      MuscleGroup = "QUADS"
	MuscleGroupHamstring  MuscleGroup = "HAMSTRING"
	MuscleGroupCalves     MuscleGroup = "CALVES"
)