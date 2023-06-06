package models

import (
	"time"
)

type User struct {
	Username string `gorm:"primaryKey" json:"username"`
	Password []byte `json:"-"`
	Name     string `json:"name"`
	DOB      time.Time `json:"dob"`
	PhoneNo  string `json:"phoneNo"`
	Email    string `gorm:"unique" json:"email"`
}

type NewUser struct {
	Username string `gorm:"primaryKey" json:"username"`
	Password string `json:"password"`
	Name     string `json:"name"`
	DOB      time.Time `json:"dob"`
	PhoneNo  string `json:"phoneNo"`
	Email    string `gorm:"unique" json:"email"`
}
