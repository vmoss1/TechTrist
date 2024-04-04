import { useSelector } from "react-redux/es/hooks/useSelector";
import { SiKingstontechnology } from "react-icons/si";
import { useDispatch } from "react-redux";
import { fetchAllPins } from "../../store/pin";
import { fetchUserBoards } from "../../store/board";
import "./UserHome.css";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import OpenModalButton from "../OpenModalButton";
import { Link, NavLink } from "react-router-dom";
import CreateBoard from "../Boards/CreateBoard/CreateBoard";
import { useModal } from "../../context/Modal";
import { getUsersThunk } from "../../store/session";

function UserHome() {
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [isMouseOver, setIsMouseOver] = useState(null);
  const [currentSelectedKey, setCurrentSelectedKey] = useState(null);
  let users = useSelector((state) => state.session.users);
  users = Object.values(users);

  let currentPins = useSelector((state) => state.pins.list);
  let boards = useSelector((state) => state.boards.list);
  boards = Object.values(boards);
  currentPins = Object.values(currentPins);
  currentPins = currentPins.filter((pins) => pins.userId == currentUser.id);
  let creator = users?.filter((user) => currentPins[0]?.userId == user.id);
  // console.log(creator[0].followers.length);

  const handleMouseOver = (pinId) => {
    setCurrentSelectedKey(pinId);
    setIsMouseOver(true);
  };

  const handleMouseLeave = () => {
    setCurrentSelectedKey(null);
  };

  useEffect(() => {
    dispatch(fetchAllPins());
    dispatch(fetchUserBoards());
    dispatch(getUsersThunk());
  }, [dispatch]);

  return (
    <div id="profile-page-container">
      <img id="profile-page-picture" src={currentUser.profilePicture} alt="" />
      <h1 id="profile-page-h1">
        {currentUser.firstName}
        {"   "} {currentUser.lastName}
      </h1>

      <p id="profile-page-p">
        <SiKingstontechnology />
        {currentUser.username}
      </p>
      <p id="followers-length">{creator[0]?.followers?.length} followers</p>
      <div id="plus-emblem-container">
        <OpenModalButton
          buttonText={
            <div id="plus-emblem" style={{ fontSize: "30px" }}>
              <FaPlus />
            </div>
          }
          modalComponent={
            <div id="profile-add-new-pin-board">
              <div id="profile-new-pin-container">
                <Link
                  id="profile-new-pin"
                  to={"./pins/new"}
                  onClick={() => closeModal()}
                >
                  Pin
                </Link>
              </div>
              <div id="profile-new-board-container">
                <OpenModalButton
                  buttonText={<p id="open-modal-new-board">Board</p>}
                  modalComponent={<CreateBoard />}
                />
              </div>
            </div>
          }
        />
      </div>
      <div id="boards-pins-container">
        <div id="my-boards-container">
          <h2 id="my-boards-title">My Boards</h2>
          <div id="all-boards">
            {boards?.map((board) => (
              <NavLink id="board" key={board.id} to={`/boards/${board.id}`}>
                <div id="boards-link" to={`/boards/${board.id}`}>
                  <h3 id="board-title-profile">{board?.title}</h3>
                </div>
              </NavLink>
            ))}
          </div>
        </div>

        <div id="home-pins-container">
          <div id="pins-title-container">
            <h2 id="my-pins-title">My Pins</h2>
          </div>
          <div id="all-pins-home">
            {currentPins?.map((pin) => (
              <Link
                to={`/pins/${pin.id}`}
                id="pin"
                onMouseLeave={handleMouseLeave}
                onMouseOver={() => handleMouseOver(pin.id)}
                key={pin.id}
              >
                {isMouseOver && currentSelectedKey === pin.id && (
                  <div id="pin__overlay">
                    <h3 className="pin-overlay-icons">{pin.title}</h3>
                    <h3 className="pin-overlay-icons"></h3>
                    <h3 className="pin-overlay-icons"></h3>
                  </div>
                )}
                <div id="pins-link" key={pin.id}>
                  <img id="pin-images" src={pin.imageUrl} alt={pin.title} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
