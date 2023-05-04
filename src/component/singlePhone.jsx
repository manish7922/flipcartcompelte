import React, { Component } from "react";
import httpService from "../services/httpService";
import Review from "./review";
import PinCode from "./pincode";
import { Link } from "react-router-dom";
import "./single.css";
import authServices from "../services/authServices";
export default class SinglePhone extends Component {
  state = {
    imgId: 0,
    ViewProduct: {},
    allMobilesBrnad: {},
    show: false,
    list: [],
    errors:{},
    res:"",
    pinCodeData:''
  };

  async fetchData() {
    const { id } = this.props.match.params;
    let response = await httpService.get(`/product/${id}`);
    console.log(response);
    const { data } = response;
    this.setState({ ViewProduct: data });
  }

  async fetchData1() {
    let { brand } = this.props.match.params;
    let response = await httpService.get(`/mobile/${brand}`);
    console.log(response);
    const { data } = response;
    this.setState({ allMobilesBrnad: data });
  }
  async fetchData2() {
    let { id } = this.props.match.params;
    let response = await httpService.get(`/reviews/${id}`);
    console.log(response);
    const { data } = response;
    let data1 = data.list;
    console.log(data1);
    this.setState({ list: data.list });
  }
//    handlePincode=async(obj)=>{
//     let { id } = this.props.match.params;
 
//     console.log(obj);
//     try {
//         let response =await httpService.get(`/baseURl/products/${obj}/${id}`);
//         console.log(response);
//         let {data}=response;
//         this.setState({res:data}) 
//     } catch (ex) {
//         if (ex.response && ex.response.status === 401) {
//             let errors = {};
//             errors.pincode = ex.response.data;
//         console.log(errors)
//             this.setState({ errors: errors });   
//     }
//       }
//   }
  componentDidMount() {
    this.fetchData();
    this.fetchData1();
    this.fetchData2();
    // this.handlePincode();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) this.fetchData();
    if (prevProps !== this.props) this.fetchData1();
    if (prevProps !== this.props) this.fetchData2();
    // if (prevProps !== this.props) this.handlePincode();
  }

  handleImageId = (i) => {
    this.setState({ imgId: i });
  };

