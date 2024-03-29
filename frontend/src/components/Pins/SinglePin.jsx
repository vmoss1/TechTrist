import { fetchPinDetails } from "../../store/pin";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import EditPin from "../Pins/EditPin/EditPin";
import { BiDotsHorizontalRounded } from "react-icons/bi";

import "./SinglePin.css";

const SinglePin = () => {
  const { pinId } = useParams();
  const dispatch = useDispatch();

  let currentPin = useSelector((state) => state.pins.list);

  useEffect(() => {
    dispatch(fetchPinDetails(pinId));
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
                <p id="single-pin-edit-button">
                  <BiDotsHorizontalRounded />
                </p>
              }
              modalComponent={<EditPin pin={currentPin} />}
            />
          </div>
          <div id="single-pin-title-container">
            <h1 id="single-pin-title">{currentPin?.title}</h1>
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
