import React,{Component,Fragment} from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/layouts/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import axios from 'axios';
import Alert from './components/layouts/Alert';
import About from './components/pages/About';

class App extends Component {
  
  state = {
    users: [],
    user: {},
    loading: false,
    alert : null
  }

  searchUsers = async (text) => {
    this.setState({loading:true});
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_FINDER_CLIENTID}&client_secret=${process.env.REACT_APP_GITHUB_FINDER_CLIENTSECRET}`);
    this.setState({users: res.data.items,loading:false});
  }

  getUser = async (username) =>{
    this.setState({loading:true});
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_FINDER_CLIENTID}&client_secret=${process.env.REACT_APP_GITHUB_FINDER_CLIENTSECRET}`);
    this.setState({user: res.data,loading:false});
  }

  setAlertMessage = (alert) => {
    this.setState({alert : alert});
  }

  async componentDidMount(){
    this.setState({loading:true});
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_FINDER_CLIENTID}&client_secret=${process.env.REACT_APP_GITHUB_FINDER_CLIENTSECRET}`);
    this.setState({users: res.data,loading:false});
  }

  render(){
    return (
      <Router>
      <div className="App">
        
        <Navbar title="Github"></Navbar>
        <div className="container">
          <Alert alert = {this.state.alert}></Alert>
          <Switch>
            <Route exact path="/" render={
              props => (
                <Fragment>
                  <Search searchUsers={this.searchUsers} setAlertMessage = {this.setAlertMessage}></Search>
                  <Users loading={this.state.loading} users={this.state.users} />
                </Fragment>
              )
            }>
            </Route>
            <Route exact path="/about" component={About}></Route>
            <Route exact path="/users/:username"
              render = {
                props => (
                  <User {...props} user={this.state.user} getUser = {this.getUser} loading={this.state.loading}></User>
                )
              }
            ></Route>
          </Switch>
          
        </div>
        
      </div>
      </Router>
    );
  }
}

export default App;
