import { fetchAllPins } from "../../store/pin";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Skeleton from "react-loading-skeleton";


import "./AllPins.css";

const getFilteredPins = (query, pins) => {
  if (!query) {
    return pins;
  }
  return pins.filter((pin) => {
    const letterFilter =
      pin.title.includes(query) || pin.category.includes(query);

    const wordFilter =
      pin.title
        .toLowerCase()
        .split(" ")
        .some((word) => word.includes(query)) ||
      pin.category
        .toLowerCase()
        .split(" ")
        .some((word) => word.includes(query));
    return letterFilter || wordFilter;
  });
};

const AllPins = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMouseOver, setIsMouseOver] = useState(false);
  const [currentSelectedKey, setCurrentSelectedKey] = useState(null);
  const [query, setQuery] = useState("");

  let currentPins = useSelector((state) => state.pins.list);
  currentPins = Object.values(currentPins);
  const filteredPins = getFilteredPins(query, currentPins);
  let currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    if (!currentUser) navigate("/");
    dispatch(fetchAllPins());
  }, [dispatch, currentUser, navigate]);

  const handleSubmit = (e) => e.preventDefault();

  const handleMouseOver = (pinId) => {
    setCurrentSelectedKey(pinId);
    setIsMouseOver(true);
  };

  const handleMouseLeave = () => {
    setCurrentSelectedKey(null);
  };

  return (
    <div id="all-pins-main-container">
      <div id="search-bar-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="search-bar"
            placeholder="Search for pins"
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </div>

      <div id="all-pins">
        {filteredPins?.map((pin) => (
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
                <div id="container-img-username">
                  <img
                    id="pin-creator-img"
                    src={pin.User?.profilePicture}
                    alt={pin.title}
                  />
                  <h4 id="username-all-pins">{pin.User?.username}</h4>
                </div>
              </div>
            )}

            <div id="pins-link">
              <img
                id="pin-images"
                src={pin.imageUrl || <Skeleton />}
                alt={pin.title}
              />
            </div>
          </Link>
        ))}
      </div>
      <div id="footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default AllPins;
