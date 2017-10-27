import React from 'react'
import SignUpForm from '../react_reduxComponent/SignUpForm.js'

class SignUpPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      errors: {},
      user: {
        email: '',
        name: '',
        password: ''
      }
    }

    this.processForm = this.processForm.bind(this)
    this.changeUser = this.changeUser.bind(this)
  }

  changeUser (event) {
    const field = event.target.name
    const user = this.state.user
    user[field] = event.target.value

    this.setState({
      user
    })
  }

  processForm (event) {
    event.preventDefault()
    if (this.isValidInput()) {
      this.setState({
        errors: ''
      })
      this.props.register(this.state.user.email, this.state.user.name, this.state.user.password, () => {
        this.props.history.push('/login')
      })
    } else {
      this.updateError()
    }
  }

  isValidInput () {
    if (this.state.user.email.length > 0 &&
        this.state.user.password.length > 0 &&
        this.state.user.name.length > 0) {
      return true
    }
    return false
  }

  updateError () {
    if (this.state.user.email.length === 0) {
      this.setState({
        errors: 'Missing Email'
      })
    } else if (this.state.user.name.length === 0) {
      this.setState({
        errors: 'Missing Name'
      })
    } else {
      this.setState({
        errors: 'Missing Password'
      })
    }
  }
  render () {
    return (
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
        isPending={this.props.isPending}
        isSuccess={this.props.isSuccess}
        isError={this.props.isError}
      />
    )
  }
}

export default SignUpPage