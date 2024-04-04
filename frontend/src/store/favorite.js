import { csrfFetch } from "./csrf";

//actions
const READ_FAVORITES = "favorites/readFavorites";
const CREATE_FAVORITE = "favorites/createFavorite";
const DELETE_FAVORITE = "favorites/deleteFavorite";

const readFavorites = (favorites) => ({
  type: READ_FAVORITES,
  payload: favorites,
});

const createFavorite = (pinId, favorite) => ({
  type: CREATE_FAVORITE,
  payload: { pinId, favorite },
});

const deleteFavorite = (pinId) => ({
  type: DELETE_FAVORITE,
  payload: pinId,
});

// favorite fetch
export const fetchCurrentFavorites = () => async (dispatch) => {
  const response = await csrfFetch("/api/favorites/current");
  //   console.log("RES", response);
  const data = await response.json();
  //   console.log("DATA", data);
  dispatch(readFavorites(data.favorites));
};

//Create new favorite
export const createFavoriteThunk = (pinId, favorite) => async (dispatch) => {
  const response = await csrfFetch(`/api/favorites/${pinId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(favorite),
  });
  if (response.ok) {
    const newFavorite = await response.json();
    dispatch(createFavorite(newFavorite));
    return newFavorite;
  } else {
    throw new Error("Unable to Create");
  }
};

//delete favorite
export const deleteFavoriteThunk = (pinId) => async (dispatch) => {
  const response = await csrfFetch(`/api/favorites/${pinId}`, {
    method: "DELETE",
  });
  //   console.log("RES", response);
  if (response.ok) {
    dispatch(deleteFavorite(pinId));
    return response.json();
  } else {
    throw new Error("Unable to Delete");
  }
};

const initialState = {
  list: [],
};

const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case READ_FAVORITES:
      return { ...state, list: action.payload };

    case CREATE_FAVORITE:
      return {
        ...state,
        list: action.payload,
      };
    case DELETE_FAVORITE: {
      let favoriteState = { ...state };
      delete favoriteState[action.payload];
      return favoriteState;
    }
    default:
      return state;
  }
};

export default favoriteReducer;
