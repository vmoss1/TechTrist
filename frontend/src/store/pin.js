import { csrfFetch } from "./csrf";

//actions
const READ_PINS = "pins/readPins";
const READ_PIN_DETAILS = "pins/readPinDetails";
const CREATE_PIN = "pins/createPin";
const EDIT_PIN = "pins/editPin";
const DELETE_PIN = "pins/deletePin";
const ADD_COMMENT = "pins/addComment";
const DELETE_COMMENT = "pins/deleteComment";

const readPins = (pins) => ({
  type: READ_PINS,
  payload: pins,
});

const readPinDetails = (pin) => ({
  type: READ_PIN_DETAILS,
  payload: pin,
});

const createPin = (pin) => ({
  type: CREATE_PIN,
  payload: pin,
});

const deletePin = (pinId) => ({
  type: DELETE_PIN,
  payload: pinId,
});

const editPin = (pin) => ({
  type: EDIT_PIN,
  payload: pin,
});

const addComment = (pinId, comment) => ({
  type: ADD_COMMENT,
  payload: { pinId, comment },
});

const deleteComment = (commentId) => ({
  type: DELETE_COMMENT,
  payload: commentId,
});

// Pins fetch
export const fetchAllPins = () => async (dispatch) => {
  const response = await csrfFetch("/api/pins");
  const data = await response.json();
  dispatch(readPins(data.Pins));
};

// Pin details fetch
export const fetchPinDetails = (pinId) => async (dispatch) => {
  const response = await csrfFetch(`/api/pins/${pinId}`);
  if (response.ok) {
    const pinDetails = await response.json();

    dispatch(readPinDetails(pinDetails));
  } else {
    throw new Error("Unable to fetch pin Details");
  }
};


//Create new pin
export const createPinThunk = (pin) => async (dispatch) => {
  const { userId, title, description, category, imageUrl } = pin;
  const formData = new FormData();
  formData.append("userId", userId);
  formData.append("title", title);
  formData.append("description", description);
  formData.append("category", category);

  // for single file
  if (imageUrl) formData.append("imageUrl", imageUrl);

  const res = await csrfFetch(`/api/pins`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });

  const data = await res.json();

  dispatch(createPin(data));
  return data;
};

//delete pin
export const deletePinThunk = (pinId) => async (dispatch) => {
  const response = await csrfFetch(`/api/pins/${pinId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deletePin(pinId));
    return response.json();
  } else {
    throw new Error("Unable to Delete");
  }
};

//update pin
export const editPinThunk = (pinId, pinData) => async (dispatch) => {
  const response = await csrfFetch(`/api/pins/${pinId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pinData),
  });

  if (response.ok) {
    const editedPin = await response.json();

    dispatch(editPin(editedPin));
    return editedPin;
  } else {
    throw new Error("Unable to Update");
  }
};

//post a comment
export const createCommentThunk = (pinId, comment) => async (dispatch) => {

  const response = await csrfFetch(`/api/pins/${pinId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });

  if (response.ok) {
    const newComment = await response.json();

    dispatch(addComment(newComment));
    return newComment;
  } else {
    throw new Error("Unable to Create");
  }
};

//delete comment
export const deleteCommentThunk = (commentId) => async (dispatch) => {
  const response = await csrfFetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteComment(commentId));
    return response.json();
  } else {
    throw new Error("Unable to Delete");
  }
};

const initialState = {
  list: [],
  comments: [],
};

const pinsReducer = (state = initialState, action) => {
  switch (action.type) {
    case READ_PINS:
      return { ...state, list: action.payload };

    case READ_PIN_DETAILS:
      return { ...state, list: action.payload };

    case CREATE_PIN:
      return {
        ...state,
        list: [state.list, action.payload],
      };
    case EDIT_PIN:
      return {
        ...state,
        list: [state.list, action.payload], 
      };

    case DELETE_PIN: {
      let pinState = { ...state };
      delete pinState[action.payload];
      return pinState;
    }

    case ADD_COMMENT:
      return {
        ...state,
        list: Array.isArray(state.list)
          ? state.list.map((pin) =>
              pin.id === action.payload.pinId
                ? { ...pin, Comments: [...pin.Comments, action.payload] }
                : pin
            )
          : state.list, // Check if state.list is an array before mapping
      };
    case DELETE_COMMENT: {
      let pinState = { ...state };
      delete pinState[action.payload];
      return pinState;
    }

    default:
      return state;
  }
};

export default pinsReducer;
