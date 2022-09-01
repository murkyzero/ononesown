package main

import (
	"backend/controllers"
	"backend/utils"

	"github.com/gin-gonic/gin"
)

func setupRouter() *gin.Engine {
	r := gin.Default() // init router with default mw (e.g. logging)

	user := r.Group("/api/v1/employee")
	{
		user.POST("/", controllers.CreateEmployee)
		user.GET("/:ad", controllers.GetEmployeeByAd)
		user.GET("/", controllers.GetEmployees)
	}
	return r
}

func main() {
	// setup router
	r := setupRouter()

	// get port from env or use default 8080
	port := utils.GetEnv("PORT", "80")

	// TODO: add ENV here (prod, dev, test) and setup router, server, db based on config

	// run http server
	r.Run(":" + port)
}
