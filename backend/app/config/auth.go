package config

import (
	"os"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
)

var secretKey = os.Getenv("SECRET_KEY")

func AuthMiddleware() fiber.Handler {
	return func(c *fiber.Ctx) error {
		// Get the JWT token from the request header
		jwtCookie := c.Cookies("jwt")

		// Validate the token
		token, err := jwt.Parse(jwtCookie, func(token *jwt.Token) (interface{}, error) {
			// Provide the same signing key used to sign the token
			return []byte(secretKey), nil
		})

		// Handle token validation errors
		if err != nil || !token.Valid {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"message": "Unauthorized",
			})
		}

		// storing claims in local context to be used by other handlers
		claims := token.Claims.(jwt.MapClaims) 
		// claims.exp, claims.iss
		c.Locals("authUser", claims["iss"])

		// Continue to the next handler if the token is valid
		return c.Next()
	}
}
