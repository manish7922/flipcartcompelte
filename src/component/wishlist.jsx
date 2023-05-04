import React, { Component } from "react";
import authServices from "../services/authServices";
import httpService from "../services/httpService";
import { FaTimes, FaTrash } from "react-icons/fa";
import "./wishlist.css"
import { Link } from "react-router-dom";

export default class Wishlist extends Component {
  state = {
    Wishlist: [],
  };
  async fetchData1() {
    let user = authServices.getToken();
    console.log(user);
    let token = user.token;
    try {
      let response = await httpService.get1(`/wishList`);
      let { data } = response;
      this.setState({ wishlist: data });
    } catch (error) {
      if (error.response && error.response.status === 401) {
      } else {
        window.alert("login please");
      }
    }
  }

  componentDidMount() {
    this.fetchData1();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) this.fetchData1();
  }
  async deleteData(url){
let response= await httpService.deleteApi1(url);
console.log(response);
this.props.history.push("/wishlist")
  }

  handleDelete=(id)=>{
    this.deleteData(`/wishlist/${id}`)
  }

  render() {
    let {wishlist}=this.state
    console.log(wishlist);
    return (
        <div className="setWidthWish">
            {wishlist?.map((n)=>(
                <div className="row m-2 border-bottom setRowWish">
                    <div className="col-3 setImageClass">
                        <div className="" style={{width:"100px",height:"100px"}}>
                        <img src={n.img} alt=""  className="imgWishList"  />
                        </div>
                    </div>
                    <div className="col-6 setcolomWishListFor">
                            <div className="row">
                              <div
                                className="col"
                                style={{ fontSize: "16px", cursor: "pointer" }}
                              >
                                <Link
                                  to={`#`}
                                  className="text-dark prodName"
                                  style={{ textDecoration: "none" }}
                                >
                                  <span tabIndex="0">{n.name}</span>
                                </Link>
                              </div>
                            </div>
                            <span
                              style={{
                                lineHeight: "normal",
                                display: "inline-block",
                                color: "#fff",
                                padding: "2px 4px 2px 6px",
                                borderRadius: "3px",
                                fontWeight: "500",
                                fontSize: "12px",
                                verticalAlign: "middle",
                                backgroundColor: "#388e3c",
                              }}
                            >
                              <strong>
                                {n.rating}{" "}
                                <img
                                  src={
                                    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg=="
                                  }
                                />
                              </strong>
                            </span>
                            {"  "}
                            {n.assured && (
                              <img
                                className="img-fluid"
                                style={{ width: "70px" }}
                                src="https://i.ibb.co/t8bPSBN/fa-8b4b59.png"
                              />
                            )}

                            <div className="row">
                              <div className="col" style={{ fontSize: "25px" }}>
                                <strong>₹{n.price}</strong>
                                {"  "}

                                <span
                                  style={{
                                    textDecoration: "line-through",
                                    fontSize: "14px",
                                    color: "#878787",
                                  }}
                                >
                                  {n.prevPrice}
                                </span>
                                {"  "}
                                <span
                                  style={{
                                    color: "#388e3c",
                                    fontSize: "13px",
                                    fontWeight: "500",
                                  }}
                                >
                                  {n.discount}% off
                                </span>
                              </div>
                            </div>
                          </div>
                    <div className="col-2" style={{textAlign:"right"}}>
                        <FaTrash  style={{color:"red",textAlign:"right",marginTop:"2em",cursor:"pointer"}}  onClick={()=>this.handleDelete(n.id)} />
                    </div>
                </div>
            ))}
        </div>
    )
  }
}
