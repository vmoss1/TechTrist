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
  const [imageUrl, setImageUrl] = useState(null);
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState("");

  if (!currentUser) navigate("/");

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUrl(file);

      // Create a URL for image preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
        category,
        imageUrl,
      };

      // console.log("NEW-PIN", newPin);

      const res = await dispatch(createPinThunk(newPin));

      if (res && res.errors) {
        return setErrors(res.errors);
      }
      // console.log("RES", res);
      // passed in res.id because res is the newly created Pin which is where the id gets assigned
      navigate(`/pins/${res?.id}`);
    }
  };

  return (
    <div className="post-pin-form">
      <div id="post-form-header">
        <h2 id="post-form-h2">Create Pin</h2>
      </div>
      <div id="outer-post-containers">
        <form id="outer-post-container" onSubmit={onSubmit}>
          <div id="post-pin-image-url">
            <div id="post-pin-image-form-container">
              Upload Image
              <label>
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
            </div>
            {"imageUrl" in errors && (
              <p className="errors">{errors.imageUrl}</p>
            )}
          </div>
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
