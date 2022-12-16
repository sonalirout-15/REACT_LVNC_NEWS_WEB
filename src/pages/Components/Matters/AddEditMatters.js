import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { createMettersStart, updateMettersStart } from "../../../Redux/Actions/MattersActions";

const initialState = {
  title: '',
  Description: '',
  image: '',
  audio: '',
  video: '',
}

const AddEditMattters = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [editMode, setEditMode] = useState(false);
  const history = useHistory();
  const [titleError, setTitleError] = useState();
  const [descriptionError, setDescriptionError] = useState();
  const [imageError, setImageError] = useState();
  const [audioError, setAudioError] = useState();
  const [videoError, setVedioError] = useState();
  var { title, Description, image, audio, video } = formValue;
  const dispatch = useDispatch();
  var { id } = useParams();

  const metters = useSelector((state) => state?.metters?.metters?.mettersData?.rows)

  useEffect(() => {
    if (id) {
      setEditMode(true);
      const singleMetters = metters
        ? metters.find((item) => item.id === Number(id))
        : null;
      setFormValue({ ...singleMetters });
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
    if (Description === '') {
      setDescriptionError('Description Required!');
    }
    if (image === '') {
      setImageError('Image Required!');
    }
    if (audio === '') {
      setAudioError('Audio Required!')
    }
    if (video === '') {
      setVedioError('Vedio Required!')
    } else {
      if (!editMode) {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("Description", Description);
        formData.append("image", image);
        formData.append("audio", audio);
        formData.append("video", video);
        dispatch(createMettersStart(formData));
        history.push('/matters')
      }
      else {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("title", title);
        formData.append("Description", Description);
        formData.append("image", image);
        formData.append("audio", audio);
        formData.append("video", video);
        dispatch(updateMettersStart(formData));
        setEditMode(false);
        history.push('/matters')
      }
    }
  }

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    console.log("form ...", formValue);
  };

  const handleFileSelect = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.files[0] });
  };
  return (
    <>
      <div className="main-content">
        <section className="section">
          <div className="section-header">
            <h4>Matters</h4>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="section-body">
              <div className="row">
                <div className="col-18 col-md-6 col-lg-6">
                  <div className="card">
                    <div className="card-header">
                      <center><strong>{!editMode ? "Add Matters" : "Update Matters"}</strong></center>
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
                          id="Description"
                          value={Description || ""}
                          name="Description"
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
                      <button type="submit" className="btn btn-primary">{!editMode ? "Add" : "Update"}</button>{" "}
                      <Link to={'/matters'} className="btn btn-info"> Back </Link>
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

export default AddEditMattters;