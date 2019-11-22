import React, {Component} from 'react';
import './App.css';
import Login from './components/Login/Login';
import Main from './containers/main';
import Cookies from 'js-cookie'
import axios from 'axios';

class App extends Component {
  state = {
    loggedIn: 0,
    userName: "",
    authToken: ""
  }
  
  tokenCheckHandler = () => {
    axios
      .post('http://localhost:3001/user/checkUser/', {
      userLogin: this.state.userName,
      authToken: this.state.authToken
    })
      .then(response => {
       console.log(response.data);
        if (response.data.username === "EXPIRED") {
          this.setState({loggedIn: 0})
          Cookies.set('apiClientUserName', "");
          Cookies.set('apiClientUserToken', "");
        
        } else {
          if (!this.state.loggedIn) {
            this.setState({loggedIn: 1});       
           
          }
        }
      })
  }

  loggedInHandler = () => {
    this.setState({
      userName: Cookies.get('apiClientUserName'),
      authToken: Cookies.get('apiClientUserToken')
    }, function() {
      this.tokenCheckHandler();
    });

    
  }

  componentDidMount(){
    this.loggedInHandler();
  }
  render() {
    let Landing;
    if (this.state.loggedIn) {
      Landing = <Main tokenCheck={this.tokenCheckHandler}/>;
    } else {
      Landing = <Login loginHandler={this.loggedInHandler}/>
    }
    return (
      <div>
        {Landing}
      </div>
    )
  }
}

export default App;
