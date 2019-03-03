import React from 'react';
import { connect } from 'react-redux'
import ReactLoading from 'react-loading';

const ConnectedLoading = ({ loading }) => (loading ? <ReactLoading color="#4c4cff" /> : null);

const mapStateToProps = (state) => ({loading: state.loading})

const Loading = connect(mapStateToProps, null)(ConnectedLoading)
export default Loading
