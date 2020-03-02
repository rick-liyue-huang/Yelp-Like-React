import React, { Component, Fragment } from 'react';
import ErrorToast from '../../components';
import './style.css';
import { actions as appActions,  getError } from '../../redux/modules/app';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class App extends Component {
  render () {
    const { error, appActions: {clearError} } = this.props; 
    return (
      <Fragment className='App'>
        {
          error ? 
          <ErrorToast msg={error} clearError={clearError}/> :
          null
        }
        
      </Fragment>
    )
  }
}

const mapStateToProps = (state, props) => ({
  error: getError(state)
})

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(appActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
