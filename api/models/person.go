package models

import (
	"errors"
	"log"
	"regexp"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres" // Blank import
)

// Person DB Model
type Person struct {
	gorm.Model
	Name     string `json:"name"`
	Age      int    `json:"age" binding:"required,numeric"`
	Ballance int64  `json:"ballance" binding:"required,numeric"`
	Email    string `gorm:"unique" json:"email"`
	Address  string `json:"address"`
}

var (
	errNameInvalid      = errors.New("name is empty")
	errAgeInvalid       = errors.New("age should be positive")
	errEmailInvalid     = errors.New("email not in valid format")
	errDuplicitEmail    = errors.New("email already exists")
	errPersonNotAdded   = errors.New("person could not be created")
	errPersonNotDeleted = errors.New("person could not be deleted")
	errPeopleNotFetched = errors.New("people could not be fetched")
)

// Validation godoc
func (p *Person) Validation() error {
	switch {
	case len(p.Name) == 0:
		return errNameInvalid
	case p.Age < 0:
		return errAgeInvalid
	case !emailFormat(p.Email):
		return errEmailInvalid
	case !duplicitEmail(p.Email):
		return errDuplicitEmail

	default:
		return nil
	}
}

// Insert godoc
func (p *Person) Insert() error {

	err := GetDB().Table("people").Create(&p).Error

	if err != nil {
		log.Println(err)
		return errPersonNotAdded
	}
	return nil
}

// GetPeople Return all the poepl in DB
func GetPeople(order string, sort string) ([]*Person, error) {

	// Set default values
	if order == "" {
		order = "asc"
	}
	if sort == "" {
		sort = "id"
	}

	people := make([]*Person, 0)
	err := GetDB().Table("people").Order(sort + " " + order).Find(&people).Error
	if err != nil {
		log.Println(err)
		return nil, errPeopleNotFetched
	}
	return people, nil
}

// Delete Remove from DB
func Delete(id int) error {
	var person Person
	err := GetDB().Table("people").Where("id = ?", id).Delete(&person).Error
	if err != nil {
		return errPersonNotDeleted
	}
	return nil
}

// DBMigrate will create and migrate the tables
func DBMigrate(db *gorm.DB) *gorm.DB {
	db.AutoMigrate(&Person{})
	return db
}

// Check if email is in proper format
func emailFormat(email string) bool {
	re := regexp.MustCompile("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
	if !re.MatchString(email) {
		return false
	}
	return true
}

func duplicitEmail(email string) bool {
	temp := &Person{}
	// Check for errors or duplicate emails
	err := GetDB().Table("people").Where("email = ?", email).First(temp).Error
	if err != nil && err != gorm.ErrRecordNotFound {
		return false
	}
	if temp.Email != "" {
		return false
	}
	return true
}
