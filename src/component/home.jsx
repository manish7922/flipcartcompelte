import React, { Component } from 'react'
import Banner from './banner'
import Deals from './deals'
import OtherShow from './otherShow'
import ShowProducts from './showProducts'

export default class Home extends Component {
  render() {
    return (
      <div style={{overflowY:"auto"}}>
           <div className="mt-2">
   <Banner />
   </div>
   <div className="" >
    <Deals  />
   </div>
   <div className="" >
    <ShowProducts  />
   </div>
   <div className="" >
    <OtherShow  />
   </div>
      </div>
    )
  }
}


