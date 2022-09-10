package controllers

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"

	"backend/models"

	"github.com/davecgh/go-spew/spew"
	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis/v8"
)

var RC *redis.Client
var ctx = context.Background()
var logger *log.Logger

func init() {
	RC = newClient()
	logger = log.New(os.Stdout, "DEBUG ", log.Ldate|log.Ltime)
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
	// allEmps := []models.Employee{{AD: "11111", Name: "张三"}, {AD: "22222", Name: "李四"}}
	ADList, _ := RC.SMembers(ctx, "employee").Result()
	// ADNum, _ := RC.SCard(ctx, "employee").Result()
	//spew.Dump(ADList)
	var employee models.Employee
	emps := make([]models.Employee, 0)
	for _, AD := range ADList {
		//logger.Println("i=" + strconv.Itoa(i))
		// logger.Println("AD=" + AD)
		empData, _ := RC.HGetAll(ctx, AD).Result()
		// spew.Dump(empData)
		jsonstr, _ := json.Marshal(empData)
		// spew.Dump(jsonstr)

		json.Unmarshal(jsonstr, &employee)
		// spew.Dump(employee)
		emps = append(emps, employee)
		// spew.Dump(emps)
	}

	c.IndentedJSON(200, emps)
	//allEmps := []emp{{AD: "11111", NAME: "张三"}}
	//c.JSON(http.StatusOK, gin.H{
	//	{"ad":   "11111",
	//	"name": "all",},
	//})

}

func CreateEmployee(c *gin.Context) {
	var emp models.Employee
	emp.AD = c.PostForm("AD")
	emp.Name = c.PostForm("Name")
	var m map[string]interface{}

	err2 := c.BindJSON(&emp)
	if err2 != nil {
		return
	}
	logger.Println("emp{", emp.AD, ",", emp.Name, "}")
	logger.Println("m=[", m, "]")
	err := RC.SAdd(ctx, "employee", emp.AD).Err()
	if err != nil {
		panic(err)
	}
	err1 := RC.HMSet(ctx, emp.AD, map[string]string{"AD": emp.AD, "Name": emp.Name}).Err()
	if err1 != nil {
		panic(err)
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "OK",
	})

	logger.Println("SAdd")
	// var args []interface{} = []interface{}{"72934"}
	// var kvs map[string]interface{} = map[string]interface{}{"ad": "72934", "name": "章仁偉"}
	// for key, value := range kvs {
	// 	args = append(args, key, value)
	// }
	// data := make(map[string]interface{})
	// data["ad"] = "72934"
	// data["name"] = "章仁偉"
	// val, err := RC.Get(ctx, "key").Result()
	// if err != nil {
	// 	panic(err)
	// }
	// logger.Println("get suc")
	// fmt.Println("key", val)
	// logger.Println("CreateEmployee")
	// logger.Println("val=" + val)
}

func DelEmployeeByAd(c *gin.Context) {
	logger.Println("DelEmployeeByAd")
	var emp models.Employee
	emp.AD = c.Param("AD")
	logger.Println("emp{", emp.AD, ",", emp.Name, "}")
	// val, err1 := RC.SPop(ctx, emp.AD).Result()
	// err2 := RC.Del(ctx, emp.AD).Err()
	cmds, err := RC.Pipelined(ctx, func(pipe redis.Pipeliner) error {
		pipe.SRem(ctx, "employee", emp.AD)
		pipe.Del(ctx, emp.AD)
		return nil
	})
	// spew.Dump(val)
	// spew.Dump(err1)
	// spew.Dump(err2)
	spew.Dump(cmds)
	spew.Dump(err)

	c.JSON(http.StatusOK, gin.H{
		"message": "OK",
	})
}
