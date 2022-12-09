import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { loadCategoryStart } from "../../../Redux/Actions/CategoryAction";
import { createSubcategoryStart, updateSubcategoryStart } from "../../../Redux/Actions/SubcategoryActions";

const initialState = {
  category_ref_id: '',
  subcategory_name: '',
  Description: '',
  image:''
}

const AddEditSubcategories = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [nameError, setNameError] = useState();
  const [descriptionError, setDescriptionError] = useState();
  const [imageError, setImageError] = useState();
  const [editMode, setEditMode] = useState(false);
  const history = useHistory()
  var { id,category_ref_id ,subcategory_name, Description, image } = formValue;
  const dispatch = useDispatch();
  var { id } = useParams();

const subcategories = useSelector((state) => state?.subcategory?.subcategories?.categoryData?.rows);
const categories = useSelector((state) => state?.categoryData?.categories?.categoryData?.rows);

useEffect(() => {
    if (id) {
      setEditMode(true);
      const singleSubcategory = subcategories ? subcategories.find((item) => item.id === Number(id)) : null;
      setFormValue({ ...singleSubcategory });
    } else {
      setEditMode(false);
      setFormValue({ ...formValue });
    }
}, [id]);

useEffect(() => {
  dispatch(loadCategoryStart())
}, [])

const handleSubmit = async (e) => {
  e.preventDefault();
  if (category_ref_id === '' && subcategory_name === '') {
    setNameError('Required!')
  }
  if(Description === ''){
    setDescriptionError('Description Required!')
  }
  if (image === '') {
    setImageError('Image Required!');
  }
  else {

    if (!editMode) {
      const formData = new FormData();
      formData.append("category_ref_id", category_ref_id);
      formData.append("subcategory_name", subcategory_name);
      formData.append("Description", Description);
      formData.append("image", image);
      dispatch(createSubcategoryStart(formData));
      history.push('/post')
    }
    else {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("category_ref_id", category_ref_id);
      formData.append("subcategory_name", subcategory_name);
      formData.append("Description", Description);
      formData.append("image", image);
      dispatch(updateSubcategoryStart(formData));
      setEditMode(false);
      history.push('/post')
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
            <h4>Subcategory</h4>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="section-body">
              <div className="row">
                <div className="col-18 col-md-6 col-lg-6">
                  <div className="card">
                    <div className="card-header">
                      <center><strong>{!editMode ? "Add Subcategory" : "Update Subcategory"}</strong></center>
                    </div>
                    <div className="card-body">
                      <div className="form-group">
                        <label>Subcategory Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="subcategory_name"
                          value={subcategory_name || ""}
                          name="subcategory_name"
                          onChange={onInputChange}
                        />
                         <label style={{
                        color: "red",
                        marginLeft: "2%",
                        display: "flex"
                      }}>
                        {nameError}
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
                      <Link to={'/subcategories'} className="btn btn-info"> Back </Link>
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

export default AddEditSubcategories;