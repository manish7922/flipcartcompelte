import React, { Component } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import httpService from "../services/httpService";
import "./deals.css";
export default class Deals extends Component {
  state = {
    currentPage: 1,
    pageSize: 4,
    products: [],
    screenWidth: window.innerWidth,
  };

  async fetchData() {
    let response = await httpService.get("/deals");
    console.log(response);
    const { data } = response;
    this.setState({ products: data });
  }

  componentDidMount() {
    this.fetchData();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    this.setState({ screenWidth: window.innerWidth });
  };

  handlePage = (p) => {
    this.setState({ currentPage: this.state.currentPage + p });
  };


  render() {
    let {
      currentPage,
      pageSize,
      products,
      screenWidth,
      currentProductIndex,
      numProductsDisplayed,
    } = this.state;

    console.log("screenWidth", screenWidth);
    let dealPage = [];

    if (products) {
      if (screenWidth <= 500) {
        pageSize = 1;
        let startIndex = (currentPage - 1) * pageSize;
        let DealsData = [...products];
        dealPage = DealsData.splice(startIndex, pageSize);
      } else if (screenWidth <= 600) {
        pageSize = 2;
        let startIndex = (currentPage - 1) * pageSize;
        let DealsData = [...products];
        dealPage = DealsData.splice(startIndex, pageSize);
      } else if (screenWidth < 900) {
        let startIndex = (currentPage - 1) * pageSize;
        console.log(startIndex);
        // end = Math.min(end + 1, products.length);
        pageSize = Math.min(pageSize, 3);
        console.log(pageSize);
        let DealsData = [...products];
        dealPage = DealsData.splice(startIndex, pageSize);
      }else{
        let startIndex = (currentPage - 1) * pageSize;
        let DealsData = [...products];
        dealPage = DealsData.splice(startIndex, pageSize);
      }
      // let DealsData = [...products];
      // dealPage = DealsData.slice(start, pageSize);
      // console.log(dealPage);
    }

    // let dealPage = [];
    // let maxPage;
    // if (products) {
    //   maxPage = Math.ceil(products.length / pageSize);
    //   let startIndex = (currentPage - 1) * pageSize;
    //   let DealsData = [...products];
    //   dealPage = DealsData.splice(startIndex, pageSize);
    //   console.log(dealPage);
    // }
    return (
      <>
        <div
          style={{
            backgroundColor: "white",
            width: "97%",
            marginLeft: "1em",

          }}
        >
          <div
            className="row "
            style={{ backgroundColor: "white", width: "97%" }}
          >
            <div
              className="col-9 colomFirst"
              style={{
         
              }}
            >
              <b>Deals Of the Day</b>
              <div
                className=""
                style={{
                  borderBottom: "1px solid lightgrey",
           
                  lineHeight: "32px",
                }}
              >
                {this.state.products && (
                  <div className="row ml-1 rowset">
                    <div
                      className="col-1 text-right"
                
                    >
                      <button
                        className="leftButton"
                        disabled={currentPage === 1}
                        onClick={() => this.handlePage(-1)}
                      >
                        <FaAngleLeft />
                      </button>
                    </div>

                    {dealPage.map((d, i) => (
                      <div
                        className="col-lg-2 col-3 text-center colomSet"
                        key={i}
                      >
                        {/* <div className="row ml-lg-3"> */}
                        <Link to={`/home/${d.brand}/${d.id}`}>
                          <img src={d.img} />
                        </Link>
               
                        <div
                          className="row ml-1 nameSet"
                          style={{}}
                        >
                          {d.name.substring(0, 21)}...
                        </div>
                        <div className="row rowsecondSet">
                          <div
                            className="col"
                            style={{ }}
                          >
                            {d.discount}% Off
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="col-1 text-right">
                      <button
                        className="rightButton"
                        onClick={() => this.handlePage(1)}
                        disabled={
                          currentPage === Math.ceil(products.length / pageSize)
                        }
                      >
                        <FaAngleRight />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-2 colomTwoSet" style={{ backgroundColor: "white" }}>
              <div className="p-2  ">
                <img
                  src="https://i.ibb.co/1GBrRnn/fa04c5362949d9f1.jpg"
                  className="imgSet"
                  alt=""
                  style={{}}
                />
              </div>
            </div>
          </div>
          <div
            className="row ml-1 mt-1 rowLast"
            style={{
              backgroundColor: "",
              borderBottom: "10px solid lightgrey",
            }}
          >
            <div className="col-4 rowLastColomfirst text-center" style={{ marginBottom: "4px" }}>
              <img
                src="https://i.ibb.co/dPVHZGW/d5db30a716f82657.jpg"
                alt=""
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div className="col-4 rowLastColomfirst">
              <div className="m-1">
                <img
                  src="https://i.ibb.co/Lzz36zB/31efaad41a3e4208.jpg"
                  alt=""
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
            <div className="col-4 rowLastColomfirst">
              <div className="">
                <img
                  src="https://i.ibb.co/fGX7sFh/4e219998fadcbc70.jpg"
                  alt=""
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
          </div>
          <div className="row rowSetLastImage">
            <div className="col-12">
              <img src="https://rukminim1.flixcart.com/fk-p-flap/844/140/image/d56f1b3ba81e3188.jpg?q=50" alt="" />
            </div>
          </div>
        </div>
      </>
    );
  }
}
