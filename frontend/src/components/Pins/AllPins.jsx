import { fetchAllPins } from "../../store/pin";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./AllPins.css";

const AllPins = () => {
  const dispatch = useDispatch();

  let currentPins = useSelector((state) => state.pins.list);
  //   console.log("PINS", currentPins);
  currentPins = Object.values(currentPins);

  useEffect(() => {
    dispatch(fetchAllPins());
  }, [dispatch]);

  return (
    <div id="all-pins-main-container">
      <div id="all-pins">
        {currentPins?.map((pin) => (
          <div id="pin" key={pin.id}>
            <Link id="pins-link" to={`/pins/${pin.id}`} key={pin.id}>
              <img id="pin-images" src={pin.imageUrl} alt={pin.title} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPins;
