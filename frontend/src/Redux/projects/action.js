import axios from 'axios';
import {
  ADD_DATA_SUCCESS_P,
  GET_DATA_FAILURE_P,
  GET_DATA_LOADING_P,
  GET_DATA_SUCCESS_P,
  DELETE_DATA_P,
} from './action.type';

export const getData = (url) => async (dispatch) => {
  try {
    let res = await axios.get(url);
    //  console.log(res.data.data)
    dispatch({
      type: GET_DATA_SUCCESS_P,
      Payload: res.data.data,
    });
    dispatch({
      type: GET_DATA_LOADING_P,
    });
    dispatch({
      type: GET_DATA_FAILURE_P,
    });
  } catch (err) {
    dispatch({
      type: GET_DATA_FAILURE_P,
    });
    dispatch({
      type: GET_DATA_LOADING_P,
    });
  }
};

export const postData = (Payload) => async (dispatch) => {
  try {
    let res = await axios.post('https://server-everhour.onrender.com/projects/', Payload);
    //  console.log(res.data.data)
    dispatch({
      type: ADD_DATA_SUCCESS_P,
    });
  } catch (err) {
    console.log(err);
  }
};

export const editData =
  ({ id, project }) =>
  async (dispatch) => {
    try {
      let res = await axios.patch(
        `https://server-everhour.onrender.com/projects/${id}`,
        project
      );
      dispatch({
        type: ADD_DATA_SUCCESS_P,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const delData = (id) => async (dispatch) => {
  try {
    let res = await axios.delete(`https://server-everhour.onrender.com/projects/${id}`);
    dispatch({
      type: DELETE_DATA_P,
    });
  } catch (err) {
    console.log(err);
  }
};
