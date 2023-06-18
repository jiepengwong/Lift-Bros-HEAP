package config

import (
	"fmt"
	"io/ioutil"

	"github.com/jiepengwong/Lift-Bros-HEAP/app/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var (
	db *gorm.DB
)

func InitDatabase() {
	var err error
	dataSourceName := "liftbro:password@tcp(mysql:3306)/liftbro?charset=utf8mb4&parseTime=True&loc=Local"
	// docker exec -it backend-mysql-1 mysql -u liftbro -p
	// If you are using a local database
	// dataSourceName := "root:password@tcp(localhost:3307)/liftbro?charset=utf8mb4&parseTime=True&loc=Local"
	db, err = gorm.Open(mysql.Open(dataSourceName), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to database")
	}
	fmt.Println("Database connection successfully opened")

	db.AutoMigrate(&models.User{})
	models.MigrateAndSeedMuscleGroup(db)
	// db.AutoMigrate(&models.Exercise{})
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

func RunSQLFile(db *gorm.DB, filePath string) error {
	// Open the SQL file
	sqlFile, err := ioutil.ReadFile(filePath)
	if err != nil {
		return err
	}

	// Execute the SQL statements in the file
	statements := string(sqlFile)
	db.Exec(statements)
	return nil
}
