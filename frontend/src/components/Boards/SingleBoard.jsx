import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchBoardDetails } from "../../store/board";
import { useEffect, useState } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { useParams } from "react-router-dom";
import "./SingleBoard.css";
import OpenModalButton from "../OpenModalButton";
import EditBoard from "./EditBoard/EditBoard";
import { deletePinFromBoardThunk } from "../../store/board";
import { useNavigate } from "react-router-dom";

export default function SingleBoard() {
  const { boardId } = useParams();
  let board = useSelector((state) => state.boards?.list);
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [currentSelectedKey, setCurrentSelectedKey] = useState(null);

  const pinCount = board?.Pins?.length;

  const dispatch = useDispatch();

  const handleRemove = async (pinId) => {
    await dispatch(deletePinFromBoardThunk(boardId, pinId));
    dispatch(fetchBoardDetails(boardId));
    setEditing(true);
  };

  const handleMouseOver = (pinId) => {
    setCurrentSelectedKey(pinId);
    setIsMouseOver(true);
  };

  const handleMouseLeave = () => {
    setCurrentSelectedKey(null);
  };

  useEffect(() => {
    dispatch(fetchBoardDetails(boardId));
  }, [dispatch, boardId, editing]);

  return (
    <div id="single-board-container">
      <div id="single-board-title-container">
        <h1 id="single-board-title">{board?.title}</h1>{" "}
        <OpenModalButton
          buttonText={
            <p style={{ fontSize: "30px" }} id="single-board-edit-button">
              <BiDotsHorizontalRounded />
            </p>
          }
          modalComponent={<EditBoard board={board} />}
        />
      </div>

      <h3 id="single-board-title">{pinCount} Pins</h3>

      <div id="single-board-pins-container">
        {board.Pins?.map((pin) => (
          <div id="container-for-each-pin" key={pin.id}>
            <div
              to={`/pins/${pin.id}`}
              id="pin"
              onMouseLeave={handleMouseLeave}
              onMouseOver={() => handleMouseOver(pin.id)}
              onClick={() => navigate(`/pins/${pin.id}`)}
              key={pin.id}
            >
              {isMouseOver && currentSelectedKey === pin.id && (
                <div id="board-pin__overlay">
                  <h3 className="board-pin-overlay-icons">{pin.title}</h3>

                  <button
                    className="board-remove-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(pin.id);
                    }}
                  >
                    Remove
                  </button>
                </div>
              )}
              <div id="pins-link" key={pin.id}>
                <img id="pin-images" src={pin.imageUrl} alt={pin.title} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
