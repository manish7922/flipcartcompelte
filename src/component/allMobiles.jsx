import React, { Component } from "react";
import { Link } from "react-router-dom";
import http from "../services/httpService";
import auth from "../services/authServices";
import { connect } from "react-redux";
import queryString from "query-string";
import "./link.css";
import "./allMobiles.css";
import { FaAngleLeft, FaAngleRight, FaHeart } from "react-icons/fa";
import { addforComparison } from './redux/Actions/actions';
import LeftPanelForm from "./leftPanelForm";
 class AllMobiles extends Component {
  state = {
    AllMobiles: [],
    brandData: ["Mi", "RealMe", "Samsung", "OPPO", "Apple"],
    ramData: [
      { name: "6 GB and More", value: ">=6" },
      { name: "4 GB", value: "<=4" },
      { name: "3 GB", value: "<=3" },
      { name: "2 GB", value: "<=2" },
    ],
    ratingData: [
      { name: "4", value: "4" },
      { name: "3", value: "3" },
      { name: "2", value: "2" },
      { name: "1", value: "1" },
    ],
    priceData: [
      { name: "0-5,000", value: "0-5000" },
      { name: "5,000-10,000", value: "5000-10000" },
      { name: "10,000-20,000", value: "10000-20000" },
      { name: "More than 20,000", value: "20000" },
    ],
    ramTrue: false,
    ratingTrue: false,
    priceTrue: false,
    currentPage: 1,
    pageSize: 5,
  };

  async fetchData() {
    let queryParams = queryString.parse(this.props.location.search);
    let searchStr = this.makeSearchString(queryParams);
    const { category, brand } = this.props.match.params;
    let response = await http.get(`/productsData?${searchStr}`);
    console.log("response", response);
    let { data } = response;
    this.setState({ AllMobiles: data });
  }

  async fetchData1() {
    let user = auth.getToken();
    console.log(user);
    let token = user.token;
    try {
      let response = await http.get1(`/wishList`);
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
    this.fetchData();
    this.fetchData1();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) this.fetchData();
    if (prevProps !== this.props) this.fetchData1();
  }

  handleLike = (id) => {
    let s1 = { ...this.state };
    let myWishList = s1.AllMobiles.find((n) => n.id === id);
    console.log(myWishList);
    this.postData("/wishList", myWishList);
    this.setState(s1);
  };

  async postData(url, obj) {
    let user = auth.getToken();
    console.log(user);
    let token = user.token;
    let queryParams = queryString.parse(this.props.location.search);
    let searchStr = this.makeSearchString(queryParams);

    try {
      let response = await http.post1(url, obj);
      console.log(response);
      this.props.history.push(`/allMobiles`);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.alert("login please");
      } else {
        window.alert("login please");
      }
    }
  }

  handleComparisonChange = (obj) => {
    console.log(obj);
    this.props.onAddtoCompareClick(obj);

  }
  handlePage = (p) => {
    this.setState({ currentPage: this.state.currentPage + p });
  };

  handleOptionChange = (options) => {
    const { category, brand } = this.props.match.params;
    options.page = 1;
    this.callURL(`/home/${category}/${brand}`, options);
    this.setState({currentPage:1})
  };
  callURL = (url, options) => {
    let searchString = this.makeSearchString(options);
    this.props.history.push({
      pathName: url,
      search: searchString,
    });
  };

  makeSearchString = (options) => {
    let { ram, rating, price, brand } = options;
    let searchStr = "";
    searchStr = this.addToQueryString(searchStr, "brand", brand);
    searchStr = this.addToQueryString(searchStr, "ram", ram);
    searchStr = this.addToQueryString(searchStr, "rating", rating);
    searchStr = this.addToQueryString(searchStr, "price", price);

    console.log("searchStr", searchStr);
    return searchStr;
  };

  addToQueryString = (str, paramName, paramValue) =>
    paramValue
      ? str
        ? `${str}&${paramName}=${paramValue}`
        : `${paramName}=${paramValue}`
      : str;

  render() {
    const { ramData, ratingData, priceData, brandData,AllMobiles,currentPage,pageSize } = this.state;
    console.log(this.state.AllMobiles);
    let queryParams = queryString.parse(this.props.location.search);
    let comparelist = this.props.addToCompare;

        let dealPage = [];
    let maxPage;
    if (AllMobiles) {
      maxPage = Math.ceil(AllMobiles.length / pageSize);
      let startIndex = (currentPage - 1) * pageSize;
      let DealsData = [...AllMobiles];
      dealPage = DealsData.splice(startIndex, pageSize);
      console.log(dealPage);
    }

    return (
    <>
      <div className="row firstRowM">
        <div className="col-3 colomfirst">
          <LeftPanelForm
            ramData={ramData}
            ratingData={ratingData}
            priceData={priceData}
            brandData={brandData}
            options={queryParams}
            onOptionChange={this.handleOptionChange}
          />
        </div>
        <div className="col-9 colomSecond">
          <div className="row rowsetWitbreadcrumb ">
            <div className="col">
              <nav className="navbarClass">
                <ol className="breadcrumb bg-white">
                  <li className="breadcrumb-item">
                    <Link to="/home" className="LinkClass">
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to={"/allMobiles"} className="LinkClass">
                      allMobiles
                    </Link>
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          <div>
            {dealPage.map((a, index) => (
              <div key={index} className="border-bottom setimage w-100">
                <div className="row mb-2 rowSetClassFor">
                  <div className="col-lg-2 col-9 text-center setColomView">
            
                      <img src={a.img} tabIndex="0" />
                      <div className="row setFormComapre">
                      <form>
                              <label>
                                <input
                                  name="compare"
                                  type="checkbox"
                                  checked={(comparelist.findIndex(obj => obj.id === a.id)) !== -1}
                                  onChange={() => this.handleComparisonChange(a)} />

                                <span className="_6Up2sF">Add to Compare</span>
                              </label>
                            </form>
                      </div>
                
                  </div>
                  <div className="col-lg-1 col-2 text-secondary wishList">
                    <FaHeart
                      onClick={() => this.handleLike(a.id)}
                      style={{ cursor: "pointer" }}
                      className={
                        this.state.wishlist &&
                        this.state.wishlist.findIndex(
                          (obj) => obj.id === a.id
                        ) !== -1
                          ? " text-danger"
                          : ""
                      }
                    />
                  </div>
                  <div className="col-lg-5 col-12 text-left colomFiveView">
                    <div className="row rowFiveSetView">
                      <div className="col fiveColomFirst" style={{}}>
                        <Link
                          to={`/home/${a.brand}/${a.id}`}
                          className="text-dark prodName"
                          style={{ textDecoration: "none" }}
                        >
                          <span tabIndex="0">{a.name}</span>
                        </Link>
                      </div>
                    </div>
                    <div className="row rowTwoFiveSetView">
                      <div className="col colomSecondSetView">
                        <span className="spanFirstClass">
                          <strong>
                            {a.rating}{" "}
                            <img
                              src={
                                "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg=="
                              }
                            />
                          </strong>
                        </span>
                        {"  "}
                        <span className="text-muted">{a.ratingDesc}</span>
                      </div>
                    </div>
                    <div className="row rowsetReview">
                 <div className="col">
                      {a.details.map((d) => (
                      <ul key={d} className="setunOrderList" style={{}}>
                        <li>{d}</li>
                      </ul>
                    ))}
                    </div>
                    </div>
                  
                  </div>

                  <div className="col-lg-3  colomLastView">
                    <div className="row rowFiveColomView">
                      <div className="col colomSetfiveView" style={{}}>
                        <strong>
                          <i className="fa fa-inr" aria-hidden="true" />
                          {a.price}
                        </strong>
                        {"  "}
                        <span>
                          {"  "}
                          {a.assured && (
                            <img
                              className="img-fluid"
                              style={{ width: "70px" }}
                              src="https://i.ibb.co/t8bPSBN/fa-8b4b59.png"
                            />
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <span
                          style={{
                            textDecoration: "line-through",
                            fontSize: "14px",
                            color: "#878787",
                          }}
                        >
                          {a.prevPrice}
                        </span>
                        {"  "}
                        <span
                          style={{
                            color: "#388e3c",
                            fontSize: "13px",
                            fontWeight: "500",
                          }}
                        >
                          {a.discount}%
                        </span>
                      </div>
                    </div>
                    <div className="row rowExchange" style={{ }}>
                      <div className="col">{a.exchange}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
             <div className="row setnextWidth">
            <div className="col-3">
            <button
                        className="spanFirstClassReviw m-2"
                        disabled={currentPage === 1}
                        onClick={() => this.handlePage(-1)}
                      >
                   prev
                      </button>
            </div>
            <div className="col-3">
    
    </div>
    <div className="col-3 ">
    <button
                        className="spanFirstClassReviw m-2"
                        onClick={() => this.handlePage(1)}
                        disabled={
                          currentPage === Math.ceil(AllMobiles.length / pageSize)
                        }
                      >
                    next
                      </button>

          </div>
        </div>

          </div>
        </div>
      </div>
{ this.props.addToCompare && this.props.addToCompare.length > 0 ?  (
       <div className="_3vtB3Y">
        <div className="x-O15Q">
       <Link className="_11o22n _87aCMT" to="/compare">
        <span className="_3hShhO">
          <span>COMPARE</span>
        </span>
        <div className="_3D32sd">
       <span className="MxXpTK B2jtqc _3SPq6V">{this.props.addToCompare.length}</span>
        </div>
       </Link>
        </div>
      </div>
      ):("")}
    </>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log(state);
  const { addToCompare } = state.flipkart;
  return { addToCompare };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddtoCompareClick: (obj) => {
      dispatch(addforComparison(obj))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllMobiles)
