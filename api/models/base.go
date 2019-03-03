package models

import (
	"fmt"
	"log"
	"os"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres" // Blank import
	"github.com/joho/godotenv"
)

var db *gorm.DB //database

func init() {

	err := godotenv.Load()

	if err != nil && os.Getenv("APP_ENV") == "dev" {
		log.Fatal("Error loading .env file")
	}

	username := os.Getenv("POSTGRES_USER")
	password := os.Getenv("POSTGRES_PASSWORD")
	dbName := os.Getenv("POSTGRES_DB")
	dbHost := os.Getenv("POSTGRES_HOST")

	dbURI := fmt.Sprintf("host=%s user=%s dbname=%s sslmode=disable password=%s", dbHost, username, dbName, password) //Build connection string
	fmt.Println(dbURI)

	conn, err := gorm.Open("postgres", dbURI)
	if err != nil {
		fmt.Print(err)
	}

	db = conn
	db.Debug().AutoMigrate(&Person{}) //Database migration
}

// GetDB returns a handle to the DB object
func GetDB() *gorm.DB {
	return db
}
