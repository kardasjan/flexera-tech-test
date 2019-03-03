import React, { Component } from "react"
import { connect } from "react-redux"
import { Form, Button, Modal } from "react-bootstrap"
import { addPerson as actionAddPerson } from "../actions/index"

class ConnectedAddPerson extends Component {
  constructor() {
    super()
    this.state = {
      name: "",
      age: 0,
      email: "",
      ballance: 0,
      address: "",
      show: false
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  onSubmit(event) {
    event.preventDefault()
    const { name, age, email, ballance, address } = this.state
    const { addPerson } = this.props
    addPerson({ name, age: parseInt(age, 10), email, ballance: parseInt(ballance, 10), address })
    this.setState({ name: "", age: 0, email: "", ballance: 0, address: "" })
    this.handleClose()
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value })
  }

  handleClose() {
    this.setState({ show: false })
  }

  handleShow() {
    this.setState({ show: true })
  }

  render() {
    const { name, age, email, ballance, address, show } = this.state
    const ModalBody = () => (
      <Form>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={name} onChange={this.handleChange} />
        </Form.Group>

        <Form.Group controlId="age">
          <Form.Label>Age</Form.Label>
          <Form.Control type="number" value={age} onChange={this.handleChange} />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={this.handleChange} />
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" value={address} onChange={this.handleChange} />
        </Form.Group>

        <Form.Group controlId="ballance">
          <Form.Label>Ballance</Form.Label>
          <Form.Control type="text" value={ballance} onChange={this.handleChange} />
        </Form.Group>
      </Form>
    )
    return (
      <div className="wrapper">
        <Button variant="primary" onClick={this.handleShow}>
          Add Person
        </Button>

        <Modal size="lg" show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Person</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            { ModalBody() }
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.onSubmit}>
              Add Person
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addPerson: person => dispatch(actionAddPerson(person))
  }
}

const AddPerson = connect(null, mapDispatchToProps)(ConnectedAddPerson)
export default AddPerson
