package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetEmployeeByAd(c *gin.Context) {
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
	c.JSON(http.StatusOK, gin.H{
		"ad":   "72934",
		"name": "levi",
	})

}

func CreateEmployee(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"msg": "createok",
	})
}
