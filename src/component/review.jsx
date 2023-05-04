import React, { Component } from "react";
import "./review.css";
export default class Review extends Component {
  state = {
    showList: [],
    currentPage: 1,
    pageSize: 7,
  };

  handleExpand = (ind) => {
    console.log(ind);
    let list = this.state.showList;
    let foundobjind = list.findIndex((obj) => obj === ind);
    if (foundobjind === -1) {
      list.push(ind);
    } else {
      list.splice(foundobjind, 1);
    }
    this.setState({ showList: list });
  };
  handlePage = (p) => {
    this.setState({ currentPage: this.state.currentPage + p });
  };
  render() {
    const { mobileId, list } = this.props;
    const { showList,pageSize,currentPage } = this.state;
        let dealPage = [];
    let maxPage;
    if (list) {
      maxPage = Math.ceil(list.length / pageSize);
      let startIndex = (currentPage - 1) * pageSize;
      let DealsData = [...list];
      dealPage = DealsData.splice(startIndex, pageSize);
      console.log(dealPage);
    }
    return (
      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col">
              <span className="_2QKOHZ">Ratings & Reviews</span>
            </div>
          </div>
          {dealPage.map((l, i) => (
            <div className="row" key={i}>
              <div className="col">
                <div className="row">
                  <div className="col">
                    <span className={l.star>=3 ?  "classSet":"_1BLPMq"}>
                      {l.star}
                      <img
                        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg=="
                        class="_1wB99o"
                      />
                    </span>

                    <span className="_2-N8zT">{l.title}</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col t-ZTKy">
                    <div>
                      {showList.findIndex((sobj) => sobj === i) !== -1 ? (
                        <span>
                          {l.description}
                          <span
                            onClick={() => this.handleExpand(i)}
                            className="_1BWGvX1"
                          >
                            {" "}
                            Read Less
                          </span>
                        </span>
                      ) : (
                        <span>
                          {l.description.substring(0, 46)}
                          {l.description && l.description.length > 45 ? (
                            <span
                              onClick={() => this.handleExpand(i)}
                              className="_1BWGvX1"
                            >
                              {" "}
                              Read More
                            </span>
                          ) : (
                            ""
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row _3n8db9">
                  <div className="col-9">
                    <span className="_2V5EHH">{l.author}</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                      class="_2a1p_T"
                    >
                      <g>
                        <circle cx="6" cy="6" r="6" fill="#878787"></circle>
                        <path
                          stroke="#FFF"
                          stroke-width="1.5"
                          d="M3 6l2 2 4-4"
                          fill="#878787"
                        ></path>
                      </g>
                    </svg>
                    <span class="_2mcZGG">
                      <span>Certified Buyer</span>
                    </span>
                  </div>
                  <div className="col-3"></div>
                </div>
              </div>
            </div>
          ))}
          </div>
          <div className="row mt-3 setClassrowWithreview">
            <div className="col-4">
            <span
                        className="spanFirstClassReviw"
                        disabled={currentPage === 1}
                        onClick={() => this.handlePage(-1)}
                      >
                   prev
                      </span>
            </div>
            <div className="col-3">
    
    </div>
    <div className="col-4">
    <span
                        className="spanFirstClassReviw"
                        onClick={() => this.handlePage(1)}
                        disabled={
                          currentPage === Math.ceil(list.length / pageSize)
                        }
                      >
                    next
                      </span>

          </div>
        </div>
      </div>
    );
  }
}

