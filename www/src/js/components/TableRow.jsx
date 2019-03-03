import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import { Form, Modal, Button } from 'react-bootstrap'
import { deletePerson as actionDeletePerson, checkPerson as actionCheckPerson } from "../actions/index"

class ConnectedTableRow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      show: false,
    };

    this.handleDelete = this.handleDelete.bind(this)
    this.isChecked = this.isChecked.bind(this)
    this.toggleChecked = this.toggleChecked.bind(this)
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleDelete() {
    // event.preventDefault()
    const { person, deletePerson } = this.props
    deletePerson(person.ID)
    this.handleClose()
    if (this.isChecked()) this.toggleChecked()
  }

  isChecked() {
    const { checkedPeople, person } = this.props
    return checkedPeople.includes(person.ID)
  }

  toggleChecked() {
    const { checkedPeople, person, checkPerson } = this.props
    const index = checkedPeople.indexOf(person.ID)
    if (checkedPeople.includes(person.ID)) {
      checkPerson([ ...checkedPeople.slice(0, index), ...checkedPeople.slice(index + 1) ])
    } else {
      checkPerson([ ...checkedPeople, person.ID ])
    }
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleClose() {
    this.setState({ show: false });
  }

  render() {
    const { person } = this.props
    const { show } = this.state
    const ConfirmModal = () => (
      <div className="wrapper">
        <Button variant="danger" onClick={this.handleShow}>
          Delete
        </Button>
        <Modal size="sm" show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>Close</Button>
            <Button variant="danger" onClick={this.handleDelete}>Delete</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
    return (
      <tr>
        <td>{ person.ID }</td>
        <td>{ person.name }</td>
        <td>{ person.age }</td>
        <td>{ person.email }</td>
        <td>{ person.address }</td>
        <td>{ person.ballance }</td>
        <td><Form.Check defaultChecked={this.isChecked()} onClick={this.toggleChecked}/></td>
        <td>{ ConfirmModal() }</td>
      </tr>
    )
  }
}


ConnectedTableRow.propTypes = {
  person: PropTypes.shape({
    ID: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    ballance: PropTypes.number.isRequired
  }).isRequired
}

function mapStateToProps(state) {
  return {
    checkedPeople: state.checkedPeople
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deletePerson: (id) => dispatch(actionDeletePerson(id)),
    checkPerson: (checkedPeople) => dispatch(actionCheckPerson(checkedPeople))
  }
}

const TableRow = connect(mapStateToProps, mapDispatchToProps)(ConnectedTableRow)
export default TableRow
