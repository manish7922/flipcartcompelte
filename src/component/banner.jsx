import React, { Component } from 'react'
import "./banner.css"
import { FaChevronLeft,FaChevronRight } from 'react-icons/fa';
export default class Banner extends Component {
    state={
        currentImageIndex: 0,
        image:["https://i.ibb.co/4m9zL2Y/aa8947d0a8f758f2.jpg","https://i.ibb.co/tq9j6V7/4dfdf0c59f26c4a1.jpg",
        "https://i.ibb.co/vQZhcvT/68af1ae7331acd1c.jpg ","https://i.ibb.co/qxHzVsp/30d7dffe1a1eae09.jpg"
    ],
    }
    componentDidMount() {
        this.timer = setInterval(this.nextImage, 10000);
      }
    
      componentWillUnmount() {
        clearInterval(this.timer);
      }
    
      nextImage = () => {
        console.log("hyyy nextr");
        this.setState(prevState => ({
          currentImageIndex: (prevState.currentImageIndex + 1) % this.state.image.length
        }));
      };
    
      previousImage = () => {
        this.setState(prevState => ({
          currentImageIndex: (prevState.currentImageIndex - 1 + this.state.image.length) % this.state.image.length
        }));
      };

  render() {
    const {currentImageIndex,image}=this.state
    return (
        <div className="">
        <div className="banner">
          <img src={image[currentImageIndex]} alt="Banner Image" />
       
          <div className="icon right" onClick={this.nextImage}>
            <FaChevronRight />
          </div>
          <div className="icon left" onClick={this.previousImage}>
            <FaChevronLeft /> 
          </div>
        
        </div>
              </div>
    )
  }
}