  handleCart=(id)=>{
    let user=authServices.getToken();
    if(user){
 console.log(id);
 const myProduct=this.state.ViewProduct;
 console.log(myProduct);
 let x1=this.props.cart.find((c)=>c.id===id);
 if(x1){
    x1.quantity=x1.quantity+1;
 }else{
         let quantity=1;
    let json1 = { ...myProduct,quantity:quantity };
    this.props.cart.push(json1);
    console.log("cartData",this.props.cart);
    this.props.history.push("/checkout")
    }
}
else{
    window.alert("login Please")
}
  }

//   handlePincode= async (obj)=>{
// console.log("pincode",obj);
// this.setState({pinCodeData:obj})
//   }
  render() {
    const { ViewProduct, allMobilesBrnad, imgId, list,res,errors,pinCodeData } = this.state;
    const { imgList = [], brandImg } = this.state.allMobilesBrnad;
    let imgData = imgList[imgId];
    const { id } = this.props.match.params;
    console.log(imgId);
    console.log(imgData);
    console.log("pinCodeData", pinCodeData);
    return (
      <div>
        <div className="row rowfirstClassSingle">
          <div
            className="col-lg-5 col-12 text-center "
            style={{ marginBottom: "1em" }}
          >
            <div className="row p-0">
              <div className="col-lg-2 text-center colomSetFirstSingle">
               
              {/* <div key={i} className={"row border ml-2 rowSetSingle"}>
                <div className="col leftsmallcard">
                  <img
                        src={a}
                        className="leftimgx"
                        onClick={() => this.handleImageId(i)}
                      />
                    </div>
                  </div> */}
                <div className="_35DpL-">
                    <div className="_2FHWw4" style={{}}>
                        <div className="_2mLllQ"style={{height:"448px"}}>
                            <ul className="_3GnUWp" style={{transform:" translateY(0px)",marginLeft:"-2em"}}>
                            {allMobilesBrnad.imgList?.map((a, i) => (
                                <li className="_20Gt85 _1Y_A6W" style={{height:"64px"}}>
                                  <div className="_1AuMiq P9aMAP">
                                    <div className="_2E1FGS">
                                        <img src={a} className="q6DClP" alt=""   onClick={() => this.handleImageId(i)} />
                                    </div>
                                    </div>  
                                </li>
               
                ))}
                             </ul>
                        </div>
                    </div>
                </div>
              </div>
              <div className="col-lg-8  secondpart">
                <img className="img-fluid1" src={imgData} />
              </div>
            </div>
            <div class="row">
              <div class="Abvf col-12-12">
                <div class="_1p3MFP dTTu2M">
                  <ul class="row ulRow">
                    <li class="col col-6-12">
                      <button
                        class="_2KpZ6l _2U9uOA _3v1-ww"
                        onClick={() => this.handleCart(ViewProduct.id)}
                      >
                        <svg
                          _ngcontent-wdj-c4=""
                          class="_1KOMV2"
                          height="16"
                          viewBox="0 0 16 15"
                          width="16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            _ngcontent-wdj-c4=""
                            class=""
                            d="M15.32 2.405H4.887C3 2.405 2.46.805 2.46.805L2.257.21C2.208.085 2.083 0 1.946 0H.336C.1 0-.064.24.024.46l.644 1.945L3.11 9.767c.047.137.175.23.32.23h8.418l-.493 1.958H3.768l.002.003c-.017 0-.033-.003-.05-.003-1.06 0-1.92.86-1.92 1.92s.86 1.92 1.92 1.92c.99 0 1.805-.75 1.91-1.712l5.55.076c.12.922.91 1.636 1.867 1.636 1.04 0 1.885-.844 1.885-1.885 0-.866-.584-1.593-1.38-1.814l2.423-8.832c.12-.433-.206-.86-.655-.86"
                            fill="#fff"
                          ></path>
                        </svg>
                        Add To Cart
                      </button>
                    </li>
                    <li class="col col-6-12">
                      <button
                        class="_2KpZ6l _2U9uOA ihZ75k _3AWRsL"
                        onClick={() => this.handleCart(ViewProduct.id)}
                      >
                        <span class="_3iRXzi"></span>
                        Buy Now
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row secondRowSetSingle">
              {/* {allMobilesBrnad.imgList?.map((a, i) => (
                <div className="col leftsmallcard">
                  <img
                    src={a}
                    className="leftimgx"
                    onClick={() => this.handleImageId(i)}
                  />
                </div>
              ))} */}
                            <div className="_35DpL-">
                    <div className="_2FHWw4" style={{}}>
                        <div className="_2mLllQ">
                            <ul className="_3GnUWp2" style={{transform:" translateY(0px)",marginLeft:"-2em"}}>
                            {allMobilesBrnad.imgList?.map((a, i) => (
                                <li className="_20Gt85 _1Y_A6W" style={{height:"64px"}}>
                                  <div className="_1AuMiq P9aMAP">
                                    <div className="_2E1FGS">
                                        <img src={a} className="q6DClP" alt=""   onClick={() => this.handleImageId(i)} />
                                    </div>
                                    </div>  
                                </li>
               
                ))}
                             </ul>
                        </div>
                    </div>
                </div>
            </div>
          </div>
          <div className="col-lg-7 col-12  setColomforSingle " style={{overflowY:"scroll"}}>
            <>
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
                    <span tabIndex="0">{ViewProduct.name}</span>
                  </Link>
                </div>
              </div>
              <div className="row">
                <div className="col">
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
                      {ViewProduct.rating}{" "}
                      <img
                        src={
                          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg=="
                        }
                      />
                    </strong>
                  </span>
                  {"  "}
                  <span className="text-muted">{ViewProduct.ratingDesc}</span>
                </div>
              </div>

              <div className="row" style={{ fontSize: "14px" }}>
                <div className="col text-success">
                  <b>{ViewProduct.exchange}</b>{" "}
                </div>
              </div>
              <div className="row">
                <div className="col" style={{ fontSize: "25px" }}>
                  <strong>₹{ViewProduct.price}</strong>
                  {"  "}
                  <span>
                    <span
                      style={{
                        textDecoration: "line-through",
                        fontSize: "14px",
                        color: "#878787",
                      }}
                    >
                      {ViewProduct.prevPrice}
                    </span>
                    {"  "}
                    <span
                      style={{
                        color: "#388e3c",
                        fontSize: "13px",
                        fontWeight: "500",
                      }}
                    >
                      {ViewProduct.discount}%
                    </span>
                    {"  "}
                    {ViewProduct.assured && (
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
                <div
                  className="col"
                  style={{
                    fontWeight: "500",
                    fontSize: "16px",
                    color: "#212121",
                    marginTop: "8px",
                  }}
                >
                  Available Offers
                </div>
              </div>
              {ViewProduct.offers?.map((n) => (
                <div className="row">
                  <div className="col">
                    <img src={n.img} width="18" height="18" />
                    <span
                      className=""
                      style={{ fontWeight: "500", paddingRight: "4px" }}
                    >
                      {n.type}
                    </span>
                    <span>{n.detail}</span>
                  </div>
                </div>
              ))}
            </>
            <PinCode  id={id} />
            <>
              <div className="row mt-2">
                <div className="col-2 fourthrowx">
                  <img className="imgxx" src={brandImg} />
                </div>
                <div className="col-8 fourthrowy mt-1">
                  Brand Warranty of 1 Year Available for Mobile and 6 Months for
                  Accessories
                </div>
              </div>

              <div
                className="row mt-2"
                style={{ marginTop: "2em", padding: "24px 0px 0px" }}
              >
                <div className="col-1 fifthrowx">Highights</div>
                <div className="col-5 fifthrowy">
                  <ul>
                    {ViewProduct.details?.map((a, i) => (
                      <li className="lixx" key={i}>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-2 fifthrowx">Easy Payment Options</div>
                <div className="col-4 ">
                  <ul>
                    <li className="lixx">
                      <span>No cost EMI/month</span>
                    </li>
                    <li className="lixx">
                      <span>Debit/Flipkart EMI available</span>
                    </li>
                    <li className="lixx">
                      <span>Cash on Delivery</span>
                    </li>
                    <li className="lixx">
                      <span>Net Banking {"&"} Credit/Debit/ATM Card</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-1 fifthrowx">Seller</div>
                <div className="col-lg-9 ">
                  <span className="throwy">SuperComNet</span>
                  <span className="throwz">
                    4.2 {"    "}
                    <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg==" />
                  </span>
                  <ul className="">
                    <li className="lixx">
                      <span>10 Day Replacement</span>
                    </li>
                  </ul>
                </div>
                <div className="row">
                  <div className="col">
                    <img
                      className="imglast"
                      src={"https://i.ibb.co/j8CMRbn/CCO-PP-2019-07-14.png"}
                    />
                  </div>
                </div>
              </div>

              {this.state.list.length === 0 ? (
                ""
              ) : (
                <>
                  <Review list={list} mobileId={id} />
                </>
              )}
            </>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
}
