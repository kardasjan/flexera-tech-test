package controller

import (
	"errors"
	"flexera-test/models"
	"flexera-test/utils"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// CreatePerson godoc
// @Summary Add person to DB
// @Description Add new person from body
// @Tags people
// @Accept  json
// @Produce  json
// @Param person body models.Person true "Person to add"
// @Success 200 {object} models.Person
// @Failure 400 {object} utils.HTTPError
// @Failure 404 {object} utils.HTTPError
// @Failure 500 {object} utils.HTTPError
// @Router /people [post]
func (c *Controller) CreatePerson(ctx *gin.Context) {

	person := &models.Person{}

	if err := ctx.ShouldBindJSON(&person); err != nil {
		utils.NewError(ctx, http.StatusBadRequest, err)
		return
	}
	if err := person.Validation(); err != nil {
		utils.NewError(ctx, http.StatusBadRequest, err)
		return
	}
	err := person.Insert()
	if err != nil {
		utils.NewError(ctx, http.StatusBadRequest, err)
		return
	}
	ctx.JSON(http.StatusOK, person)
}

// GetPeople godoc
// @Summary Get people from DB
// @Description Get all people with a possibility to sort by email or name
// @Tags people
// @Accept  json
// @Produce  json
// @Param sort query string false "Sort by column"
// @Param order query string false "Order by asc/desc"
// @Success 200 {array} models.Person
// @Failure 400 {object} utils.HTTPError
// @Failure 404 {object} utils.HTTPError
// @Failure 500 {object} utils.HTTPError
// @Router /people [get]
func (c *Controller) GetPeople(ctx *gin.Context) {
	sort := ctx.Query("sort")
	order := ctx.Query("order")

	people, err := models.GetPeople(order, sort)
	if err != nil {
		utils.NewError(ctx, http.StatusNotFound, err)
		return
	}
	ctx.JSON(http.StatusOK, people)
}

// DeletePerson godoc
// @Summary Remove person from DB
// @Description Remove person with ID
// @Tags people
// @Accept  json
// @Produce  json
// @Param id query int true "User ID"
// @Success 200 {object} models.Person
// @Failure 400 {object} utils.HTTPError
// @Failure 404 {object} utils.HTTPError
// @Failure 500 {object} utils.HTTPError
// @Router /people [delete]
func (c *Controller) DeletePerson(ctx *gin.Context) {
	id := ctx.Query("id")

	if id == "" {
		utils.NewError(ctx, http.StatusBadRequest, errors.New("id query parameter is required"))
	}

	// Check if id is a number
	aid, err := strconv.Atoi(id)
	if err != nil {
		utils.NewError(ctx, http.StatusBadRequest, err)
		return
	}

	err = models.Delete(aid)
	if err != nil {
		utils.NewError(ctx, http.StatusNotFound, err)
		return
	}
	ctx.JSON(http.StatusNoContent, gin.H{})
}
