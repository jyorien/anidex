package server

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func setRouter() *gin.Engine {
	// create default gin router with Logger and Recovery middleware
	router := gin.Default()
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:5173"}
	config.AddAllowMethods("GET", "POST")

	router.Use(cors.New(config))
	api := router.Group("/api")

	// create anime route group
	anime := api.Group("/anime")
	anime.GET("/current-season", getCurrentSeasonAnime)
	anime.GET("/top", getTopAnime)
	anime.GET("/:id", getAnimeById)
	anime.GET("/search", getSearchAnime)

	router.NoRoute(func(ctx *gin.Context) { ctx.JSON(http.StatusNotFound, gin.H{}) })

	return router
}
