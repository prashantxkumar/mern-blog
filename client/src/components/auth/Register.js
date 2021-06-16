import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";

const Register = ()=>{

    const [state, setData]=useState({
        name:"",
        email:"",
        password:"",
      });
    
    

    const inputEvent = (event)=>{
          const {name, value} = event.target;
          setData((preVal)=>{
            return{
              ...preVal,
              [name]:value,
            }
          })
      }
    const {loading, registerErrors} = useSelector((state)=>state.AuthReducer);
    const dispatch = useDispatch();

    // useEffect(()=>{
    //     if(registerErrors.length > 0){
    //         registerErrors.map(error =>{
    //             toast.error(error.msg);
    //         })
    //     }
    // }, [registerErrors]);

    const userRegister = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        dispatch({ type: 'SET_LOADER' })
        try{
            const response = await axios.post("/register", state, config);
            dispatch({ type: 'CLOSE_LOADER' })
        }catch(error){
            dispatch({ type: 'CLOSE_LOADER' });
            dispatch({
                type: "REGISTER_ERRORS",
                payload: error.response.data.error,
            })
            console.log(error.response);
        }
    }

    return <>
    <div className="mt-80">
        <Toaster />
        <div className="account">
            <div className="account__section">
                <form onSubmit={userRegister}>
                    <div className="group">
                        <input type="text" name="name" value={state.name} onChange={ inputEvent }  className="group__control" placeholder="Enter Your Name" />
                    </div>
                    <div className="group">
                        <input type="email" name="email" value={state.email} onChange={ inputEvent }   className="group__control" placeholder="Enter Your Email" />
                    </div>
                    <div className="group">
                        <input type="password" name="password" value={state.password} onChange={ inputEvent }   className="group__control" placeholder="Create Your Password" />
                    </div>
                    <div className="group">
                        <input type="submit" className="btn btn-default btn-block" value="Register" />
                    </div>
                </form>
            </div>
        </div>
    </div>
    </>
}

export default Register;