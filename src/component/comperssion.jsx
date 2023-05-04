import React, { Component } from 'react'
import "./comperssion.css"
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { removeFromComparison, addToCart } from './redux/Actions/actions';
import authServices from '../services/authServices';

 class Comperssion extends Component {

    handleCart=(obj)=>{
        let user=authServices.getToken();
        if(user){
     console.log(obj);
     const myProduct=obj;
     let id=myProduct.id;
     console.log(id);
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


    // handleCart = (obj) => {
    //     let user = authServices.getToken();
    //     if (user) {
    //         console.log(obj);
    //         const myProduct = obj;
    //         let id = myProduct.id;
    //         console.log(id);
    //         console.log(myProduct);
    
    //         if (this.props.cart) { // check if cart is defined
    //             let x1 = this.props.cart.find((c) => c.id === id);
    //             if (x1) {
    //                 x1.quantity = x1.quantity + 1;
    //             } else {
    //                 let quantity = 1;
    //                 let json1 = { ...myProduct, quantity: quantity };
    //                 this.props.cart.push(json1);
    //             }
    //             console.log("cartData", this.props.cart);
    //             this.props.history.push("/checkout");
    //         } else {
    //             let quantity = 1;
    //             let json1 = { ...myProduct, quantity: quantity };
    //             this.props.cart.push(json1);
    //         }
    //     } else {
    //         window.alert("Please login");
    //     }
    // };
    


    render() {
        let compareList = this.props.addToCompare;
        console.log("Compare List", compareList);
        if (compareList.length === 0)
            this.props.history.push('/')
            const {cart}=this.props
            console.log(cart);

        return (
            <React.Fragment>
                {compareList.length === 0 ? ("") : (
                    <div className="setIndexComapre">
                        <div className="row" style={{ "borderTop": "1px solid #e0e0e0" }}>
                            <div className="col-3  _1iv66u1">
                                <span className='_3ZR2N_'>Compare {compareList[0].name} vs others</span>
                                <div>{compareList.length} items</div>
                            </div>
                            {compareList.map(obj => (
                                <div className="col-3  _1iv66u1">
                                    <React.Fragment>
                                        <div className="row">
                                            <div className="col">
                                             
                                                 <div className="_1vuGld" title="Remove Product" onClick={() => this.props.removeFromComparison(obj)}>✕</div>
                                       
                                                <img className="imgx01" src={obj.img} />
                                            </div>
                                        </div>
                                        <br />

                                    </React.Fragment>
                                </div>

                            ))}
                        </div>

                        <div className="row" style={{ "borderBottom": "1px solid #e0e0e0" }}>
                            <div className="col-3">

                            </div>
                            {compareList.map(obj => (
                                <div className="col-3 mb-2">
                                    <React.Fragment>
                                        <div className="row">
                                            <div className="col tyuip"><Link to={`/home/${obj.brand}/${obj.id}`}><span className="_3L_M2k">{obj.name}</span></Link></div>
                                        </div>
                                        <div className="row"><div className="col _30jeq3">₹{obj.price}</div></div>
                                        <div className="row">
                                            <div className="col">
                                                <img height="21" src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png"></img>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                </div>

                            ))}
                        </div>

                        <div className="row" >
                            <div className="col-3 _1iv66u">
                                <span className="_2EPN2A">Ratings and reviews</span>
                            </div>
                            {compareList.map(obj => (
                                <div className="col-3 _1iv66u">
                                    <React.Fragment>
                                        <div className="row">
                                            <div className="col">
                                                <span className="_3LWZlK">
                                                    {obj.rating} <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg==" class="_1wB99o"></img>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col FIvxZg">
                                                {obj.ratingDesc}
                                            </div>
                                        </div>
                                        <br />

                                    </React.Fragment>
                                </div>

                            ))}
                        </div>

                        <div className="row" style={{ "width": "auto", "height": "auto" }}></div>

                        <div className="row">
                            <div className="col-3 _1iv66u">
                                <span className="_2EPN2A">Highlights</span>
                            </div>
                            {compareList.map(obj => (
                                <div className="col-3 _1iv66u">
                                    <React.Fragment>
                                        <div className="row">
                                            <div className="col">
                                                <span className="_2YNwCa">
                                                    <div>{obj.details.map(dobj => (
                                                        <div className="_bgtyuhi">{dobj}</div>
                                                    ))} </div>
                                                </span>
                                            </div>
                                        </div>

                                    </React.Fragment>
                                </div>

                            ))}
                        </div>

                        <div className="row">
                            <div className="col-3 _1iv66u">
                                <span className="_2EPN2A"></span>
                            </div>
                            {compareList.map(obj => (
                                <div className="col-3 _1iv66u">
                                    <React.Fragment>
                                        <div className="row">
                                            <div className="col">
                                                <button class="_3AWRsL" type="button" onClick={() => this.handleCart(obj)}>
                                                    <i className="fa fa-bolt" /> BUY NOW</button>
                                            </div>
                                        </div>

                                    </React.Fragment>
                                </div>

                            ))}
                        </div>

                        <div className="row _3p9s2f">
                            <div className="col-3">
                                <span className="_2EPN2A">PLATFORM and PERFORMANCE</span>
                            </div>
                            {compareList.map(obj => (
                                <div className="col-3 qVW10n">
                                    <React.Fragment>
                                        <div className="row">
                                            <div className="col">

                                            </div>
                                        </div>

                                    </React.Fragment>
                                </div>

                            ))}
                        </div>

                        <div className="row">
                            <div className="col-3 _1iv66u">
                                <span className="_2EPN2A">RAM</span>
                            </div>
                            {compareList.map(obj => (
                                <div className="col-3 _1iv66u">
                                    <React.Fragment>
                                        <div className="row">
                                            <div className="col _3eKu10">
                                                {obj.ram} GB
                                        </div>
                                        </div>

                                    </React.Fragment>
                                </div>

                            ))}
                        </div>

                        <hr />

                    </div >
                )}
            </React.Fragment>





        )

    }
}
const mapStateToProps = (state) => {
    //console.log(state);
    const { addToCompare } = state.flipkart;
    return { addToCompare };
}
const mapDispatchToProps = (dispatch) => {
    return {
        removeFromComparison: (obj) => {
            //console.log(obj);
            dispatch(removeFromComparison(obj))
        },
        // onCartClick: (obj) => {
        //     //console.log(obj);
        //     dispatch(addToCart(obj))
        // }
    }
}


export default connect(
    mapStateToProps, mapDispatchToProps
)(Comperssion)


