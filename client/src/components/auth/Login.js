import { useState } from "react";
const Login = ()=>{


    return <>
    <div className="mt-80">
        <div className="account">
            <div className="account__section">
                <form>

                    <div className="group">
                        <input type="email" name="" className="group__control" placeholder="Enter Your Email" />
                    </div>
                    <div className="group">
                        <input type="password" name="" className="group__control" placeholder="Enter Your Password" />
                    </div>
                    
                    <div className="group">
                        <input type="submit" className="btn btn-default btn-block" value="Login" />
                    </div>
                </form>
            </div>
        </div>
    </div>
    </>
}

export default Login;