import axios from "axios";
import * as types from "./ActionType.js";
import { saveLocalData } from "../../utils/localStorage";
export const Signup = (state) => (dispatch) => {
  dispatch({ type: types.SIGNUP_REQUEST });
  return (
    axios
      .post("https://server-everhour.onrender.com/user/signup", state)

     
      .then((r) => {
 
        dispatch({ type: types.SIGNUP_SUCCESS, payload: r.data.token });
      })
      .catch((e) =>{
        dispatch({type:types.SIGNUP_FAILED})
      })
  );
};
export const Login = (state) => (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST });
  return axios
    .post("https://server-everhour.onrender.com/user/login", state)

    .then((r) => {
      
      saveLocalData("key", r.data.token);
      dispatch({ type: types.LOGIN_SUCCESS, payload: r.data.token });
     
    })
   

    .catch((e) => {
      console.log(e);
      dispatch({ type: types.LOGIN_FAILED, payload: e });
    })

  
};

export const GoogleOauth = (dispatch) => {
  return axios
    .get("https://server-everhour.onrender.com/user/auth/google")
    .then((r) => {
      dispatch({ type: types.SIGNUP_SUCCESS, payload: r.data.token });
    })
    .catch((e) => dispatch({ type: types.SIGNUP_FAILED, payload: e }));
};