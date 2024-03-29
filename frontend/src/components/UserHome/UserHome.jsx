import { useSelector } from "react-redux/es/hooks/useSelector";
import { SiKingstontechnology } from "react-icons/si";
import { useDispatch } from "react-redux";
import { fetchAllPins } from "../../store/pin";
import "./UserHome.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function UserHome() {
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  let currentPins = useSelector((state) => state.pins.list);
  //   console.log("PINS", currentPins);
  currentPins = Object.values(currentPins);
  currentPins = currentPins.filter((pins) => pins.userId == currentUser.id);

  useEffect(() => {
    dispatch(fetchAllPins());
  }, [dispatch]);

  return (
    <div id="profile-page-container">
      <img id="profile-page-picture" src={currentUser.profilePicture} alt="" />
      <h1 id="profile-page-h1">
        {currentUser.firstName}
        {"   "} {currentUser.lastName}
      </h1>

      <p id="profile-page-p">
        <SiKingstontechnology />
        {currentUser.username}
      </p>
      <div>
        <p>My Pins</p>
        <div id="all-pins">
          {currentPins?.map((pin) => (
            <div id="pin" key={pin.id}>
              <Link id="pins-link" to={`/pins/${pin.id}`} key={pin.id}>
                {pin.title}
                <img id="pin-images" src={pin.imageUrl} alt={pin.title} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserHome;
