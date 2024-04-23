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
import { createCommentThunk } from "../../store/pin";
import { deleteCommentThunk } from "../../store/pin";
import { IoMdTrash } from "react-icons/io";
import { Link } from "react-router-dom";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import {
  createFavoriteThunk,
  deleteFavoriteThunk,
  fetchCurrentFavorites,
} from "../../store/favorite";
import Skeleton from "react-loading-skeleton";
import "./SinglePin.css";

const SinglePin = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [body, setBody] = useState("");
  const ulRef = useRef();
  const [errors, setErrors] = useState({});
  const showButton = body !== "";

  let boards = useSelector((state) => state.boards?.list);
  let currentUser = useSelector((state) => state.session.user);
  let users = useSelector((state) => state.session.users);
  users = Object.values(users);

  let currentPin = useSelector((state) => state.pins?.list);
  let creator = users?.filter((user) => currentPin?.userId == user.id);
  let followers = creator[0]?.followers?.length;

  let currentUserFavorites = useSelector((state) => state.favorites.list);
  currentUserFavorites = Object.values(currentUserFavorites);

  const isFavorite = currentUserFavorites.find(
    (favorite) => favorite?.pinId === currentPin.id
  );
  const [favorite, setFavorite] = useState(isFavorite);

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
    const fetchData = async () => {
      await dispatch(fetchPinDetails(pinId));
      await dispatch(getUsersThunk());
      await dispatch(fetchUserBoards());
      await dispatch(fetchCurrentFavorites());
    };
    fetchData();
  }, [dispatch, pinId, body, favorite]);

  const handleSaveToBoard = async (pinId, boardId) => {
    await dispatch(addPinToBoardThunk(pinId, boardId));
    closeMenu();
  };

  const handleDelete = async (e, commentId) => {
    e.preventDefault();
    await dispatch(deleteCommentThunk(commentId));
    await dispatch(fetchPinDetails(pinId));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const validate = {};
    if (!body) validate.body = "Please provide a comment";

    if (Object.values(validate).length) {
      setErrors(validate);
    } else {
      const newComment = {
        userId: currentUser.id,
        pinId: pinId,
        body: body,
      };

      const res = await dispatch(createCommentThunk(pinId, newComment));

      if (res && res.errors) {
        return setErrors(res.errors);
      }
      setBody("");
    }
  };

  const setFavoriteFunc = async (pinId) => {
    if (isFavorite != undefined) {
      await dispatch(deleteFavoriteThunk(pinId));
      setFavorite(false);
    } else {
      await dispatch(createFavoriteThunk(pinId));
      setFavorite(true);
    }
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div id="current-pin-container">
      <div id="back-button" style={{ fontSize: "35px", color: "black" }}>
        <Link id="back-link" to={`/pins`}>
          <IoChevronBackCircleOutline />
        </Link>
      </div>
      <div id="current-pin-small-container">
        <img
          id="single-pin-image"
          src={currentPin?.imageUrl || <Skeleton />}
          alt=""
        />
        <div id="single-pin-right-side">
          <div id="single-pin-edit-container">
            <div id="single-pin-edit-button">
              <OpenModalButton
                id="single-pin-edit-button"
                closeTimeoutMS={2000}
                buttonText={
                  <p style={{ fontSize: "25px" }}>
                    <BiDotsHorizontalRounded />
                  </p>
                }
                modalComponent={<EditPin pin={currentPin} />}
              />
            </div>
            <div>
              <button onClick={toggleMenu} className="single-pin-save-button">
                Save
              </button>
            </div>
            {showMenu && (
              <ul className={ulClassName} ref={ulRef}>
                <div id="single-pin-dropdown">
                  <h2 id="my-boards-title-side">My Boards</h2>
                  {boards?.map((board) => (
                    <button
                      onClick={() =>
                        handleSaveToBoard(currentPin.id, board?.id)
                      }
                      id="single-pin-board-name"
                      key={board?.id}
                    >
                      {board?.title || <Skeleton />}
                    </button>
                  ))}
                </div>
              </ul>
            )}
          </div>
          <div id="single-pin-title-container">
            <h1 id="single-pin-title">{currentPin?.title || <Skeleton />}</h1>
          </div>
          <div id="creator-name-photo">
            <img
              id="creator-img"
              src={creator[0]?.profilePicture || <Skeleton />}
              alt=""
            />
            <div>
              <p id="single-pin-username">
                {creator[0]?.username || <Skeleton />}
              </p>
              {followers > 0 && (
                <p id="single-pin-followers">
                  {followers || <Skeleton />} followers
                </p>
              )}
            </div>

            <div id="set-favorite-container">
              <h2
                id="set-favorite"
                onClick={() => setFavoriteFunc(currentPin.id)}
              >
                <div
                  id="heart-favorite"
                  style={{ fontSize: "40px", color: "red" }}
                >
                  {isFavorite === undefined ? (
                    <GoHeart />
                  ) : (
                    <GoHeartFill /> || <Skeleton />
                  )}
                </div>
              </h2>
            </div>
          </div>

          <div id="current-pin-description-container">
            <p id="single-pin-description">
              {currentPin.description || <Skeleton count={10} />}
            </p>
          </div>
          <div>
            <p id="comment-title">Comments</p>
          </div>
          <div>
            {currentPin?.Comments?.map((comment) => (
              <>
                <div id="comment-photo-and-username">
                  <img
                    id="single-pin-comment-photo"
                    src={comment.User.profilePicture || <Skeleton />}
                    alt=""
                  />
                  <p id="comment-username">
                    {comment.User.username || <Skeleton />}
                  </p>
                </div>
                <p id="comment-body" key={comment.id}>
                  {comment.body || <Skeleton />}
                </p>
                <div id="remove-comment-container">
                  {comment.User.id === currentUser.id && creator && (
                    <button
                      id="remove-comment-button"
                      onClick={(e) => handleDelete(e, comment.id)}
                    >
                      <IoMdTrash />
                    </button>
                  )}
                </div>
              </>
            ))}
          </div>
          <div id="comment-form">
            <img
              id="creator-img-comment"
              src={currentUser?.profilePicture || <Skeleton />}
              alt=""
            />
            <form onSubmit={onSubmit}>
              <label>
                <input
                  placeholder="Add a comment"
                  type="text"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
                {"body" in errors && <p className="errors">{errors.body}</p>}
              </label>
              {showButton && (
                <button id="submit-button-single-pin">Submit</button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePin;
