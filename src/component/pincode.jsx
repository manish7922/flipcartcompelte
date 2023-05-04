import React, { Component } from 'react'
import "./pincode.css"
import httpService from '../services/httpService';
export default class PinCode extends Component {
    state={
        formData:{q:"",email:"",password:"",pincode: this.props.pincode ? this.props.pincode : ""},
        res:'',
        errors:''
    }
    handleChange = (e) => {
        const { currentTarget: input } = e;
        let formData = { ...this.state.formData };
        console.log("change", input.value);
        formData[input.name] = input.value;
        this.setState({ formData: formData });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.handlePincode(this.state.formData.pincode)
    }
    handleCheck = () => {
        this.handlePincode(this.state.formData.pincode)
        this.setState({res:'',errors:''})
    }

    handlePincode=async(obj)=>{
        let { id } = this.props;
     console.log(id);
        console.log(obj);
        if(obj){
        try {
            
            let response =await httpService.get(`/baseURl/products/${obj}/${id}`);
            console.log(response);
            let {data}=response;
            this.setState({res:data}) 
        } catch (ex) {
            if (ex.response && ex.response.status === 401) {
                let errors ='';
                errors = ex.response.data;
            console.log(errors)
                this.setState({ errors: errors });   
        }
          }
        }
      }

      componentDidMount(){
        this.handlePincode();
      }

      componentDidUpdate(prevProps, prevState) {

        if (prevProps !== this.props) this.handlePincode();
      }

  render() {
    const {res, errors}=this.state
    console.log(errors.pincode);
    console.log(res);
    return (
   <>
   <div className="row rowPinCodeSet">
   <div className="col-2">
                        <span className="delivery">Delivery</span>
                    </div>
                    <div className="col-6">
                        <span className="colomSetPinCode">
    
                            <form onSubmit={this.handleSubmit} className="setButton">

                                <input
                                    value={this.state.formData.pincode}
                                    className="inputSet"
                                    type="search"
                                    id="pincode"
                                    name="pincode"
                                    placeholder="Search for pincode"
                                    onChange={this.handleChange}
                                />
     {res ? (
            <span className="text-success">{res}</span> ) :(<span className='text-danger'>{errors}</span>)
          }
          {/* {errors && (<span className='text-danger'>{errors}</span>)} */}
                            </form>
                            <span className="handleCheck">
                                <button className='btn btn-primary btn-sm m-1' onClick={() => this.handleCheck()}>Check</button>
                              
                            </span>

                        </span>
                    </div>
   </div>
   </>
    )
  }
}

