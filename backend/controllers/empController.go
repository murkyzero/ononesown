package controllers

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

type emp struct {
	AD   string `json:"ad"`
	NAME string `json:"name"`
}

func GetEmployeeByAd(c *gin.Context) {
	logger := log.New(os.Stdout, "DEBUG", log.Ldate|log.Ltime)
	logger.Println("GetEmployeeByAd")
	ad := c.Param("ad")
	if ad != "" {
		c.JSON(http.StatusOK, gin.H{
			"ad":   ad,
			"name": ad,
		})
		return
	}
}

func GetEmployees(c *gin.Context) {
	allEmps := []emp{{AD: "11111", NAME: "张三"}, {AD: "22222", NAME: "李四"}}
	//allEmps := []emp{{AD: "11111", NAME: "张三"}}
	c.IndentedJSON(200, allEmps)
	//c.JSON(http.StatusOK, gin.H{
	//	{"ad":   "11111",
	//	"name": "all",},
	logger := log.New(os.Stdout, "DEBUG", log.Ldate|log.Ltime)
	logger.Println("GetEmployees")
	//})

}

func CreateEmployee(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"ad":   "12345",
		"name": "create",
	})
	logger := log.New(os.Stdout, "DEBUG", log.Ldate|log.Ltime)
	logger.Println("CreateEmployee")
}
