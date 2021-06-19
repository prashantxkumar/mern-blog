import jwt_decode from "jwt-decode";
import { SET_LOADER, LOGOUT, CLOSE_LOADER, SET_TOKEN, REGISTER_ERRORS } from "../types/UserTypes";
const initState = {
    loading: false,
    registerErrors: [],
    loginErrors: [],
    token: '',
    user: '',
};

const token = localStorage.getItem('myToken');

const verifyToken = token => {
    const decodeToken = jwt_decode(token);
    const expiresIn = new Date(decodeToken.exp * 1000);

    if(new Date() > expiresIn){
        localStorage.removeItem("myToken");
    }else{
        return decodeToken;
    }
}

if(token){

    const decoded=verifyToken(token);
    initState.token=token;
    const {user} = decoded;
    initState.user = user;  

}


const AuthReducer = (state = initState, action) => {
    if(action.type === SET_LOADER){
        return{ ...state, loading: true }
    }else if(action.type === CLOSE_LOADER){
        return{ ...state, loading: false }
    }else if(action.type === REGISTER_ERRORS){
        return{ ...state, registerErrors: action.payload }
    }else if(action.type === SET_TOKEN){
        const decoded=verifyToken(action.payload);
        const {user}=decoded;
        return {...state, user: user, token: action.payload};
    }else if(action.type === LOGOUT){
        return {...state, token:'', user:''};
    }
    else{
        return state;
    }
}

export default AuthReducer;