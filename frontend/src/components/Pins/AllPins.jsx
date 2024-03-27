import { fetchAllPins } from "../../store/pin";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AllPins = () => {
  const dispatch = useDispatch();

  let currentPins = useSelector((state) => state.pins.list);
  //   console.log("PINS", currentPins);
  currentPins = Object.values(currentPins);

  useEffect(() => {
    dispatch(fetchAllPins());
  }, [dispatch]);

  return (
    <>
      <h1>All Pins</h1>
      {currentPins?.map((pin) => (
        <p key={pin.id}>{pin.title}</p>
      ))}
    </>
  );
};

export default AllPins;
