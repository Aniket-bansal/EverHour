import axios from 'axios';
import {
  ADD_DATA_SUCCESS_C,
  GET_DATA_FAILURE_C,
  GET_DATA_LOADING_C,
  GET_DATA_SUCCESS_C,
  DELETE_DATA_C,
} from './action.type';

export const getData = (url) => async (dispatch) => {
  try {
    let res = await axios.get(url);
    // console.log(res.data);
    dispatch({
      type: GET_DATA_SUCCESS_C,
      Payload: res.data,
    });
    dispatch({
      type: GET_DATA_LOADING_C,
    });
    dispatch({
      type: GET_DATA_FAILURE_C,
    });
  } catch (err) {
    dispatch({
      type: GET_DATA_FAILURE_C,
    });
    dispatch({
      type: GET_DATA_LOADING_C,
    });
  }
};

export const postData = (Payload) => async (dispatch) => {
  try {
    let res = await axios.post('https://server-everhour.onrender.com/clients/', Payload);
     console.log(res.data.data)
    dispatch({
      type: ADD_DATA_SUCCESS_C,
    });
  } catch (err) {
    console.log(err);
  }
};

export const editData =
  ({ id, project }) =>
  async (dispatch) => {
    console.log('paylaod', project);
    try {
      let res = await axios.patch(
        `https://server-everhour.onrender.com/clients/${id}`,
        project
      );
      console.log('res', res.data);
      dispatch({
        type: ADD_DATA_SUCCESS_C,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const delData = (id) => async (dispatch) => {
  try {
    let res = await axios.delete(`https://server-everhour.onrender.com/clients/${id}`);
    dispatch({
      type: DELETE_DATA_C,
    });
  } catch (err) {
    console.log(err);
  }
};
