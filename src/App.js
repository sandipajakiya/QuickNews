import './App.css';

import React, { Component } from 'react'  //'rcc' command for class base componet
import NavBar from './Components/NavBar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
}from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
// import Home from './Components/home';


export default class App extends Component {
  pageSize=8;
  apikey= process.env.REACT_APP_NEWS_API
  clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY

  state = {
    progress:0
  }
  setProgress = (progress) => {
    this.setState({progress: progress})
  }
  render() {
    return (
      <Router>
      <div>
      <NavBar/>
      <LoadingBar
      height={3}
        color='#f11946'
        progress={this.state.progress}
      />
      <Routes>
      <Route path="/" element={<Navigate to="/Home" />} />
      <Route exact path="/Home" element={<News setProgress={this.setProgress} apikey={this.apikey} key="general" pageSize={this.pageSize} country="in" category="general" />} />
      <Route exact path="/business" element={<News setProgress={this.setProgress} apikey={this.apikey} key="business" pageSize={this.pageSize} country="in" category="business" />} /> 
      <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apikey={this.apikey} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" />} /> 
      <Route exact path="/health" element={<News setProgress={this.setProgress} apikey={this.apikey} key="health" pageSize={this.pageSize} country="in" category="health" />} /> 
      <Route exact path="/science" element={<News setProgress={this.setProgress} apikey={this.apikey} key="science" pageSize={this.pageSize} country="in" category="science" />} /> 
      <Route exact path="/sports" element={<News setProgress={this.setProgress} apikey={this.apikey} key="sports" pageSize={this.pageSize} country="in" category="sports" />} /> 
      <Route exact path="/technology" element={<News setProgress={this.setProgress} apikey={this.apikey} key="technology" pageSize={this.pageSize} country="in" category="technology" />} />   
      {/* <Route exact path="/login" element={<Home setProgress={this.setProgress} apikey={this.clerkPubKey} key="login" />} />    */}
      </Routes>
      </div>
      </Router>
    )
  }
}
