import axios from 'axios';

const API_URL = '/api/v1';
// const API_URL = 'http://localhost:5000';

var token = localStorage.getItem("token");

export const login = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    return response.data;
  } catch (error) {
    // Capture the actual error response from the server
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);  // Send back the specific error from backend
    } else {
      throw new Error('Failed to Login');
    }
  }
};

export const adminlogin = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/admin/login`, data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);  // Send back the specific error from backend
    } else {
      throw new Error('Failed to Login');
    }
  }
};
export const alluser = async (page) => {
  try {
    token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/admin/alluser`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const adduser = async (data) => {
  try {
    token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/admin/adduser`,data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteuser = async (email) => {
  try {
    const response = await axios.delete(`${API_URL}/admin/deleteuser/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const blockuser = async (email) => {
  try {
    const response = await axios.patch(
      `${API_URL}/admin/blockuser/${email}`,
      {}, // Empty body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const unblockuser = async (email) => {
  try {
    const response = await axios.patch(
      `${API_URL}/admin/unblockuser/${email}`,
      {}, // Empty body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resetpassword = async (email) => {
  try {
    token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/admin/resetpassword/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changepassword = async (password) => {
  try {
    token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/changepassword`,{password}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const salesadd = async (data) => {
  try {
    token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/sales`, data,{
        headers: {
          Authorization: `Bearer ${token}`
        }
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);  // Send back the specific error from backend
    } else {
      throw new Error('Booking Failed');
    }
  }
};
