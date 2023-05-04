import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { connect } from "react-redux";
import http from "../services/httpService";
import auth from "../services/authServices";
import "./link.css";
import {
  FaChevronDown,
  FaChevronUp,
  FaShoppingCart,
  FaHamburger,
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import Login from "./login";
// import "./navbarImageSet.css";

 class Navbar extends Component {
  state = {
    formData: { q: "", email: "", password: "" },
    formData1: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      phone: "",
    },
    logged: false,
    showForm: false,
    cart: [],
    showFaSet: false,
    searchTerm: "",
    products: [],
    accountInfoAdmin: [{ display: "Logout", link: "/logout" }],

  };

  async fetchData() {
    let response = await http.get("/products");
    console.log(response);
    let { data } = response;
    this.setState({ products: data });
  }

  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) this.fetchData();
  }

  handleChange = (e) => {
    let { currentTarget: input } = e;
    let formData = { ...this.state.formData };
    formData[input.name] = input.value;
    this.setState({ formData: formData, searchTerm: input.value });
  };
  handleChange1 = (e) => {
    let { currentTarget: input } = e;
    let formData1 = { ...this.state.formData1 };
    formData1[input.name] = input.value;
    this.setState({ formData1: formData1 });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("search");
    this.props.history.push(`/home/Mobiles?q=${this.state.formData.q}`);
  };

  setHamBurger = () => {
    this.setState((prevState) => {
      return { showFaSet: !prevState.showFaSet };
    });
  };

  showModal = () => {
    console.log("hyyy");
    this.setState({ showForm: true });
  };
  handleCloseForm = () => {
    this.setState({ showForm: false });
  };
  handleSubmitForm = (e) => {
    e.preventDefault();
    console.log(this.state.formData);
    let body = this.state.formData;
    this.postData("/user", body);
  };
  handleSubmitForm1 = (e) => {
    e.preventDefault();
    console.log(this.state.formData);
    let body = this.state.formData1;
    this.postData("/register", body);
  };

  async postData(url, obj) {
    try {
      let response = await http.post(url, obj);
      console.log(response);
      let { data } = response;
      console.log("log in ", data);
      //    console.log("token",token);
      console.log(data.payload);

      auth.storeToken(data);
      this.setState({ logged: true });
      window.location = "/";
      console.log(response);
    } catch (ex) {
      console.log(ex.response);
      let errMsg = `${ex.response.status} ${ex.response.statusText}`;
      this.setState({ errMsg: errMsg });
    }
  }

  render() {
    const {
      showForm,
      cart,
      showFaSet,
      searchTerm,
      products,
      accountInfoAdmin,
    } = this.state;
    const { q, email, password } = this.state.formData;
    const { totalCart, user } = this.props;
    console.log(user);
    console.log("searchTerm", searchTerm);

    // let filter=products.filter((n)=>n.name.startsWith(searchTerm));
    // console.log(filter);
    // const filteredProducts = products.filter((product) =>
    //   product.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    // );
    const filteredProducts = products.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
      <div className="">
        <div className="main-nav">
          <div className="row bg-primary m-1  rowSet">
            <div className="col-1">
              <div
                className="hamburger-menu"
                onClick={() => this.setHamBurger()}
              >
                <a href="#">
                  <GiHamburgerMenu style={{ color: "white" }} />
                </a>
              </div>
            </div>

            <div className="col-1">
              <div
                className={showFaSet ? "crossSet mobile-menu-link" : "crossSet"}
              >
                <span className="setCross" onClick={() => this.setHamBurger()}>
                  <span className="crossingSet"> X</span>
                </span>
              </div>
            </div>

            <div
              className=" d-xs-block col-2 mt-1 text-right  SetLogo"
              style={{ marginLeft: "3em", marginBottom: "1em" }}
            >
              <Link className="m-2" to="/">
                <img
                  src={"https://i.ibb.co/qs8BK6Y/flipkart-plus-4ee2f9.png"}
                />
              </Link>
              <br />
              <Link
                className="m-1 text-white"
                to="/"
                style={{ textDecoration: "none" }}
              >
                <span className="text-white font-italic">
                  Explore{" "}
                  <span className="text-warning font-italic"> Plus </span>
                </span>

                <img
                  src={"https://i.ibb.co/t2WXyzj/plus-b13a8b.png"}
                  style={{
                    width: "5%",
                    height: "auto",
                    textDecoration: "none",
                  }}
                />
              </Link>
            </div>

            <div
              className=" d-xs-block col-3 mt-2 text-right setInput"
              style={{ fontSize: "13px" }}
            >
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                    value={q}
                    className="form-control forsetValue"
                    type="search"
                    id="q"
                    name="q"
                    placeholder="Search for products, brand and more"
                    onChange={this.handleChange}
                  />
                </div>
              </form>
              {searchTerm.length > 0 && (
                <div className="dropdownMenu">
                  <div className="dropbtn">
                    <div className="dropdown-content">
                      {filteredProducts.map((m, index) => (
                        <div key={index} style={{ margin: "10px" }}>
                          <Link
                            className="text-dark"
                            to={`/home/${m.brand}/${m.id}`}
                          >
                            {m.name}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div
              className="col-lg-1 text-white mt-1 "
              style={{ fontSize: "13px", minHeight: "20px" }}
            >
              <div
                className={
                  showFaSet ? "menu-link mobile-menu-link" : "menu-link"
                }
              >
                {user ? (
                  <div className=" dropdown ml-2">
                    <div className="dropbtn1 row">
                      <span className="dropbtn-text">{user.name}</span>
                    </div>
                    <div className="dropdown-content1">
                      {this.state.accountInfoAdmin.map((m, index) => (
                        <div key={index}>
                          <Link className="text-dark" to={m.link}>
                            <span>{m.display}</span>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <button className="btnx" onClick={this.showModal}>
                    <span className="_3Bbtn">Login</span>
                  </button>
                )}
              </div>
            </div>

            {!user && (
              <div className=" col-2 text-white mt-3 text-center Seller">
                <span className="dropbtn">Become a Seller</span>
              </div>
            )}
            {user && (
              <div className=" col-2 text-white mt-3 text-center Seller">
                <Link to="/wishlist">
                  <span className="dropbtn"> WishList </span>{" "}
                </Link>
              </div>
            )}

            <div className=" col-1 text-white mt-3 text-center cartClass">
              <Link to="/checkout">
                <span className="dropbtn">
                  <span class="lill">
                    <FaShoppingCart />

                    {/* <div class="badge text-center ">
                      {totalCart > 0 && <span>{totalCart}</span>}
                    </div> */}
                  </span>
                  {"   "}Cart
                </span>
              </Link>
            </div>
          </div>
          <div>
            <div className="_331-kn _2tvxW">
              <div className="InyRMC _3Il5oO">
                <div className="_37M3Pb">
                  <div className="eFQ30H">
                    <Link to="/" style={{ textDecoration: "none" }}>
                      <div className="_1mkliO">
                        <div className="CXW8mj">
                          <img
                            className="_396cs4"
                            src="https://rukminim1.flixcart.com/flap/128/128/image/f15c02bfeb02d15d.png?q=100"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="xtXmba">Top Offers</div>
                    </Link>
                  </div>

                  <div className="eFQ30H">
                    <Link to="/" style={{ textDecoration: "none" }}>
                      <div className="_1mkliO">
                        <div className="CXW8mj">
                          <img
                            className="_396cs4"
                            src="https://rukminim1.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="xtXmba">Grocery</div>
                    </Link>
                  </div>

                  <div className="eFQ30H">
                    <a href="/allMobiles" style={{ textDecoration: "none" }}>
                      <div className="_1mkliO">
                        <div className="CXW8mj">
                          <img
                            className="_396cs4"
                            src="https://rukminim1.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png?q=100"
                            alt=""
                          />
                        </div>
                      </div>

                      <div className="xtXmba">Mobiles</div>
                    </a>
                  </div>

                  <div className="eFQ30H">
                    <Link to="/" style={{ textDecoration: "none" }}>
                      <div className="_1mkliO">
                        <div className="CXW8mj">
                          <img
                            className="_396cs4"
                            src="https://rukminim1.flixcart.com/fk-p-flap/128/128/image/d34810848b2895c9.png?q=100"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="xtXmba">Fashion</div>
                    </Link>
                  </div>

                  <div className="eFQ30H">
                    <Link to="/" style={{ textDecoration: "none" }}>
                      <div className="_1mkliO">
                        <div className="CXW8mj">
                          <img
                            className="_396cs4"
                            src="https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="xtXmba">Electronics</div>
                    </Link>
                  </div>
                  <div className="eFQ30H">
                    <Link to="/" style={{ textDecoration: "none" }}>
                      <div className="_1mkliO">
                        <div className="CXW8mj">
                          <img
                            className="_396cs4"
                            src="https://rukminim1.flixcart.com/flap/128/128/image/ab7e2b022a4587dd.jpg?q=100"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="xtXmba">Home</div>
                    </Link>
                  </div>

                  <div className="eFQ30H">
                    <Link to="/" style={{ textDecoration: "none" }}>
                      <div className="_1mkliO">
                        <div className="CXW8mj">
                          <img
                            className="_396cs4"
                            src="https://rukminim1.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png?q=100"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="xtXmba">Appliances</div>
                    </Link>
                  </div>

                  <div className="eFQ30H">
                    <Link to="/" style={{ textDecoration: "none" }}>
                      <div className="_1mkliO">
                        <div className="CXW8mj">
                          <img
                            className="_396cs4"
                            src="https://rukminim1.flixcart.com/flap/128/128/image/71050627a56b4693.png?q=100"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="xtXmba">Travel</div>
                    </Link>
                  </div>

                  <div className="eFQ30H">
                    <Link to="/" style={{ textDecoration: "none" }}>
                      <div className="_1mkliO">
                        <div className="CXW8mj">
                          <img
                            className="_396cs4"
                            src="https://rukminim1.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png?q=100"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="xtXmba">Beauty, Toys & Mor</div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Login
          showForm={showForm}
          formData1={this.state.formData1}
          formData={this.state.formData}
          handleClose={this.handleCloseForm}
          handleSubmit={this.handleSubmitForm}
          handleChange={this.handleChange}
          handleSubmit1={this.handleSubmitForm1}
          handleChange1={this.handleChange1}
        />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  console.log(state);
  const {  addToCompare } = state.flipkart;
  return { addToCompare };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      //console.log(id);
      //dispatch(toggleTodo(id))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar)