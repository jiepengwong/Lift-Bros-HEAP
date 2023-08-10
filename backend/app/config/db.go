package config

import (
	"fmt"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var (
	db *gorm.DB
)

func InitDatabase() {
	var err error
	mysqlUser := os.Getenv("MYSQL_USER")
	mysqlPassword := os.Getenv("MYSQL_PASSWORD")

	// FOR RDS DATABASE CHANGE TO @tcp(mysql:3306) for local and also baseAxios
	dataSourceName := fmt.Sprintf("%s:%s@tcp(liftbro-rds.cxk5ezdbakhc.ap-southeast-1.rds.amazonaws.com:3306)/liftbro?charset=utf8mb4&parseTime=True&loc=Local",
		mysqlUser, mysqlPassword)
	// docker exec -it backend-mysql-1 mysql -u liftbro -p
	// If you are using a local database
	// dbUser := os.Getenv("DB_USER")
	// dataSourceName := fmt.Sprintf("%s:%s@tcp(localhost:3307)/liftbro?charset=utf8mb4&parseTime=True&loc=Local",
	//  	dbUser, mysqlPassword)
	db, err = gorm.Open(mysql.Open(dataSourceName), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to database")
	}
	fmt.Println("Database connection successfully opened")

	MigrateAndSeedDB(db)
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
	sqlFile, err := os.ReadFile(filePath)
	if err != nil {
		return err
	}

	// Execute the SQL statements in the file
	statements := string(sqlFile)
	db.Exec(statements)
	return nil
}
