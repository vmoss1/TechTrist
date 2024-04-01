import { csrfFetch } from "./csrf";

//actions
const READ_PINS = "pins/readPins";
const READ_PIN_DETAILS = "pins/readPinDetails";
const CREATE_PIN = "pins/createPin";
const EDIT_PIN = "pins/editPin";
const DELETE_PIN = "pins/deletePin";
const ADD_COMMENT = "pins/addComment";

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

// Pins fetch
export const fetchAllPins = () => async (dispatch) => {
  const response = await csrfFetch("/api/pins");
  //   console.log("RES", response);
  const data = await response.json();
  //   console.log("DATA", data);
  dispatch(readPins(data.Pins));
};

// Pin details fetch
export const fetchPinDetails = (pinId) => async (dispatch) => {
  const response = await csrfFetch(`/api/pins/${pinId}`);
  if (response.ok) {
    const pinDetails = await response.json();
    // console.log("pinDETAILLS", pinDetails);
    dispatch(readPinDetails(pinDetails));
  } else {
    throw new Error("Unable to fetch pin Details");
  }
};

//Pin post
//Create new pin
// export const createPinThunk = (pin) => async (dispatch) => {
//   const response = await csrfFetch("/api/pins", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(pin),
//   });
//   if (response.ok) {
//     const newPin = await response.json();
//     dispatch(createPin(newPin));
//     return newPin;
//   } else {
//     throw new Error("Unable to Create");
//   }
// };
//Pin post
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
  // console.log("DATA", data);
  dispatch(createPin(data));
  return data;
};

//delete pin
export const deletePinThunk = (pinId) => async (dispatch) => {
  const response = await csrfFetch(`/api/pins/${pinId}`, {
    method: "DELETE",
  });
  //   console.log("RES", response);
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
  //   console.log("RESPONSE", response);
  if (response.ok) {
    const editedPin = await response.json();
    // console.log("PIN", editedPin);
    dispatch(editPin(editedPin));
    return editedPin;
  } else {
    throw new Error("Unable to Update");
  }
};

//post a comment
export const createCommentThunk = (pinId, comment) => async (dispatch) => {
  // console.log("THUNK", comment);
  const response = await csrfFetch(`/api/pins/${pinId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
  // console.log("RES", response);
  if (response.ok) {
    const newComment = await response.json();
    // console.log("NEWCOMMENT", newComment);
    dispatch(addComment(newComment));
    return newComment;
  } else {
    throw new Error("Unable to Create");
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
        [action.payload.id]: action.payload, // Update the pin with the new data
      };

    case DELETE_PIN: {
      let pinState = { ...state };
      delete pinState[action.payload];
      return pinState;
    }
    //Currently breaking on adding a comment
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

    default:
      return state;
  }
};

export default pinsReducer;
