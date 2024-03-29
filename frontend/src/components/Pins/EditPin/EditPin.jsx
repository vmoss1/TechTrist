import { editPinThunk } from "../../../store/pin";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { deletePinThunk } from "../../../store/pin";
import { useModal } from "../../../context/Modal";
import "./EditPin.css";

export default function CreatePin({ pin }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();
  const currentUser = useSelector((state) => state.session.user);
  const pinTitle = pin?.title;
  const pinDescription = pin?.description;
  const pinImageUrl = pin?.imageUrl;
  const pinCategory = pin?.category;
  const [title, setTitle] = useState(pinTitle);
  const [description, setDescription] = useState(pinDescription);
  const [imageUrl, setImageUrl] = useState(pinImageUrl);
  const [category, setCategory] = useState(pinCategory);
  const [errors, setErrors] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();

    const validate = {};
    if (!title) validate.title = "Please provide title";
    if (!description) validate.description = "Please provide a description";
    if (!imageUrl) validate.imageUrl = "Please provide an image URL";
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
        imageUrl,
        category,
      };

      const res = await dispatch(editPinThunk(pin?.id, editedPin));

      if (res && res.errors) {
        return setErrors(res.errors);
      }
      closeModal();
      navigate(`/pins/${pin?.id}`);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    await dispatch(deletePinThunk(pin.id));

    closeModal();
    navigate("/pins");
  };

  return (
    <div className="put-edit-form">
      <div className="outer-post_container">
        <form onSubmit={onSubmit}>
          <h2>Edit Pin</h2>
          <div id="create-pin-form">
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
            ImageUrl
            <label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              {"imageUrl" in errors && (
                <p className="errors">{errors.imageUrl}</p>
              )}
            </label>
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
            <button id="save-button">Save</button>
            <button id="delete-button" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}