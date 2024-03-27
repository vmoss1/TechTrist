import { fetchPinDetails } from "../../store/pin";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SinglePin = () => {
  const { pinId } = useParams();
  const dispatch = useDispatch();

  let currentPin = useSelector((state) => state.pins.pinDetails);
  //   console.log("PINS", currentPin);
  //   let currentPin = currentPins.filter((pin) => pin.id == pinId);

  useEffect(() => {
    dispatch(fetchPinDetails(pinId));
  }, [dispatch, pinId]);

  return (
    <>
      <h1>{currentPin.title}</h1>
    </>
  );
};

export default SinglePin;
