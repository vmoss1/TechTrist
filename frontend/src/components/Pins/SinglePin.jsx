import { fetchPinDetails } from "../../store/pin";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import EditPin from "../Pins/EditPin/EditPin";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { getUsersThunk } from "../../store/session";

import "./SinglePin.css";

const SinglePin = () => {
  const { pinId } = useParams();
  const dispatch = useDispatch();

  let currentPin = useSelector((state) => state.pins.list);
  // let currentUser = useSelector((state) => state.session.user);
  let users = useSelector((state) => state.session.users);
  users = Object.values(users);
  let creator = users?.filter((user) => currentPin.userId == user.id);
  // console.log(creator[0].profilePicture);

  useEffect(() => {
    dispatch(fetchPinDetails(pinId));
    dispatch(getUsersThunk());
  }, [dispatch, pinId]);

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
