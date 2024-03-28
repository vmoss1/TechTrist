import { csrfFetch } from "./csrf";

//actions
const READ_PINS = "pins/readPins";
const READ_PIN_DETAILS = "pins/readPinDetails";
const CREATE_PIN = "pins/createPin";
const EDIT_PIN = "pins/editPin";
const DELETE_PIN = "pins/deletePin";

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

// Pins fetch
export const fetchAllPins = () => async (dispatch) => {
  const response = await csrfFetch("/api/pins");
  //   console.log("RES", response);
  const data = await response.json();
  //   console.log("DATA", data);
  dispatch(readPins(data.allPins));
};

// Pin details fetch
export const fetchPinDetails = (pinId) => async (dispatch) => {
  const response = await csrfFetch(`/api/pins/${pinId}`);
  if (response.ok) {
    const pinDetails = await response.json();
    // console.log("pinDETAILLS", pinDetails);
    dispatch(readPinDetails(pinDetails.Pin));
  } else {
    throw new Error("Unable to fetch pin Details");
  }
};

//Pin post
//Create new pin
export const createPinThunk = (pin) => async (dispatch) => {
  const response = await csrfFetch("/api/pins", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pin),
  });
  if (response.ok) {
    const newPin = await response.json();
    dispatch(createPin(newPin));
    return newPin;
  } else {
    throw new Error("Unable to Create");
  }
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

//update group
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

const initialState = {
  list: [],
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
        list: [...state.list, action.payload],
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

    default:
      return state;
  }
};

export default pinsReducer;
