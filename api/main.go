package main

import (
	"flexera-test/controller"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// @title Swagger Example API
// @version 1.0
// @description This is a sample server celler server.
// @termsOfService http://swagger.io/terms/

// @contact.name API Support
// @contact.url http://www.swagger.io/support
// @contact.email support@swagger.io

// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html

// @host localhost:8080
// @BasePath /api/v1
func main() {

	port := os.Getenv("HTTP_PORT")
	if port == "" {
		port = "8000" //failsafe
	}

	r := gin.Default()
	c := controller.NewController()

	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowMethods = []string{"GET", "POST", "DELETE", "HEAD"}

	r.Use(cors.New(config))

	people := r.Group("/people")
	{
		people.GET("", c.GetPeople)
		people.POST("", c.CreatePerson)
		people.DELETE("", c.DeletePerson)
	}

	r.Run(":" + port)
}
