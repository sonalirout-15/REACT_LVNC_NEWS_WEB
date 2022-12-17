import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { loadAdminStart } from "../../../Redux/Actions/AdminActions";
import { loadCategoryStart } from "../../../Redux/Actions/CategoryAction";
import { createPostStart, updatePostStart } from "../../../Redux/Actions/PostActions";
import { loadSubcategoryStart } from "../../../Redux/Actions/SubcategoryActions";

const initialState = {
  title: '',
  description: '',
  image: '',
  audio: '',
  video: '',
}

const AddEditLatestNews = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [editMode, setEditMode] = useState(false);
  const history = useHistory();
  const [titleError, setTitleError] = useState();
  const [descriptionError, setDescriptionError] = useState();
  const [imageError, setImageError] = useState();
  const [audioError, setAudioError] = useState();
  const [videoError, setVedioError] = useState();
  var {  title, description, image, video } = formValue;
  const dispatch = useDispatch();
  var { id } = useParams();

  const latestnews = useSelector((state) => state)

  useEffect(() => {
    if (id) {
      setEditMode(true);
      const singleLatestNews = latestnews ? latestnews.find((item) => item.id === Number(id)) : null;
      setFormValue({ ...singleLatestNews });
    } else {
      setEditMode(false);
      setFormValue({ ...formValue });
    }
  }, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title === '') {
      setTitleError('Title Required!')
    }
    if (description === '') {
      setDescriptionError('Description Required!');
    }
    if (image === '') {
      setImageError('Image Required!');
    }
    if (video === '') {
      setVedioError('Vedio Required!')
    } else {

      if (!editMode) {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("image", image);
        formData.append("video", video);
        dispatch(createPostStart(formData));
        history.push('/latestnews')
      }
      else {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("image", image);
        formData.append("video", video);
        dispatch(updatePostStart(formData));
        setEditMode(false);
        history.push('/latestnews')
      }
    }
  };


  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleFileSelect = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.files[0] });
  };

  return (
    <>
      <div className="main-content">
        <section className="section">
          <div className="section-header">
            <h4>Post</h4>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="section-body">
              <div className="row">
                <div className="col-18 col-md-6 col-lg-6">
                  <div className="card">
                    <div className="card-header">
                      <center><strong>{!editMode ? "Add Post" : "Update Post"}</strong></center>
                    </div>
                    <div className="card-body">
                      <div className="form-group">
                        <label>Title</label>
                        <input
                          type="text"
                          className="form-control"
                          id="title"
                          value={title || ""}
                          name="title"
                          onChange={onInputChange}
                        />
                      <label style={{
                        color: "red",
                        marginLeft: "2%",
                        display: "flex"
                      }}>
                        {titleError}
                      </label>
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <input
                          type="text"
                          className="form-control"
                          id="description"
                          value={description || ""}
                          name="description"
                          onChange={onInputChange} />
                      <label style={{
                        color: "red",
                        marginLeft: "2%",
                        display: "flex"
                      }}>
                        {descriptionError}
                      </label>
                      </div>
                      <div className="form-group">
                        <label>Image</label>
                        <input
                          type="file"
                          className="form-control"
                          accept="/accept/*"
                          id="image"
                          defaultValue={image || ""}
                          name="image"
                          onChange={handleFileSelect} />
                      <label style={{
                        color: "red",
                        marginLeft: "2%",
                        display: "flex"
                      }}>
                        {imageError}
                      </label>
                      </div>
                      <div className="form-group">
                        <label>Audio</label>
                        <input
                          type="file"
                          className="form-control"
                          accept="/accept/*"
                          id="audio"
                          defaultValue={audio || ""}
                          name="audio"
                          onChange={handleFileSelect} />
                      <label style={{
                        color: "red",
                        marginLeft: "2%",
                        display: "flex"
                      }}>
                        {audioError}
                      </label>
                      </div>
                      <div className="form-group">
                        <label>Video</label>
                        <input
                          type="file"
                          className="form-control"
                          accept="/accept/*"
                          id="video"
                          defaultValue={video || ""}
                          name="video"
                          onChange={handleFileSelect} />
                      <label style={{
                        color: "red",
                        marginLeft: "2%",
                        display: "flex"
                      }}>
                        {videoError}
                      </label>
                      </div>
                      <div className="form-group">
                        <label>Admin Id</label>
                        <select
                          className="form-control"
                          id="admin_ref_id"
                          value={admin_ref_id || ""}
                          name="admin_ref_id"
                          onChange={onInputChange}
                        >
                          {admin ? admin.map(adminItem => (
                            <option
                              key={adminItem.name}
                              value={adminItem.id}>
                              {adminItem.name}
                            </option>
                          )) : null}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Subcategory Id</label>
                        <select
                          className="form-control"
                          id="subcategory_ref_id"
                          value={subcategory_ref_id || ""}
                          name="subcategory_ref_id"
                          onChange={onInputChange}
                        >
                          {subcategories ? subcategories.map(subcatItem => (
                            <option
                              key={subcatItem.subcategory_name}
                              value={subcatItem.id}>
                              {subcatItem.subcategory_name}
                            </option>
                          )) : null}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Category Id</label>
                        <select
                          className="form-control"
                          id="category_ref_id"
                          value={category_ref_id || ""}
                          name="category_ref_id"
                          onChange={onInputChange}
                        >
                          {categories ? categories.map(catItem => (
                            <option
                              key={catItem.category_name}
                              value={catItem.id}>
                              {catItem.category_name}
                            </option>
                          )) : null}
                        </select>
                      </div>
                      <button type="submit" className="btn btn-primary">{!editMode ? "Add" : "Update"}</button>{" "}
                      <Link to={'/post'} className="btn btn-info"> Back </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>
      </div>
    </>
  )
}

export default AddEditLatestNews;