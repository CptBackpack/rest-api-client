import React, {Component} from 'react';
import Styles from './Login.module.css';
import axios from 'axios';
import Cookies from 'js-cookie'

class Login extends Component {
  error = <div className={Styles.error}>
    This combination of USERNAME and PASSWORD does not exist.
  </div>;
  state = {
    inputUsername: "",
    inputPassword: "",
    loggedIn: -1
  }

  constructor(props) {
    super();
   
  }

  loginHandler = () => {
    const username = !this.state.inputUsername
      ? "INVALID"
      : this.state.inputUsername;
    const password = !this.state.inputPassword
      ? "INVALID"
      : this.state.inputPassword;
    axios
      .post('http://localhost:3001/user/login/', {
      userLogin: username,
      userPassword: password
    })
      .then(response => {
        if (response.data.username === "INVALID") {
          this.setState({loggedIn: 0})
        } else {
          Cookies.set('apiClientUserName', response.data.username);
          Cookies.set('apiClientUserToken', response.data.authToken);
          this
            .props
            .loginHandler();
        }
      })
  }


  render() {
    return (
      <div>
        <div className={Styles.parent}>
          {this.state.loggedIn === 0
            ? this.error
            : null}
          <form >
            <div className={Styles.inputs}>
              <fieldset className={Styles.fieldset}>
                <legend className={Styles.legend}>LOGIN</legend>
                <input
                  className={Styles.input}
                  type="text"
                  name="firstname"
                  placeholder="USERNAME"
                  onChange=
                  {(event) => this.setState({inputUsername: event.target.value})}></input><br/>
                <input
                  className={Styles.input}
                  type="password"
                  name="firstname"
                  placeholder="PASSWORD"
                  onChange=
                  {(event) => this.setState({inputPassword: event.target.value})}></input><br/>
                <input
                  className={Styles.button}
                  type="button"
                  value="LOGIN"
                  onClick={this.loginHandler}></input>
              </fieldset>
            </div>
            <div className={Styles.control}></div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login;
