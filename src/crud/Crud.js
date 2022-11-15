import axios from 'axios';

const URL = `https://mebarcode-91813-default-rtdb.europe-west1.firebasedatabase.app`;

export const postComment = async (filmComment) => {
  try {
    await axios.post(`${URL}/comment.json`, {
      ...filmComment,
    });
  } catch (error) {
    console.log(error);
  }
};
export const editComment = async (filmComment, state) => {
  try {
    await axios.put(`${URL}/comment/${state.localId}.json`, {
      ...filmComment,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (id) => {
  console.log(id);
  try {
    await axios.delete(`${URL}/comment/${id}.json`);
  } catch (error) {
    console.log(error);
  }
  getComment();
};

export const getComment = async (setComment) => {
  try {
    const { data } = await axios.get(`${URL}/comment.json`);
    console.log(data);
    setComment(data);
  } catch (error) {
    console.log(error);
  }
};
