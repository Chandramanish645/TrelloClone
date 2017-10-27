import React from 'react'
import { Card, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import {Link} from 'react-router-dom'

const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
  isPending,
  isSuccess,
  isError
}) => (
  <Card className='container'>
    <form action='/' onSubmit={onSubmit}>
      <h2 className='card-heading'>Sign Up</h2>
      {isPending && <div className='processing-message'>Please wait...</div> }
      {isSuccess && <div className='success-message'>Success.</div> }
      {isError && <div className='error-message'>{isError}</div> }
      {(errors.length > 0) && <p className='error-message'>{errors}</p>}

      <div className='field-line'>
        <TextField
          floatingLabelText='Name'
          name='name'
          errorText={errors.name}
          onChange={onChange}
          value={user.name}
        />
      </div>

      <div className='field-line'>
        <TextField
          floatingLabelText='Email'
          name='email'
          errorText={errors.email}
          onChange={onChange}
          value={user.email}
        />
      </div>

      <div className='field-line'>
        <TextField
          floatingLabelText='Password'
          type='password'
          name='password'
          onChange={onChange}
          errorText={errors.password}
          value={user.password}
        />
      </div>

      <div className='button-line'>
        <RaisedButton type='submit' label='Create New Account' primary />
      </div>

      <CardText>Already have an account? <Link to={'/login'}>Log in</Link></CardText>
    </form>
  </Card>
)

export default SignUpForm