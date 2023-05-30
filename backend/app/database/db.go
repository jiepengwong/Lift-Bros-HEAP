package database

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"github.com/jiepengwong/Lift-Bros-HEAP/app/models"
)

var (
	db *gorm.DB
)

func InitDatabase() {
	var err error
	uri := "root:password@tcp(localhost:3306)/liftbro?charset=utf8mb4&parseTime=True&loc=Local"
	db, err = gorm.Open(mysql.Open(uri), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to database")
	}
	fmt.Println("Database connection successfully opened")

	db.AutoMigrate(&models.User{})
}

func GetDB() *gorm.DB {
	return db
}

func CloseDB() {
	db, err := db.DB()
	if err != nil {
		panic(err)
	}
	
	err = db.Close()
	if err != nil {
		panic(err)
	}

	fmt.Println("Database connection closed successfully!")
}