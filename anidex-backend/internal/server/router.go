package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func setRouter() *gin.Engine {
	// create default gin router with Logger and Recovery middleware
	router := gin.Default()

	api := router.Group("/api")

	// create anime route group
	anime := api.Group("/anime")
	anime.GET("/current-season", getCurrentSeasonAnime)
	anime.GET("/:id", getAnimeById)

	router.NoRoute(func(ctx *gin.Context) { ctx.JSON(http.StatusNotFound, gin.H{}) })

	return router
}
