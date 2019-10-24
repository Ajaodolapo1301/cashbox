import { REGISTER_FAIL, REGISTER_SUCCESS, LOGIN_SUCCESS, USER_LOADED,AUTH_ERROR, LOGIN_FAIL, LOGOUT} from "./types"
import axios from "axios"
import {setAlert} from "../actions/alertAction"
import setAuthToken from "../../utils/setAuthToken"


// load user
export const loadUser = () =>async dispatch=>{
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    
    try {
        const res = await axios.get("http://localhost:5000/api/user")
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type:AUTH_ERROR
        })
    }

}


                    // register user
export const register = ({l_name,f_name, password, email }) => async dispatch=>{

    const config ={
        headers:{
            "Content-Type": "application/json"
        }
    }    
    const body= JSON.stringify({l_name,f_name, email, password})

    try {
        const res = await axios.post("http://localhost:5000/api/auth/register",  body, config)
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
            dispatch(loadUser())
    } catch (err) {
        const errors = err.response.data.errors
        
        if(errors) {
            errors.forEach(error =>dispatch (setAlert(error.msg, "danger")));
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

// login actions 
export const login = ({ password, email }) => async dispatch=>{

    const config ={
        headers:{
            "Content-Type": "application/json"
        }
    }    

    const body= JSON.stringify({ email, password})

    try {
        const res = await axios.post("http://localhost:5000/api/user/login",  body, config)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            // dispatching loaduser
            dispatch(loadUser())
    } catch (err) {
        const errors = err.response.data.errors
        if(errors) {
            errors.forEach(error=> dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

// logout
export const logout= () => dispatch=>{
    // dispatch({type: CLEAR_PROFILE})
    dispatch({type: LOGOUT})


}

