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

    if (title.length == 0) {
      setErrors({ Title: "Title is required" });
      return;
    } else if (title.length > 30) {
      setErrors({
        Title: "Title must be shorter than 30 characters long.",
      });
      return;
    }

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
              {errors?.title && <p className="p-error">{errors.title}</p>}
            </label>
            Description
            <label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {errors?.description && (
                <p className="p-error">{errors.description}</p>
              )}
            </label>
            ImageUrl
            <label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              {errors?.imageUrl && <p className="p-error">{errors.imageUrl}</p>}
            </label>
            Category
            <label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              {errors?.category && <p className="p-error">{errors.category}</p>}
            </label>
            <button>Save</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </form>
      </div>
    </div>
  );
}
