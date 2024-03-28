import { createPinThunk } from "../../../store/pin";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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

    if (title.length == 0) {
      setErrors({ Title: "Title is required" });
      return;
    } else if (title.length > 30) {
      setErrors({
        Title: "Title must be shorter than 30 characters long.",
      });
      return;
    }
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
  };

  return (
    <div className="post-pin-form">
      <div className="outer-post_container">
        <form onSubmit={onSubmit}>
          <h2>Create Pin</h2>
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
          </div>
        </form>
      </div>
    </div>
  );
}
