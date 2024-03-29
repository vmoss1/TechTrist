import { createPinThunk } from "../../../store/pin";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./CreatePin.css";

export default function CreatePin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.session.user);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
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
      const newPin = {
        userId: currentUser.id,
        title,
        description,
        imageUrl,
        category,
      };

      const res = await dispatch(createPinThunk(newPin));

      if (res && res.errors) {
        return setErrors(res.errors);
      }
      // passed in res.id because res is the newly created Pin which is where the id gets assigned
      navigate(`/pins/${res?.id}`);
    }
  };

  return (
    <div className="post-pin-form">
      <div id="post-form-header">
        <h2 id="post-form-h2">Create Pin</h2>
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
            Description
            <label>
              <textarea
                id="description"
                type="text"
                placeholder="Add a description"
                value={description}
                cols="50"
                rows="10"
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
                placeholder="Add a an image URL"
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
                placeholder="Add a category"
                onChange={(e) => setCategory(e.target.value)}
              />
              {"category" in errors && (
                <p className="errors">{errors.category}</p>
              )}
            </label>
            <button id="save-button">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
