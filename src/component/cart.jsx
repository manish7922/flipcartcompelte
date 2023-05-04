import React, { Component } from "react";
import "./cart.css";
import { FaRupeeSign } from "react-icons/fa";
import auth from "../services/authServices";
import http from "../services/httpService";
export default class Cart extends Component {
    state={

    }

    handleOrder=()=>{
        const s1={...this.props.cart}
  let cart1=this.props.cart;
   let myProduct=cart1;
   this.postData("/orders",myProduct)
   this.setState({s1:[]})
    }

    async postData(url,obj){
        let user=auth.getToken();
    if(user){
        try {
            let response=await http.post1(url,obj);
            console.log(response);
            this.props.history.push(`/checkout`)
        } catch (error) {
            if (error.response && error.response.status === 401) {
               console.log(error);
              } else {
                console.log(error);
              }
        }
    } else{
        window.alert("login Please")
    }
   
    }

  render() {
    const { cart, onhandle, onhandleMinus } = this.props;
    let totalCart = cart.reduce((acc, curr) => acc + curr.quantity, 0);
    console.log(totalCart);
    let totalPrice = cart.reduce(
      (acc, curr) => acc + +curr.quantity * +curr.price,
      0
    );
    console.log(totalPrice);
    return (
      <div style={{ backgroundColor: "lightgrey" }}>
        {totalCart === 0 ? (
          <>
            <div className="row">
              <div className="col colomFirstCart">
                <img
                  src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
                  className="imgCart"
                />
              </div>
            </div>
            <div className="row">
              <div className="col colomFirstCart">
                <div className="cartMiss">Missing Cart items?</div>
                <div className="logMiss">
                  Login to see the items you added previously
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="row mt-5 pt-1">
            <div className="col-lg-8 col-12 bg-white ml-1 mr-1">
              <div className="row border bottom">
                <div
                  className="col-6"
                  style={{
                    fontSize: "18px",
                    lineHeight: "56px",
                    padding: "0 24px",
                    fontWeight: "500",
                  }}
                >
                  {totalCart != 0
                    ? `My Cart (${totalCart})`
                    : `Missing Cart items?`}
                </div>
              </div>
              {cart.length > 0 &&
                cart.map((c, i) => (
                  <>
                    <div className="row mt-1 bg-white">
                      <div className="col-lg-2 col-4">
                        <div className="row">
                          <div className="col text-center">
                            <img
                              src={c.img}
                              style={{ width: "50px", height: "92px" }}
                            />
                          </div>
                        </div>
                        <div className="row mt-1">
                          <div className="col-12 text-center">
                            <button
                              style={{
                                backgroundColor: "white",
                                borderColor: "#e0e0e0",
                                cursor: "auto",
                                cursor: "pointer",
                                fontSize: "12px",
                                borderRadius: "50%",
                                width: "28px",
                                height: "28px",
                              }}
                              onClick={() => onhandleMinus(i)}
                            >
                              -
                            </button>
                            <button
                              className="border pl-2 pr-2 mt-2"
                              style={{
                                width: "28px",
                                height:"28px",
                                fontWeight: 400,
                                borderRadius: "3px",
                                marginLeft: "2px",
                                marginRight: "2px",
                              }}
                            >
                              {c.quantity}
                            </button>
                            <button
                              style={{
                                backgroundColor: "white",
                                borderColor: "#e0e0e0",
                                cursor: "auto",
                                borderRadius: "50%",
                                cursor: "pointer",
                                fontSize: "12px",
                                width: "28px",
                                height: "28px",
                              }}
                              onClick={() => onhandle(i)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-5 col-4">
                        <div className="row">
                          <div
                            className="col"
                            style={{ fontSize: "16px", color: "#212121" }}
                          >
                            {c.name}
                          </div>
                        </div>
                        <div className="row">
                          <div
                            className="col"
                            style={{ color: "#878787", fontSize: "14px" }}
                          >
                            {c.brand}
                            {"   "}
                            {"   "}
                            <span>
                              {" "}
                              {"   "}
                              {c.assured && (
                                <img
                                  className="img-fluid"
                                  style={{ width: "70px" }}
                                  src={"https://i.ibb.co/t8bPSBN/fa-8b4b59.png"}
                                />
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col" style={{ fontWeight: "500" }}>
                            <FaRupeeSign /> {c.price}
                            {"  "}
                            <span
                              style={{
                                textDecoration: "line-through",
                                fontSize: "16px",
                                color: "#878787",
                              }}
                            >
                              {"  "}
                              <FaRupeeSign />
                              {c.prevPrice}
                            </span>
                            {"  "}
                            <span
                              style={{
                                color: "#388e3c",
                                fontSize: "16px",
                                fontWeight: "500",
                              }}
                            >
                              {"  "}
                              {c.discount}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-4">
                        <div className="row">
                          <div className="col" style={{ fontSize: "14px" }}>
                            Delivery in 2 days | Free{"   "}
                            <span style={{ textDecoration: "line-through" }}>
                              <FaRupeeSign /> 40
                            </span>
                          </div>
                        </div>
                        <div className="row">
                          <div
                            className="col"
                            style={{ fontSize: "12px", color: "grey" }}
                          >
                            10 Days Replacemnet Policy
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))}

              {totalCart > 0 ? (
                <div className="row mt-2">
                  <div className="col " style={{textAlign:"right"}}>
                    <button
                      className="btn btn-warning"
                      style={{ backgroundColor: "#fb641b", color: "white" }}
                      onClick={() => this.handleOrder()}
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="col-lg-3 col-12 ml-1">
                <div className="row bg-white">
                <div className="col">
                    <div
                      className="row border-bottom "
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#878787",
                        minHeight: "60px",
                      }}
                    >
                      <div className="col pt-2">Price Details</div>
                    </div>
                    <div className="row pt-2 pb-2">
                      <div className="col-6 text-left">
                        Price ({totalCart} items)
                  </div>
                      <div className="col-6 text-right">
                    <FaRupeeSign />
                        {totalPrice}
                      </div>
                    </div>
                    <div className="row pt-2 pb-2">
                      <div className="col-6 text-left">Delivery</div>
                      <div className="col-6 text-right text-success">Free</div>
                    </div>
                    <div
                      className="row pt-2 pb-2"
                      style={{
                        fontWeight: "500",
                        borderTop: "1px dashed #e0e0e0",
                        fontSize: "18px",
                      }}
                    >
                      <div className="col-6 text-left">Total Payable</div>
                      <div className="col-6 text-right ">{totalPrice}</div>
                    </div>
                  </div>
                </div>
                <div className="row mt-2 bg-white">
                  <div className="col-1">
                    <img
                      style={{ width: "25px" }}
                      src={
                        "https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/shield_435391.svg"
                      }
                    />
                  </div>
                  <div
                    className="col-9"
                    style={{
                      fontSize: "14px",
                      textAlign: "left",
                      fontWeight: "500",
                      display: "inline-block",
                      color: "#878787",
                    }}
                  >
                    Safe and Secure Payments. Easy returns. 100% Authentic Products.
              </div>
                </div> 
            </div>
          </div>
        )}
      </div>
    );
  }
}
