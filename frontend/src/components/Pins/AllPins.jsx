import { fetchAllPins } from "../../store/pin";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./AllPins.css";

const AllPins = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let currentPins = useSelector((state) => state.pins.list);
  let currentUser = useSelector((state) => state.session.user);
  //   console.log("PINS", currentPins);
  currentPins = Object.values(currentPins);

  useEffect(() => {
    if (!currentUser) navigate("/");
    dispatch(fetchAllPins());
  }, [dispatch, currentUser, navigate]);

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
