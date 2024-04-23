import { csrfFetch } from "./csrf.js";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
const GET_USERS = "session/getUsers";

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

const getUsers = (users) => ({
  type: GET_USERS,
  payload: users,
});


export const signup = (user) => async (dispatch) => {
  const { username, firstName, lastName, email, password, profilePicture } =
    user;
  const formData = new FormData();
  formData.append("username", username);
  formData.append("firstName", firstName);
  formData.append("lastName", lastName);
  formData.append("email", email);
  formData.append("password", password);

  // for single file
  if (profilePicture) formData.append("profilePicture", profilePicture);

  const res = await csrfFetch(`/api/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });

  const data = await res.json();
  dispatch(setUser(data.user));
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const getUsersThunk = () => async (dispatch) => {
  try {
    const response = await csrfFetch("/api/session/users");
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    dispatch(getUsers(data));
  } catch (error) {
    console.error("Error fetching users:", error.message);
  }
};

const initialState = { user: null, users: {} };

const sessionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    case GET_USERS:
      return { ...state, users: action.payload.users };
    default:
      return state;
  }
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeUser());
  return response;
};

export default sessionsReducer;
