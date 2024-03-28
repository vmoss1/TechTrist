import { fetchAllPins } from "../../store/pin";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AllPins = () => {
  const dispatch = useDispatch();

  let currentPins = useSelector((state) => state.pins.list);
  console.log("PINS", currentPins);
  currentPins = Object.values(currentPins);

  useEffect(() => {
    dispatch(fetchAllPins());
  }, [dispatch]);

  return (
    <div id="all-pins-main-container">
      {currentPins?.map((pin) => (
        <div key={pin.id}>
          <Link to={`/pins/${pin.id}`} key={pin.id}>
            {pin.title}
          </Link>
          <img src={pin.imageUrl} alt="" />
        </div>
      ))}
    </div>
  );
};

export default AllPins;
