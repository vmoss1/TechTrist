import { editPinThunk } from "../../../store/pin";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { deletePinThunk } from "../../../store/pin";
import { useModal } from "../../../context/Modal";
import { fetchPinDetails } from "../../../store/pin";

import "./EditPin.css";

export default function EditPin({ pin }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();
  const currentUser = useSelector((state) => state.session.user);
  const pinTitle = pin?.title;
  const pinDescription = pin?.description;
  const pinCategory = pin?.category;
  const [title, setTitle] = useState(pinTitle);
  const [description, setDescription] = useState(pinDescription);
  const [category, setCategory] = useState(pinCategory);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchPinDetails(pin.id));
    };
    fetchData();
  }, [dispatch, pin.id]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const validate = {};

    if (currentUser.id != pin.userId) {
      validate.userCheck = "You are not authorized to make this change";
    }

    if (!title) validate.title = "Please provide title";
    if (!description) validate.description = "Please provide a description";
    if (!category) validate.category = "Please provide a category";
    if (title.length > 50 || title.length < 5)
      validate.title =
        "Please write at least 5 characters but not more than 50";
    if (description.length > 600 || title.length < 5)
      validate.description =
        "Please write at least 5 characters but not more than 600";
    if (category.length > 50 || title.length < 5)
      validate.category =
        "Please write at least 5 characters but not more than 50";

    if (Object.values(validate).length) {
      setErrors(validate);
    } else {
      const editedPin = {
        id: pin?.id,
        userId: currentUser.id,
        title,
        description,
        category,
      };

      const res = await dispatch(editPinThunk(pin.id, editedPin));
      await dispatch(fetchPinDetails(pin.id));

      if (res && res.errors) {
        return setErrors(res.errors);
      }
      closeModal();
      navigate(`/pins/${res.id}`);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    let validate = {};

    if (currentUser.id != pin.userId) {
      validate.userDeleteCheck = "You are not authorized to make this change";
    }

    if (Object.values(validate).length) {
      setErrors(validate);
    } else {
      await dispatch(deletePinThunk(pin.id));

      closeModal();
      navigate("/pins");
    }
  };

  return (
    <div className="put-edit-form">
      <div className="outer-post_container">
        <form onSubmit={onSubmit}>
          <h2>Edit Pin</h2>
          <div id="edit-pin-form">
            Title
            <label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {"title" in errors && <p className="errors">{errors.title}</p>}
            </label>
            Description
            <label>
              <textarea
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {"description" in errors && (
                <p className="errors">{errors.description}</p>
              )}
            </label>
            {/* <label>
              <input id="post-image-url" type="file" onChange={updateFile} />
            </label>
            {imagePreview && (
              <img
                id="preview-image"
                src={imagePreview}
                alt="preview of uploaded image"
                style={{ maxWidth: "300px" }}
              />
            )}
            {"imageUrl" in errors && (
              <p className="errors">{errors.imageUrl}</p>
            )} */}
            Category
            <label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              {"category" in errors && (
                <p className="errors">{errors.category}</p>
              )}
            </label>
            <button type="submit" id="save-button">
              Save
            </button>
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
