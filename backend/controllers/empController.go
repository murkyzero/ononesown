package controllers

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis/v8"
)

var RC *redis.Client
var ctx = context.Background()

type emp struct {
	AD   string `json:"ad"`
	NAME string `json:"name"`
}

func init() {
	RC = newClient()
}

func newClient() *redis.Client {
	client := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})

	pong, err := client.Ping(ctx).Result()
	log.Println(pong)
	if err != nil {
		log.Fatalln(err)
	}
	return client
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
	logger := log.New(os.Stdout, "DEBUG ", log.Ldate|log.Ltime)
	c.JSON(http.StatusOK, gin.H{
		"ad":   "12345",
		"name": "create",
	})
	err := RC.SAdd(ctx, "emp", "72934").Err()
	if err != nil {
		panic(err)
	}
	logger.Println("SAdd")
	// var args []interface{} = []interface{}{"72934"}
	// var kvs map[string]interface{} = map[string]interface{}{"ad": "72934", "name": "章仁偉"}
	// for key, value := range kvs {
	// 	args = append(args, key, value)
	// }
	// data := make(map[string]interface{})
	// data["ad"] = "72934"
	// data["name"] = "章仁偉"
	err1 := RC.HMSet(ctx, "72934", map[string]string{"ad": "72934", "name": "章仁偉"}).Err()
	if err1 != nil {
		panic(err)
	}
	val, err := RC.Get(ctx, "key").Result()
	if err != nil {
		panic(err)
	}
	logger.Println("get suc")
	fmt.Println("key", val)
	logger.Println("CreateEmployee")
	logger.Println("val=" + val)
}
