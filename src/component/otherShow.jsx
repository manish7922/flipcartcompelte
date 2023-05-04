import React, { Component } from 'react'
import "./show.css"
import { withRouter } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import httpService from "../services/httpService";
 class OtherShow extends Component {
    state = {
        currentPage: 1,
        pageSize: 5,
        products: [],
        screenWidth: window.innerWidth,
      };
    
      async fetchData() {
        let response = await httpService.get("/products");
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
    
      handlePrevious = () => {
        const { currentPage } = this.state;
        if (currentPage > 1) {
          this.setState({ currentPage: currentPage - 1 });
        }
      };
    
      handleNext = () => {
        const { currentPage, products, pageSize } = this.state;
        const totalPages = Math.ceil(products.length / pageSize);
        if (currentPage < totalPages) {
          this.setState({ currentPage: currentPage + 1 });
        }
      };

      handleView=()=>{
        console.log("hyyy");
        this.props.history.push("/allMobiles")
        // window.location="/allMobiles"
      }

  render() {
    let { currentPage, pageSize, products, screenWidth } = this.state;
    let dealPage = [];
    console.log(dealPage);
    if (products) {
      if (screenWidth <= 400) {
        pageSize = 1;
        let startIndex = (currentPage - 1) * pageSize;
        let DealsData = [...products];
        dealPage = DealsData.splice(startIndex, pageSize);
      } else if (screenWidth <= 600) {
        pageSize = 2;
        let startIndex = (currentPage - 1) * pageSize;
        let DealsData = [...products];
        dealPage = DealsData.splice(startIndex, pageSize);
      } else if (screenWidth < 998) {
        let startIndex = (currentPage - 1) * pageSize;
        console.log(startIndex);
        pageSize = Math.min(pageSize, 3);
        console.log(pageSize);
        let DealsData = [...products];
        dealPage = DealsData.splice(startIndex, pageSize);
      } else if (screenWidth < 1190) {
        let startIndex = (currentPage - 1) * pageSize;
        console.log(startIndex);
        pageSize = Math.min(pageSize, 4);
        console.log(pageSize);
        let DealsData = [...products];
        dealPage = DealsData.splice(startIndex, pageSize);
      } else {
        let startIndex = (currentPage - 1) * pageSize;
        let DealsData = [...products];
        dealPage = DealsData.splice(startIndex, pageSize);
      }
    }
    return (
        <div className="firstClass " style={{marginTop:"1em"}}>
        <div className="row rowfistSetProducts">
          <div className="text-right btnClasss">
            <div className="productClaas">
              <span>Suggesting Items</span>
            </div>
            <div className="btnClasss1">
              <button className="btn btn-primary btn-sm " onClick={()=>this.handleView()}>Veiw All</button>
            </div>
          </div>
        </div>
        <div className="row rowSecSetProducts ">
          <div className="firstColomProducts">
            <button
              className="buttonClass"
              disabled={currentPage === 1}
              onClick={() => this.handlePage(-1)}
              style={{}}
            >
              <FaAngleLeft />
            </button>
          </div>
          <div className="SecColomProducts">
            <div className="row rowFirstWithProducts">
              {dealPage.map((d) => (
                <div className="col-2 colomSetWithProducts">
                <Link to={`/home/${d.brand}/${d.id}`}>
                    <img src={d.img} />
                  </Link>

                  <div className="row nameSet" style={{}}>
                    {/* <div className="col nameColomSet"> */}
                      {d.name.substring(0, 21)}...
                    {/* </div> */}
                  </div>
                  <div className="row rowsecondSet">
                    <div className="col-12" style={{}}>
                      {d.discount}% Off
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="thirdColomProducts">
            <button
              className="buttonClass"
              onClick={() => this.handlePage(1)}
              disabled={currentPage === Math.ceil(products.length / pageSize)}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(OtherShow)
