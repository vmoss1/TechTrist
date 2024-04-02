import { editBoardThunk } from "../../../store/board";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { deleteBoardThunk } from "../../../store/board";
import { useModal } from "../../../context/Modal";
import { fetchBoardDetails } from "../../../store/board";
import "./EditBoard.css";

export default function EditBoard({ board }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();
  const currentUser = useSelector((state) => state.session.user);
  const boardTitle = board?.title;
  const [title, setTitle] = useState(boardTitle);
  const [errors, setErrors] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();

    const validate = {};

    if (currentUser.id != board?.userId) {
      validate.userCheck = "You are not authorized to make this change";
    }

    if (!title) validate.title = "Please provide title";
    if (title.length > 50 || title.length < 5)
      validate.title =
        "Please write at least 5 characters but not more than 50";

    if (Object.values(validate).length) {
      setErrors(validate);
    } else {
      const editedBoard = {
        id: board?.id,
        userId: currentUser.id,
        title,
      };

      const res = await dispatch(editBoardThunk(board?.id, editedBoard));
      dispatch(fetchBoardDetails(board.id));

      if (res && res.errors) {
        return setErrors(res.errors);
      }
      closeModal();
      navigate(`/boards/${board?.id}`);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    let validate = {};

    if (currentUser.id != board?.userId) {
      validate.userDeleteCheck = "You are not authorized to make this change";
    }

    if (Object.values(validate).length) {
      setErrors(validate);
    } else {
      await dispatch(deleteBoardThunk(board?.id));

      closeModal();
      navigate("/Myprofile");
    }
  };

  return (
    <div className="put-edit-form">
      <div className="outer-post_container">
        <form onSubmit={onSubmit}>
          <h2>Edit Board</h2>
          <div id="edit-board-form">
            Title
            <label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {"title" in errors && <p className="errors">{errors.title}</p>}
            </label>
            <button id="save-button">Save</button>
            {"userCheck" in errors && (
              <p className="errors">{errors.userCheck}</p>
            )}
            <button id="delete-button" onClick={handleDelete}>
              Delete
            </button>
            {"userDeleteCheck" in errors && (
              <p className="errors">{errors.userDeleteCheck}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
