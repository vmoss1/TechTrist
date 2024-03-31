import { fetchPinDetails } from "../../store/pin";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import EditPin from "../Pins/EditPin/EditPin";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { getUsersThunk } from "../../store/session";
import { addPinToBoardThunk } from "../../store/board";
import { fetchUserBoards } from "../../store/board";
import { useRef } from "react";
import "./SinglePin.css";

const SinglePin = () => {
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  let boards = useSelector((state) => state.boards?.list);
  let currentPin = useSelector((state) => state.pins.list);
  // let currentUser = useSelector((state) => state.session.user);
  let users = useSelector((state) => state.session.users);
  users = Object.values(users);
  let creator = users?.filter((user) => currentPin.userId == user.id);
  // console.log(creator[0].profilePicture);

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const { pinId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPinDetails(pinId));
    dispatch(getUsersThunk());
    dispatch(fetchUserBoards());
  }, [dispatch, pinId]);

  const handleSaveToBoard = async (pinId, boardId) => {
    await dispatch(addPinToBoardThunk(pinId, boardId));
    closeMenu();
  };
  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div id="current-pin-container">
      <div id="current-pin-small-container">
        <div id="single-pin-image-container">
          <img id="single-pin-image" src={currentPin?.imageUrl} alt="" />
        </div>
        <div id="single-pin-right-side">
          <div id="single-pin-edit-container">
            <OpenModalButton
              id="single-pin-edit-button"
              buttonText={
                <p style={{ fontSize: "25px" }} id="single-pin-edit-button">
                  <BiDotsHorizontalRounded />
                </p>
              }
              modalComponent={<EditPin pin={currentPin} />}
            />
            <button onClick={toggleMenu} className="single-pin-save-button">
              Save
            </button>
            <div id="board-button-dropdown">
              {showMenu && (
                <ul className={ulClassName} ref={ulRef}>
                  <div id="single-pin-dropdown">
                    <h2>Boards</h2>
                    {boards?.map((board) => (
                      <button
                        onClick={() =>
                          handleSaveToBoard(currentPin.id, board?.id)
                        }
                        id="single-pin-board-name"
                        key={board?.id}
                      >
                        {board?.title}
                      </button>
                    ))}
                  </div>
                </ul>
              )}
            </div>
          </div>
          <div id="single-pin-title-container">
            <h1 id="single-pin-title">{currentPin?.title}</h1>
          </div>
          <div id="creator-name-photo">
            <img id="creator-img" src={creator[0]?.profilePicture} alt="" />
            <p id="single-pin-username">{creator[0]?.username}</p>
          </div>
          <div id="current-pin-description-container">
            <p>{currentPin.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePin;
