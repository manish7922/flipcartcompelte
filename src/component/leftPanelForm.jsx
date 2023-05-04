import React, { Component } from "react";
import "./left.css"
export default class LeftPanelForm extends Component {
  handleChange = (e) => {
    let { currentTarget: input } = e;
    let options = { ...this.props.options };
    if (
      input.name === "brand" ||
      input.name === "ram" ||
      input.name === "rating" ||
      input.name === "price"
    )
      options[input.name] = this.updateCBs(
        options[input.name],
        input.checked,
        input.value
      );
    else options[input.name] = input.value;
    console.log("OptionsCB", options);

    this.props.onOptionChange(options);
  };
  updateCBs = (inpValue, checked, value) => {
    let inputArr = inpValue ? inpValue.split(",") : [];
    if (checked) inputArr.push(value);
    else {
      let index = inputArr.findIndex((ele) => ele === value);
      if (index >= 0) inputArr.splice(index, 1);
    }
    return inputArr.join(",");
  };

  makeCheckboxes = (arr, values, name, label) => (
    <React.Fragment>
      <label className="form-check-label font-weight-bold">{label}</label>
      {arr.map((opt, index) => (
        <div className="form-check" key={opt}>
          <input
            className="form-check-input"
            type="checkbox"
            name={name}
            value={opt.value}
            checked={values.findIndex((val) => val === opt.value) >= 0}
            onChange={this.handleChange}
          />
          <label className="form-check-label">{opt.name}</label>
        </div>
      ))}
    </React.Fragment>
  );

  makeCheckboxes1=(arr,values,name,label)=>(
    <React.Fragment>
            <label className="form-check-label font-weight-bold">{label}</label>
    {arr.map((opt,index)=>(
        <div className='form-check' key={opt}>
    <input  className="form-check-input"  type="checkbox" name={name} value={opt} checked={values.findIndex(val=>val===opt)>=0} onChange={this.handleChange} />   
   <label className="form-check-label">{opt}</label>
    </div>
    )

    )}
    </React.Fragment>
   ) 


  render() {
    const { ramData, ratingData, brandData, priceData } = this.props;
    const { ram = "", rating = "", price = "",brand="" } = this.props.options;
    return (   
        <div>
    <div className="row heading">
        <div className="col-12">
           <span className="filter">
            Filters
     </span>
     </div>
    </div>
    <div className="row heading">
        <div className="col-12 setColFiter">
            {this.makeCheckboxes1(brandData,  brand.split(","), "brand","Brand")}
        </div>
        <div className="col-12 setColFiter">
            {this.makeCheckboxes(ramData,  ram.split(","), "ram","Ram")}
        </div>
        <div className="col-12 setColFiter">
            {this.makeCheckboxes(ratingData,  rating.split(","), "rating","Rating")}
        </div>
        <div className="col-12 setColFiter">
            {this.makeCheckboxes(priceData,  price.split(","), "price","Price")}
        </div>
    </div>
    </div>
    )
  }
}
