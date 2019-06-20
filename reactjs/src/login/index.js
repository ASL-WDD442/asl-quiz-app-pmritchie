import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import RRPropTypes from 'react-router-prop-types';
import styles from './styles.module.css';
import AuthContainer from '../containers/auth';

// eslint-disable-next-line react/prefer-stateless-function
class Login extends React.Component {
  state = {
    username: '',
    password: '',
  }

  componentDidMount() {
    const { location, verifySlackCode } = this.props;
    // get the query params from the url query string
    const queryParams = new URLSearchParams(location.search);
    // get the code if there is one from slack
    const code = queryParams.get('code');
    // if there is code verify it
    if (code) verifySlackCode(code);
  }

  handleInputChange = (event) => {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value,
    });
  }

  loggin = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const { login } = this.props;
    console.log(username, password);
    await login(username, password);
  }

  render() {
    const { redirectToSlack, loggedIn, errors } = this.props;
    if (loggedIn) return <Redirect to="/admin/quizzes" />;

    return (
      <React.Fragment>
        <h1 className={styles.heading}>Login</h1>
        <form method="POST" className={styles.form} onSubmit={this.loggin}>
          <label className={styles.form__label} htmlFor="username">
            <span>Username</span>
            <input type="email" name="username" onChange={this.handleInputChange} className={styles.form__input} />
          </label>
          <label className={styles.form__label} htmlFor="password">
            <span>Password</span>
            <input type="password" name="password" onChange={this.handleInputChange} className={styles.form__input} />
          </label>
          <button type="submit" className={styles.button}>Login</button>
          {errors
                  && errors.map(error => (
                    <small className={styles.flash}>{error.msg}</small>
                  ))}
        </form>

        <div>
          <button type="button" onClick={redirectToSlack} className={styles.button__slack}>
            <i className="fab fa-slack" />
            <span>Login with Slack</span>
          </button>
        </div>
      </React.Fragment>
    );
  }
}


Login.propTypes = {
  loggedIn: PropTypes.bool,
  redirectToSlack: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  verifySlackCode: PropTypes.func.isRequired,
  location: RRPropTypes.location.isRequired,
  errors: PropTypes.arrayOf(PropTypes.array),
};
Login.defaultProps = {
  loggedIn: false,
  errors: [],
};

export default AuthContainer(Login);
