import { useState } from "react";
import { createBoardThunk } from "../../../store/board";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useNavigate } from "react-router-dom";
import "./CreateBoard.css";

export default function CreateBoard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();
  const currentUser = useSelector((state) => state.session.user);

  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();

    const validate = {};
    if (!title) validate.title = "Please provide title";
    if (title.length > 50 || title.length < 5)
      validate.title =
        "Please write at least 5 characters but not more than 50";

    if (Object.values(validate).length) {
      setErrors(validate);
    } else {
      const newBoard = {
        userId: currentUser.id,
        title,
      };

      const res = await dispatch(createBoardThunk(newBoard));

      if (res && res.errors) {
        return setErrors(res.errors);
      }
      // passed in res.id because res is the newly created Board which is where the id gets assigned
      navigate(`/boards/${res?.id}`);
      closeModal();
    }
  };

  return (
    <div className="post-board-form">
      <div id="post-form-header">
        <h2 id="post-form-h2">Create Board</h2>
      </div>
      <div className="outer-post-container">
        <form onSubmit={onSubmit}>
          <div id="create-pin-form">
            Title
            <label>
              <input
                placeholder="Add a title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {"title" in errors && <p className="errors">{errors.title}</p>}
            </label>
            <button id="save-button">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
