import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchBoardDetails } from "../../store/board";
import { useEffect } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./SingleBoard.css";
import OpenModalButton from "../OpenModalButton";
import EditBoard from "./EditBoard/EditBoard";

export default function SingleBoard() {
  const { boardId } = useParams();
  let board = useSelector((state) => state.boards?.list);

  const pinCount = board?.Pins?.length;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBoardDetails(boardId));
  }, [dispatch, boardId]);

  return (
    <div id="single-board-container">
      <div id="single-board-title-container">
        <h1>{board?.title}</h1>{" "}
        <OpenModalButton
          buttonText={
            <p style={{ fontSize: "30px" }} id="single-board-edit-button">
              <BiDotsHorizontalRounded />
            </p>
          }
          modalComponent={<EditBoard board={board} />}
        />
      </div>

      <h3>{pinCount} Pins</h3>

      <div id="single-board-pins-container">
        {board.Pins?.map((pin) => (
          <div key={pin.id}>
            <Link id="single-board-title" to={`/pins/${pin.id}`}>
              <img
                id="single-board-pin-image"
                key={pin.id}
                src={pin?.imageUrl}
                alt={pin?.title}
              />
              <p id="single-board-title">{pin?.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
