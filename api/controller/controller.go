package controller

// Controller godoc
type Controller struct {
}

// NewController godoc
func NewController() *Controller {
	return &Controller{}
}

// Message godoc
type Message struct {
	Message string `json:"message" example:"message"`
}
