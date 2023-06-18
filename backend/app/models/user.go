package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	ID       uuid.UUID `gorm:"primaryKey" json:"-"`
	Username string    `gorm:"unique" json:"username"`
	Password []byte    `json:"-"`
	Name     string    `json:"name"`
	DOB      time.Time `json:"dob"`
	PhoneNo  string    `json:"phoneNo"`
	Email    string    `gorm:"unique" json:"email"`
}

type NewUser struct {
	Username string    `gorm:"unique" json:"username"`
	Password string    `json:"password"`
	Name     string    `json:"name"`
	DOB      time.Time `json:"dob"`
	PhoneNo  string    `json:"phoneNo"`
	Email    string    `gorm:"unique" json:"email"`
}

func (user *User) BeforeCreate(tx *gorm.DB) (err error) {
	if user.ID == uuid.Nil {
		user.ID = uuid.New()
	}
	return
}
