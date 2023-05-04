import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AllMobiles from "./allMobiles";
import Home from "./home";
import Navbar from "./navbar";
import SinglePhone from "./singlePhone";
import Cart from "./cart";
import authServices from "../services/authServices";
import Wishlist from "./wishlist";
import Logout from "./logout";
import Comperssion from "./comperssion";

export default class MainComponent extends Component {
  state = {
    cart: [],
    comparelist:[],
  };

  handleAdd = (index) => {
    let s1 = { ...this.state };
    let myProduct = s1.cart[index];
    myProduct.quantity = myProduct.quantity + 1;
    let json1 = { ...myProduct };
    s1.cart[index] = json1;

    this.setState(s1);
  };

  handleMinus = (index) => {
    let myProduct = this.state.cart[index];

    if (myProduct.quantity == 1) {
      let s1 = { ...this.state };
      let Index = s1.cart.findIndex((n) => n.id === myProduct.id);
      console.log(Index);
      s1.cart.splice(Index, 1);
      this.setState(s1);
    } else {
      let s1 = { ...this.state };

      myProduct.quantity = myProduct.quantity - 1;
      let json1 = { ...myProduct };
      s1.cart[index] = json1;
      this.setState(s1);
    }
  };

  render() {
    let { cart,comparelist } = this.state;
    let user = authServices.getToken();
    console.log(user);
    let totalCart = cart.reduce((acc, curr) => acc + curr.quantity, 0);
    return (
      <div>
        <Navbar totalCart={totalCart} user={user} />
        <div className="">
          <Switch>
        
          <Route path="/logout" component={Logout} />
            <Route
              path="/wishlist"
              render={(props) => <Wishlist {...props} />}
            />
            <Route
              path="/checkout"
              render={(props) => (
                <Cart
                  {...props}
                  cart={cart}
                  onhandle={this.handleAdd}
                  onhandleMinus={this.handleMinus}
                />
              )}
            />



            <Route
              path="/home/:brand/:id"
              render={(props) => <SinglePhone {...props} cart={cart} />}
            />
            <Route
              path="/allMobiles"
              render={(props) => <AllMobiles {...props}  comparelist={comparelist} />}
            />
            <Route path="/compare"   render={(props) => <Comperssion {...props} cart={cart} />} />
            <Route path="/home" render={(props) => <Home {...props} />} />
            <Redirect form="/" to="/home" />
          </Switch>
        </div>
      </div>
    );
  }
}
