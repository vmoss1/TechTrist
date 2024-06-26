import { csrfFetch } from "./csrf";

//actions
const READ_BOARDS = "boards/readPins";
const READ_BOARD_DETAILS = "boards/readBoardDetails";
const CREATE_BOARD = "boards/createBoard";
const EDIT_BOARD = "boards/editBoard";
const DELETE_BOARD = "boards/deleteBoard";
const ADD_PIN_TO_BOARD = "boards/addPinToBoard";
const DELETE_PIN_FROM_BOARD = "./boards/deletePinFromBoard";

const readBoards = (boards) => ({
  type: READ_BOARDS,
  payload: boards,
});

const readBoardDetails = (board) => ({
  type: READ_BOARD_DETAILS,
  payload: board,
});

const createBoard = (board) => ({
  type: CREATE_BOARD,
  payload: board,
});

const deleteBoard = (boardId) => ({
  type: DELETE_BOARD,
  payload: boardId,
});

const editBoard = (board) => ({
  type: EDIT_BOARD,
  payload: board,
});

const addPinToBoard = (pinId, boardId) => ({
  type: ADD_PIN_TO_BOARD,
  payload: { pinId, boardId },
});

const deletePinFromBoard = (pinId, boardId) => ({
  type: DELETE_PIN_FROM_BOARD,
  payload: { pinId, boardId },
});

// Boards fetch by current user
export const fetchUserBoards = () => async (dispatch) => {
  const response = await csrfFetch("/api/boards/current");
  const data = await response.json();
  dispatch(readBoards(data.currentBoards));
};

//Boards fetch by ID
export const fetchBoardDetails = (boardId) => async (dispatch) => {
  const response = await csrfFetch(`/api/boards/${boardId}`);
  if (response.ok) {
    const boardDetails = await response.json();
    dispatch(readBoardDetails(boardDetails.Board));
  } else {
    throw new Error("Unable to fetch Board Details");
  }
};
//Create new board
export const createBoardThunk = (board) => async (dispatch) => {
  const response = await csrfFetch("/api/boards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(board),
  });
  if (response.ok) {
    const newBoard = await response.json();
    dispatch(createBoard(newBoard));
    return newBoard;
  } else {
    throw new Error("Unable to Create");
  }
};

//delete board
export const deleteBoardThunk = (boardId) => async (dispatch) => {
  const response = await csrfFetch(`/api/boards/${boardId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deleteBoard(boardId));
    return response.json();
  } else {
    throw new Error("Unable to Delete");
  }
};

//update board
export const editBoardThunk = (boardId, boardData) => async (dispatch) => {
  const response = await csrfFetch(`/api/boards/${boardId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(boardData),
  });

  if (response.ok) {
    const editedBoard = await response.json();
    dispatch(editBoard(editedBoard));
    return editedBoard;
  } else {
    throw new Error("Unable to Update");
  }
};

//Add pin to board
export const addPinToBoardThunk = (pinId, boardId) => async (dispatch) => {
  const response = await csrfFetch(`/api/boards/${boardId}/pins/${pinId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pinId, boardId }),
  });
  if (response.ok) {
    const newPinOnBoard = await response.json();
    dispatch(addPinToBoard(newPinOnBoard));
    return newPinOnBoard;
  } else {
    throw new Error("Unable to Create");
  }
};

//delete pin from board
export const deletePinFromBoardThunk = (boardId, pinId) => async (dispatch) => {
  const response = await csrfFetch(`/api/boards/${boardId}/pins/${pinId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deletePinFromBoard({ boardId, pinId }));
    return response.json();
  } else {
    throw new Error("Unable to Delete");
  }
};

const initialState = {
  list: [],
  pins: [],
};

const boardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case READ_BOARDS:
      return { ...state, list: action.payload };

    case READ_BOARD_DETAILS:
      return { ...state, list: action.payload };

    case CREATE_BOARD:
      return {
        ...state,
        list: action.payload,
      };
    case EDIT_BOARD:
      return {
        ...state,
        [action.payload.id]: action.payload, 
      };

    case DELETE_BOARD: {
      let boardState = { ...state };
      delete boardState[action.payload];
      return boardState;
    }
    case ADD_PIN_TO_BOARD: {
      const { pinId, boardId } = action.payload;
      // creating new list so that board can be updated by id
      const updatedList = state.list.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            pins: [...board.pins, pinId],
          };
        }
        return board;
      });
      return {
        ...state,
        list: updatedList,
      };
    }
    case DELETE_PIN_FROM_BOARD: {
      let boardState = { ...state };
      delete boardState[action.payload];
      return boardState;
    }
    default:
      return state;
  }
};

export default boardsReducer;
