package server

import (
	"anidex/internal/models"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

const (
	baseUrl string = "https://api.jikan.moe/v4"
)

func getCurrentSeasonAnime(ctx *gin.Context) {
	res, err := http.Get(fmt.Sprintf("%s/seasons/now", baseUrl))

	if err != nil {
		ctx.JSON(http.StatusNoContent, gin.H{
			"msg": "Failed to retrieve anime data",
		})
	}

	// read response body as bytes
	responseData, err := ioutil.ReadAll(res.Body)
	if err != nil {
		ctx.JSON(http.StatusNoContent, gin.H{
			"msg": "Failed to retrieve anime data",
		})
	}

	// parse body into SeasonalAnimeResponse object
	var responseObject models.HomeAnimeResponse
	json.Unmarshal(responseData, &responseObject)

	// parse object back into JSON
	out, err := json.Marshal(responseObject)
	if err != nil {
		ctx.JSON(http.StatusNoContent, gin.H{
			"msg": "Failed to retrieve anime data",
		})
	}

	ctx.JSON(http.StatusOK, json.RawMessage(string(out)))
}

func getTopAnime(ctx *gin.Context) {
	res, err := http.Get(fmt.Sprintf("%s/top/anime", baseUrl))

	if err != nil {
		ctx.JSON(http.StatusNoContent, gin.H{
			"msg": "Failed to retrieve top anime data",
		})
	}

	// read response body as bytes
	responseData, err := ioutil.ReadAll(res.Body)
	if err != nil {
		ctx.JSON(http.StatusNoContent, gin.H{
			"msg": "Failed to retrieve top anime data",
		})
	}

	// parse body into SeasonalAnimeResponse object
	var responseObject models.HomeAnimeResponse
	json.Unmarshal(responseData, &responseObject)

	// parse object back into JSON
	out, err := json.Marshal(responseObject)
	if err != nil {
		ctx.JSON(http.StatusNoContent, gin.H{
			"msg": "Failed to retrieve top anime data",
		})
	}

	ctx.JSON(http.StatusOK, json.RawMessage(string(out)))

}

func getAnimeById(ctx *gin.Context) {
	id := ctx.Param("id")
	res, err := http.Get(fmt.Sprintf("%s/anime/%s/full", baseUrl, id))

	if err != nil {
		ctx.JSON(http.StatusNoContent, gin.H{
			"msg": "Failed to retrieve anime data",
		})
	}

	// read response body as bytes
	responseData, err := ioutil.ReadAll(res.Body)
	if err != nil {
		ctx.JSON(http.StatusNoContent, gin.H{
			"msg": "Failed to retrieve anime data",
		})
	}

	// parse body into SeasonalAnimeResponse object
	var responseObject models.DetailedAnimeResponse
	json.Unmarshal(responseData, &responseObject)

	// parse object back into JSON
	out, err := json.Marshal(responseObject)
	if err != nil {
		ctx.JSON(http.StatusNoContent, gin.H{
			"msg": "Failed to retrieve anime data",
		})
	}

	ctx.JSON(http.StatusOK, json.RawMessage(string(out)))
}

func getSearchAnime(ctx *gin.Context) {
	search := ctx.Query("q")
	search = strings.Replace(search, " ", "%20", -1)

	res, err := http.Get(fmt.Sprintf("%s/anime?q=%s", baseUrl, search))
	if err != nil {
		ctx.JSON(http.StatusNoContent, gin.H{
			"msg": "Failed to retrieve anime data",
		})
	}
	// read response body as bytes
	responseData, err := ioutil.ReadAll(res.Body)
	if err != nil {
		ctx.JSON(http.StatusNoContent, gin.H{
			"msg": "Failed to retrieve anime data",
		})
	}

	// parse body into SeasonalAnimeResponse object
	var responseObject models.SearchAnimeResponse
	json.Unmarshal(responseData, &responseObject)

	// parse object back into JSON
	out, err := json.Marshal(responseObject)
	if err != nil {
		ctx.JSON(http.StatusNoContent, gin.H{
			"msg": "Failed to retrieve anime data",
		})
	}

	ctx.JSON(http.StatusOK, json.RawMessage(string(out)))
}
