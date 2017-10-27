import {connect} from 'react-redux'
import LoginPage from '../react_reduxComponent/LoginPage'
import {setPending, setSuccess, setError} from '../actions/AuthenticationAction'
import axios from 'axios'
const ROOT_URL = 'http://localhost:3000'

export let login = (emailId, password, cb) => {
  console.log('Entry login emailId = ', emailId, '  password = ', password)
  return dispatch => {
    dispatch(setPending(true))
    dispatch(setSuccess(false))
    dispatch(setError(null))
    axios.post(`${ROOT_URL}/login`, {emailId, password})
    .then(response => {
      console.log('<LoginContainer SUCESS RESPONSE >response.msg = ', response.msg)
      dispatch(setPending(false))
      dispatch(setSuccess(true))
      console.log('User is authenticated, response = ', response)
      localStorage.setItem('user', JSON.stringify({
        name: response.data.name,
        email: response.data.email
      }))
      cb()
    })
    .catch(error => {
      console.log('<LoginContainer FAILURE RESPONSE> error.response = ', error)
      dispatch(setPending(false))
      dispatch(setSuccess(false))
      // dispatch(setError(error.response.data))
    })
  }
}
const mapStateToProps = (state) => {
  console.log('<LoginContainer, mapStateToProps> state = ', state)
  return {
    isPending: state.users.isPending,
    isSuccess: state.users.isSuccess,
    isError: state.users.isError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password, cb) => (
       dispatch(login(email, password, cb))
    )
  }
}

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)

export default LoginContainer