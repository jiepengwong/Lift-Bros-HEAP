package services

import (
	// "time"
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/jiepengwong/Lift-Bros-HEAP/app/config"
	"github.com/jiepengwong/Lift-Bros-HEAP/app/models"
	// "gorm.io/gorm"
)

func GetUser(c *fiber.Ctx) error {
	db := config.GetDB()
	username := c.Params("username")
	var user models.User // creates a null User
	if err := db.First(&user, "username = ?", username).Error; err != nil {
		return err
	}
	c.JSON(user)
	return nil
}

func GetUsers(c *fiber.Ctx) error {
	db := config.GetDB()
	var users []models.User
	if err := db.Find(&users).Error; err != nil {
		return err
	}
	c.JSON(users)
	return nil
}

func CreateUser(c *fiber.Ctx) error {
	db := config.GetDB()
	user := new(models.User) // creates a pointer to a null User
	if err := c.BodyParser(user); err != nil {
		return err
	}
	if err := db.Create(user).Error; err != nil {
		return err
	}
	c.JSON(user)
	return nil
}

func UpdateUser(c *fiber.Ctx) error {
	db := config.GetDB()
	username := c.Params("username")
	var user models.User
	if err := db.First(&user, "username = ?", username).Error; err != nil {
		return err
	}
	updatedUser := new(models.User) // creates a pointer to a null User
	if err := c.BodyParser(updatedUser); err != nil {
		return err
	}
	if updatedUser.Password != "" {
		user.Password = updatedUser.Password
	}
	if updatedUser.Name != "" {
		user.Name = updatedUser.Name
	}
	if !updatedUser.DOB.IsZero() {
		user.DOB = updatedUser.DOB
	}
	if updatedUser.PhoneNo != "" {
		user.PhoneNo = updatedUser.PhoneNo
	}
	if updatedUser.Email != "" {
		user.Email = updatedUser.Email
	}

	// Save the changes in the database
	if err := db.Save(&user).Error; err != nil {
		return err
	}

	c.SendString("Update User")
	return nil
}

func DeleteUser(c *fiber.Ctx) error {
	// Delete user logic
	db := config.GetDB()
	username := c.Params("username")
	var user models.User
	db.First(&user, "username = ?", username)
	if user.Username == "" {
		err := fmt.Errorf("user (username: %s) not found in database", username)
		c.Status(400).SendString(err.Error())
		return err
	}
	db.Delete(user)
	c.SendString("Delete User")
	return nil
}
