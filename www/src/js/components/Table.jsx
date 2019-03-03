import React, { Component } from "react"
import { connect } from "react-redux"
import { getPeople as actionGetPeople } from "../actions/index"
import TableRow from "./TableRow"
import Loading from "./Loading";

class ConnectedTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sort: "id",
      order: "asc"
    }
  }

  componentDidMount() {
    const { getPeople } = this.props
    const { order, sort } = this.state 
    getPeople(order, sort)
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value })
  }

  render() {
    const { people, loading } = this.props
    if (loading) {
      return ( <Loading /> )
    }
    if (!people.length) {
      return ( <p>There are no people in DB.</p> )
    }

    const rows = people.map((item) =>
        <TableRow person={item} key={item.ID} />
    );

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th >Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Address</th>
            <th>Ballance</th>
            <th>Check</th>
          </tr>
        </thead>
        <tbody>
          { rows }
        </tbody>
      </table>
    )
  }
}

function mapStateToProps(state) {
  return {
    people: state.people,
    loading: state.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPeople: (order, sort) => dispatch(actionGetPeople(order, sort))
  };
}

const Table = connect(mapStateToProps, mapDispatchToProps)(ConnectedTable)
export default Table
