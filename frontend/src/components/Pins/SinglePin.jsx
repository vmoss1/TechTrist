import { fetchPinDetails } from "../../store/pin";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import EditPin from "../Pins/EditPin/EditPin";

const SinglePin = () => {
  const { pinId } = useParams();
  const dispatch = useDispatch();

  let currentPin = useSelector((state) => state.pins.list);
  //   console.log("PINS", currentPin);
  //   let currentPin = currentPins.filter((pin) => pin.id == pinId);

  useEffect(() => {
    dispatch(fetchPinDetails(pinId));
  }, [dispatch, pinId]);

  return (
    <>
      <h1>{currentPin?.title}</h1>
      <OpenModalButton
        buttonText="Edit Pin"
        modalComponent={<EditPin pin={currentPin} />}
      />
    </>
  );
};

export default SinglePin;
