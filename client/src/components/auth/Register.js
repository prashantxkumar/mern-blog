import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, {Toaster} from "react-hot-toast";
import { postRegister } from "../../store/asyncMethods/AuthMethods"
const Register = (props)=>{

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
    const {loading, registerErrors, user} = useSelector((state)=>state.AuthReducer);
    const dispatch = useDispatch();

    useEffect(()=>{
        
        if(registerErrors.length > 0){
            registerErrors.map(error => {
                toast.error(error.msg);
            })
        }
        
        if(user){
            props.history.push('/dashboard');
        }

    }, [registerErrors]);

    const userRegister = async (e) => {
        e.preventDefault();

        dispatch(postRegister(state));
    }

    return <>
    <div className="mt-80">
        <Toaster position="top-right" reverseOrder={false} />
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
                        <input type="submit" className="btn btn-default btn-block" value={loading ? '....' : 'Register'} />
                    </div>
                </form>
            </div>
        </div>
    </div>
    </>
}

export default Register;