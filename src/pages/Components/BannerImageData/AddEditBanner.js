import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { createBannerImageStart, updateBannerImageStart } from "../../../Redux/Actions/BannerImageAction";

const initialState = {
  imageName: '',
  image: '',
}

const AddEditBanner = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [editMode, setEditMode] = useState(false);
  const history = useHistory();
  const [imageNameError, setImageNameError] = useState();
  const [imageError, setImageError] = useState();
  var { id, imageName , image } = formValue;
//   console.log('FORM-DATA=================??>>>>',formValue)
  const dispatch = useDispatch();
  var { id } = useParams();

  const banner = useSelector((state) => state);
  console.log('BANNER-DATA~~~~~~~~~~~>>>>>>', banner)

  useEffect(() => {
    if (id) {
      setEditMode(true);
      const singleBanner = banner ? banner.find((item) => item.id === Number(id)) : null;
      setFormValue({ ...singleBanner });
    } else {
      setEditMode(false);
      setFormValue({ ...initialState });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageName === '') {
      setImageNameError('Title Required!')
    }
    if (image === '') {
      setImageError('Image Required!');
    } else {
      if (!editMode) {
        const formData = new FormData();
        formData.append("imageName", imageName);
        formData.append("image", image);
        dispatch(createBannerImageStart(formData));
        // history.push('/banner')

      }
      else {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("imageName", imageName);
        formData.append("image", image);
        dispatch(updateBannerImageStart(formData));
        setEditMode(false);
        history.push('/banner')
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
            <center><strong>{!editMode ? "Add Banner" : "Update Banner"}</strong></center>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="section-body">
              <div className="row">
                <div className="col-18 col-md-6 col-lg-6">
                  <div className="card">
                    <div className="card-header">
                      <h4>Banner</h4>
                    </div>
                    <div className="card-body">
                      <div className="form-group">
                        <label>Title</label>
                        <input
                          type="text"
                          className="form-control"
                          id="imageName"
                          value={imageName || ""}
                          name="imageName"
                          onChange={onInputChange}
                        />
                      <label style={{
                        color: "red",
                        marginLeft: "2%",
                        display: "flex"
                      }}>
                        {imageNameError}
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
                      <button type="submit" className="btn btn-primary">{!editMode ? "Add" : "Update"}</button>{" "}
                      <Link to={'/banner'} className="btn btn-info"> Back </Link>
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

export default AddEditBanner;