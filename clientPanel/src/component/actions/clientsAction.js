import {GET_LISTS, GET_USER,GET_LISTS_ERROR, ADD_LIST, 
    DELETE_LIST,UPDATE_LIST,ADD_LIST_ERROR,UPDATE_LIST_ERROR, 
    GET_USER_ERROR, DELETE_LIST_ERROR

} from "./types"
import axios from "axios"

export const getLists = () => async dispatch=>{
    try {
        const res =await axios.get("/api/list")
        dispatch({
            type: GET_LISTS,
            payload:res.data
        }) 
    } catch (error) {
        dispatch({
            type: GET_LISTS_ERROR,
            Payload: {msg: error.response.statusText, status: error.response.status} 
        })
    }
    }
    


export const addUser = (list) => async dispatch=>{
    try {
        const res = await axios.post("/api/list", list)
        dispatch({
            type: ADD_LIST,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: ADD_LIST_ERROR,
            Payload: {msg: error.response.statusText, status: error.response.status} 
        })
    }
   
}

export const getUser = (id) => async dispatch=>{
    try {
        const res = await axios.get(`/api/list/${id}`)
        dispatch({
            type: GET_USER,
            payload: res.data 
       })
    } catch (error) {
        dispatch({
            type: GET_USER_ERROR,
            Payload: {msg: error.response.statusText, status: error.response.status} 
        })
    }
  
}

export const deleteUser = (id) => async dispatch=>{
    try {
        const res = await axios.delete(`/api/list/${id}`)
        dispatch({
            type: DELETE_LIST,
            payload: res.data 
       })
    } catch (error) {
        dispatch({
            type: DELETE_LIST_ERROR,
            Payload: {msg: error.response.statusText, status: error.response.status} 
        })
    }
}

export const updateUser = (client) => async dispatch=>{
    try {
        const res = await axios.put(`/api/list/${client.id}`, client)
        dispatch({
            type: UPDATE_LIST,
            payload: res.data 
       })
    } catch (error) {
        dispatch({
            type: UPDATE_LIST_ERROR,
            Payload: {msg: error.response.statusText, status: error.response.status} 
        })
    }
}