import React, { Component } from 'react'
import "./login.css"
export default class Login extends Component {
state={
  view:0,
}
hamdelNewAccount=()=>{
  let s1={...this.state}
  s1.view=1;
  this.setState(s1)
}

  render() {
    const {view}=this.state
    const {  handleClose,
        handleSubmit,
        handleSubmit1,
        showForm,
        formData,
        children,
        handleChange,
        handleChange1,
        formData1}=this.props

        const showHideClassName = showForm ? "modal display-block" : "modal display-none";
    return (
        view===0 ? (<div className={showHideClassName}>
        <section className="modal-main">
          <div class="_2hriZF _2rbIyg" tabindex="-1">
            <div class="_2QfC02">
              <button class="_2KpZ6l _2doB4z" onClick={handleClose}>✕</button>
              <div class="_2MlkI1">
                <div class="_3wFoIb row">
                  <div class="_3oBhRa col col-2-5 _4H6HH5">
                    <span class="_36KMOx">
                      <span>Login</span>
                    </span>
                    <p class="_1-pxlW">
                      <span>Get access to your Orders, Wishlist and Recommendations</span>
                    </p>
                  </div>
                  <div class="_36HLxm col col-3-5"><div>
                    <form autocomplete="on" onSubmit={handleSubmit} >
                      <div class="IiD88i _351hSN">
                        <input type="text" autocomplete="off" class="_2IX_2- _3umUoc VJZDxU"
                          value={formData.email}
                          type="search"
                          id="email"
                          name="email"
                          placeholder="Enter Email"
                          onChange={handleChange} />
                        <span class="_36T8XR _3umUoc"></span>
                        <label class="_1fqY3P _3umUoc"><span>Enter Email/Mobile number</span></label>
                      </div>
                      <div class="IiD88i _351hSN">
                        <input type="password" autocomplete="off" class="_2IX_2- _3umUoc _3mctLh VJZDxU"
                          value={formData.password}
                          id="password"
                          name="password"
                          placeholder=" Enter Password"
                          onChange={handleChange} />
                        <span class="_36T8XR _3umUoc"></span>
                        <label class="_1fqY3P _3umUoc"><span>Enter Password</span></label>
                        <a class="_2QKxJ- _2_DUc_" tabindex="-1"><span>Forgot?</span></a>
                      </div>
                      <div class="_1Ijv5h">By continuing, you agree to Flipkart's
                              <a class="_2ARnXM" target="_blank" href="/pages/terms">Terms of Use</a> and <a class="_2ARnXM" target="_blank" href="/pages/privacypolicy">Privacy Policy</a>.
                              </div>
                      <div class="_1D1L_j">
                        <button class="_2KpZ6l _2HKlqd _3AWRsL" type="submit">
                          <div class="_2YsvKq o8qAfl"><svg class="_2LJFE8" viewBox="25 25 50 50"><circle stroke="#fff" class="_2XJHnB" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"></circle></svg>
                          </div>
                          <span>Login</span>
                        </button>
                      </div>
                      <div class="_1k3JO2">
                        <div class="_2XlkPA">OR</div>
                        <button class="_2KpZ6l _2HKlqd _3NgS1a">Request OTP</button>
                      </div>
                      <div class="_1En5li"><a class="_14Me7y" href="#" onClick={()=>this.hamdelNewAccount()}>New to Flipkart? Create an account</a>
                      </div>
                    </form>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          {children}
        </section>
      </div>
        ): view===1 ? (
          <div className={showHideClassName}>
          <section className="modal-main">
            <div class="_2hriZF _2rbIyg" tabindex="-1">
              <div class="_2QfC02">
                <button class="_2KpZ6l _2doB4z" onClick={handleClose}>✕</button>
                <div class="_2MlkI1">
                  <div class="_3wFoIb row">
                    <div class="_3oBhRa col col-2-5 _4H6HH5">
                      <span class="_36KMOx">
                        <span>Login</span>
                      </span>
                      <p class="_1-pxlW">
                        <span>Get access to your Orders, Wishlist and Recommendations</span>
                      </p>
                    </div>
                    <div class="_36HLxm col col-3-5"><div>
                      <form autocomplete="on" onSubmit={handleSubmit1} >
                        <div class="IiD88i _351hSN">
                          <input type="text" autocomplete="off" class="_2IX_2- _3umUoc VJZDxU"
                            value={formData.firstName}
                            type="search"
                            id="firstName"
                            name="firstName"
                            placeholder="Enter firstName"
                            onChange={handleChange} />
                          <span class="_36T8XR _3umUoc"></span>
                          <label class="_1fqY3P _3umUoc"><span>FirstName</span></label>
                        </div>
                    
                        <div class="IiD88i _351hSN">
                          <input type="text" autocomplete="off" class="_2IX_2- _3umUoc VJZDxU "
                            value={formData1.lastName}
                           
                            id="lastName"
                            name="lastName"
                            placeholder=" Enter lastName"
                            onChange={handleChange1} />
                          <span class="_36T8XR _3umUoc"></span>
                          <label class="_1fqY3P _3umUoc"><span>LastName</span></label>
                         
                        </div>
                        <div class="IiD88i _351hSN">
                          <input type="text" autocomplete="off" class="_2IX_2- _3umUoc VJZDxU "
                            value={formData1.userName}
                            id="userName"
                            name="userName"
                            placeholder=" Enter userName"
                            onChange={handleChange1} />
                          <span class="_36T8XR _3umUoc"></span>
                          <label class="_1fqY3P _3umUoc"><span>UserName</span></label>
                         
                        </div>

                        <div class="IiD88i _351hSN">
                        <input type="text" autocomplete="off" class="_2IX_2- _3umUoc VJZDxU"
                          value={formData1.email}
                       
                          id="email"
                          name="email"
                          placeholder="Enter Email"
                          onChange={handleChange1} />
                        <span class="_36T8XR _3umUoc"></span>
                        <label class="_1fqY3P _3umUoc"><span> Email</span></label>
                      </div>
                      <div class="IiD88i _351hSN">
                        <input type="password" autocomplete="off" class="_2IX_2- _3umUoc _3mctLh VJZDxU"
                          value={formData1.password}
                          id="password"
                          name="password"
                          placeholder=" Enter Password"
                          onChange={handleChange1} />
                        <span class="_36T8XR _3umUoc"></span>
                        <label class="_1fqY3P _3umUoc"><span> Password</span></label>
                    
                      </div>
                     
                        <div class="IiD88i _351hSN">
                          <input type="text" autocomplete="off" class="_2IX_2- _3umUoc VJZDxU"
                            value={formData1.phone}
                            id="phone"
                            name="phone"
                            placeholder=" Enter phone"
                            onChange={handleChange1} />
                          <span class="_36T8XR _3umUoc"></span>
                          <label class="_1fqY3P _3umUoc"><span>Phone</span></label>
                         
                        </div>

                        <div class="_1D1L_j">
                        <button class="_2KpZ6l _2HKlqd _3AWRsL" type="submit">
                          <div class="_2YsvKq o8qAfl"><svg class="_2LJFE8" viewBox="25 25 50 50"><circle stroke="#fff" class="_2XJHnB" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"></circle></svg>
                          </div>
                          <span>Login</span>
                        </button>
                      </div>
                        
                      </form>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    
            {children}
          </section>
        </div>
        ):("")
    )
  }
}
