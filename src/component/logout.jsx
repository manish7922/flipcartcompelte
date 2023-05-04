import React, { Component } from 'react'
import authServices from '../services/authServices';

export default class Logout extends Component {

    async componentDidMount() {
        authServices.removeToken();
    //    window.location(`/home`);
        window.location = "/home";
      }

  render() {
    return (
      <div>LOg/out</div>
    )
  }
}
