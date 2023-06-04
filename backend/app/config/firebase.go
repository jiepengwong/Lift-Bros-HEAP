package config

import (
	"context"
	"fmt"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/auth"
	"github.com/gofiber/fiber/v2"
	gofiberfirebaseauth "github.com/sacsand/gofiber-firebaseauth"
	"google.golang.org/api/option"
)

var (
	FirebaseApp *firebase.App
	AuthClient *auth.Client
)

func ConfigureFirebase(app *fiber.App) (error) {
	opt := option.WithCredentialsFile("../../serviceAccountKey.json")
	firebaseApp, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		return fmt.Errorf("error initializing app: %v", err)
	}
	app.Use(
		gofiberfirebaseauth.New(
			gofiberfirebaseauth.Config{
				// New firebase authentication object
				// Mandatory. Default: nil
				FirebaseApp:  firebaseApp,

				// Ignore urls array - Format = "{METHOD} follwed by :: then /{route}"
				// Optional. Default: nil
				IgnoreUrls : []string{"POST::/user/login","POST::/user"},

				// Skip Email Check.
				// Optional. Default: nil
				CheckEmailVerified : false,

				// Ignore email verification for these routes
				// Optional. Default: nil
				CheckEmailVerifiedIgnoredUrls :  []string{"POST::/user/login","POST::/user"},

				// Authorizer defines a function which authenticates the Authorization token and returns 
				// the authenticated token
				// Optional. Default: nil
				Authorizer: authenticateToken,
				// Context key to store user information from the token into context.
				// Optional. Default: "user".
				ContextKey : "authUser",
			}))
	return nil
}

func authenticateToken(IDToken string, CurrentURL string) (*auth.Token, error) {
	// This function should validate the IDToken and return the authenticated token
	// Step 1: Verify the IDToken using the Firebase SDK
	AuthClient, err := FirebaseApp.Auth(context.Background())
	if err != nil {
		return nil, fmt.Errorf("failed to initialize Firebase Auth client: %v", err)
	}

	token, err := AuthClient.VerifyIDToken(context.Background(), IDToken)
	if err != nil {
		return nil, fmt.Errorf("failed to verify ID token: %v", err)
	}
	fmt.Println("IDToken: ", IDToken)
	fmt.Println("CurrentURL: ", CurrentURL)
	// return nil, nil
	return token, nil
}


