package services

import (
	"fmt"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"github.com/jiepengwong/Lift-Bros-HEAP/app/config"
	"github.com/jiepengwong/Lift-Bros-HEAP/app/models"
	"golang.org/x/crypto/bcrypt"
	// "gorm.io/gorm"
)

var secretKey = os.Getenv("SECRET_KEY")

func GetUser(c *fiber.Ctx) error {
	db := config.GetDB()
	username := c.Params("username")
	authUser := c.Locals("authUser")
	if authUser != username {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}
	var user models.User // creates a null User
	if err := db.First(&user, "username = ?", username).Error; err != nil {
		return err
	}
	return c.Status(fiber.StatusOK).JSON(user)
}

func GetUsers(c *fiber.Ctx) error {
	db := config.GetDB()
	var users []models.User
	if err := db.Find(&users).Error; err != nil {
		return err
	}
	return c.Status(fiber.StatusOK).JSON(users)
}

func CreateUser(c *fiber.Ctx) error {
	db := config.GetDB()
	newUser := new(models.NewUser) // creates a pointer to a null User
	if err := c.BodyParser(newUser); err != nil {
		return err
	}

	// Hashing password
	password, err := bcrypt.GenerateFromPassword([]byte(newUser.Password), bcrypt.DefaultCost) // DefaultCost = 10
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error hashing password",
		})
	}

	// Creating user object to assign to database
	user := new(models.User)
	user.Username = newUser.Username
	user.Password = password
	user.Name = newUser.Name
	user.DOB = newUser.DOB
	user.PhoneNo = newUser.PhoneNo
	user.Email = newUser.Email

	if err := db.Create(user).Error; err != nil {
		return err
	}
	return c.Status(fiber.StatusCreated).JSON(user)
}

func UpdateUser(c *fiber.Ctx) error {
	db := config.GetDB()
	username := c.Params("username")
	authUser := c.Locals("authUser")
	if authUser != username {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}
	var existingUser models.User
	if err := db.First(&existingUser, "username = ?", username).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	updatedUser := new(models.NewUser) // creates a pointer to a null User
	if err := c.BodyParser(updatedUser); err != nil {
		return err
	}
	if updatedUser.Password != "" {
		password, err := bcrypt.GenerateFromPassword([]byte(updatedUser.Password), bcrypt.DefaultCost) // DefaultCost = 10
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"message": "Error hashing password",
			})
		}
		existingUser.Password = password
	}
	if updatedUser.Name != "" {
		existingUser.Name = updatedUser.Name
	}
	if !updatedUser.DOB.IsZero() {
		existingUser.DOB = updatedUser.DOB
	}
	if updatedUser.PhoneNo != "" {
		existingUser.PhoneNo = updatedUser.PhoneNo
	}
	if updatedUser.Email != "" {
		existingUser.Email = updatedUser.Email
	}

	// Save the changes in the database
	if err := db.Save(&existingUser).Error; err != nil {
		return err
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "User successfully updated",
	})
}

func DeleteUser(c *fiber.Ctx) error {
	// Delete user logic
	db := config.GetDB()
	username := c.Params("username")
	authUser := c.Locals("authUser")
	if authUser != username {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}
	var user models.User
	db.First(&user, "username = ?", username)
	if user.Username == "" {
		err := fmt.Errorf("user (username: %s) not found in database", username)
		return c.Status(400).SendString(err.Error())
	}
	db.Delete(user)
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "User successfully deleted",
	})
}

func Login(c *fiber.Ctx) error {
	db := config.GetDB()
	login := new(models.NewUser)
	if err := c.BodyParser(login); err != nil {
		return err
	}

	// Check for valid user
	user := new(models.User)
	if err := db.First(user, "username = ?", login.Username).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid username",
		})
	}

	// Check password
	if err := bcrypt.CompareHashAndPassword(user.Password, []byte(login.Password)); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Incorrect password",
		})
	}

	// Create JWT token
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    user.Username,
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(), // 1 day
	})

	token, err := claims.SignedString([]byte(secretKey))

	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message": "could not login",
		})
	}

	// Store token in cookie
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.JSON(user)
}

func Logout(c *fiber.Ctx) error {
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"message": "Log out successful",
	})
}