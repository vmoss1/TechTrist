import { fetchAllPins } from "../../store/pin";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./AllPins.css";

const AllPins = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMouseOver, setIsMouseOver] = useState(false);
  const [currentSelectedKey, setCurrentSelectedKey] = useState(null);

  let currentPins = useSelector((state) => state.pins.list);
  let currentUser = useSelector((state) => state.session.user);
  currentPins = Object.values(currentPins);

  const handleMouseOver = (pinId) => {
    setCurrentSelectedKey(pinId);
    setIsMouseOver(true);
  };

  const handleMouseLeave = () => {
    setCurrentSelectedKey(null);
  };

  useEffect(() => {
    if (!currentUser) navigate("/");
    dispatch(fetchAllPins());
  }, [dispatch, currentUser, navigate]);

  return (
    <div id="all-pins-main-container">
      <div id="all-pins">
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
  );
};

export default AllPins;
