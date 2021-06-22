import { SET_LOADER, CLOSE_LOADER, CREATE_ERRORS } from "../types/PostTypes";

const initState = {
    loading: false,
    createError: []
}

const PostReducer = (state=initState, action)=>{
    const {type, payload} = action;

    if(type === SET_LOADER){
        return{
            ...state, loading: true
        };
    }else if(type === CLOSE_LOADER){
        return{
            ...state, loading: true
        };
    }else if(type === CREATE_ERRORS){
        return{
            ...state, createError: payload
        };
    }else{
        return state;
    }


    return state;
}
export default PostReducer;