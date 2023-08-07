package config

import (
	"os"
    "strings" // Import the strings package
	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
)

var secretKey = os.Getenv("SECRET_KEY")

func AuthMiddleware() fiber.Handler {
    return func(c *fiber.Ctx) error {
        // Get the JWT token from the "Authorization" header
        authHeader := c.Get("Authorization")
        if authHeader == "" {
            return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
                "message": "Unauthorized",
            })
        }

        // Extract the token from the header (assuming it's in the "Bearer" format)
        jwtToken := strings.Split(authHeader, "Bearer ")[1]

        // Validate the token
        token, err := jwt.Parse(jwtToken, func(token *jwt.Token) (interface{}, error) {
            // Provide the same signing key used to sign the token
            return []byte(secretKey), nil
        })

        // Handle token validation errors
        if err != nil || !token.Valid {
            return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
                "message": "Unauthorized",
            })
        }

        // Storing claims in local context to be used by other handlers
        claims := token.Claims.(jwt.MapClaims)
        c.Locals("authUser", claims["iss"])

        // Continue to the next handler if the token is valid
        return c.Next()
    }
}


func VerifyUser(c *fiber.Ctx, username string) error {
	authUser := c.Locals("authUser")
	if authUser != username {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Unauthorized",
		})
	}
	return nil
}
