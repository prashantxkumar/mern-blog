import { Helmet } from "react-helmet";
import {useState, useEffect} from "react";
import { postLogin } from "../../store/asyncMethods/AuthMethods"
import { useSelector, useDispatch } from "react-redux";
import toast, {Toaster} from "react-hot-toast";

const Login = ()=>{

    const dispatch=useDispatch();
    const {loginErrors, loading} = useSelector((state)=> state.AuthReducer);
    const [ state, setState] = useState({
        email:'',
        password:''
    })
    const inputEvent = (event)=>{
        const {name, value} = event.target;
        setState((preVal)=>{
          return{
            ...preVal,
            [name]:value,
          }
        })
    }

    const userLogin = e =>{
        e.preventDefault();
        dispatch(postLogin(state));
    }

    useEffect(()=>{
        if(loginErrors.length > 0){
            loginErrors.map(error => {
                toast.error(error.msg);
            })
        } 
    },[loginErrors])

    return <>
    <div className="mt-80">
        <Toaster position="top-right" reverseOrder={false} />
            <Helmet>
				<title>Log In </title>
				<meta name='description' content='Log In Page' />
			</Helmet>
        <div className="account">
            <div className="account__section">
                <form onSubmit={userLogin}>

                    <div className="group">
                        <input type="email" name="email" value={state.email} onChange={ inputEvent }className="group__control" placeholder="Enter Your Email" />
                    </div>
                    <div className="group">
                        <input type="password" name="password" value={state.password} onChange={ inputEvent }className="group__control" placeholder="Enter Your Password" />
                    </div>
                    
                    <div className="group">
                        <input type="submit" className="btn btn-default btn-block" value={loading ? '...': 'Login'} />
                    </div>
                </form>
            </div>
        </div>
    </div>
    </>
}

export default Login;