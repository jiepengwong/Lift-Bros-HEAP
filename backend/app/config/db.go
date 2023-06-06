package config

import (
	"fmt"

	"github.com/jiepengwong/Lift-Bros-HEAP/app/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var (
	db *gorm.DB
)

func InitDatabase() {
	var err error
	dataSourceName := "root:password@tcp(mysql:3306)/liftbro?charset=utf8mb4&parseTime=True&loc=Local"
	// If you are using a local database
	// dataSourceName := "root:password@tcp(localhost:3306)/liftbro?charset=utf8mb4&parseTime=True&loc=Local"
	db, err = gorm.Open(mysql.Open(dataSourceName), &gorm.Config{})
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