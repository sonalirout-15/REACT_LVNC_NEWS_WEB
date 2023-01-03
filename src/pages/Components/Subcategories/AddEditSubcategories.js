import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { loadCategoryStart } from "../../../Redux/Actions/CategoryAction";
import { createSubcategoryStart, updateSubcategoryStart } from "../../../Redux/Actions/SubcategoryActions";

const initialState = {
  category_ref_id: '',
  subcategory_name: '',
}
const AddEditSubcategories = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [editMode, setEditMode] = useState(false);
  const history = useHistory();
  const [nameError, setNameError] = useState();
  var { category_ref_id, subcategory_name } = formValue;
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
    if (subcategory_name === '') {
      setNameError('Category Required!')
    }
    else if(subcategory_name.length < 4) {
      setNameError('Category name needs to atleast 4 characters!')
    }
    else if(subcategory_name.length > 25) {
      setNameError('Category name needs only 25 characters!')
    }
    else {
      if (!editMode) {
        dispatch(createSubcategoryStart(formValue));
        history.push('/categories');

      } else {
        dispatch(updateSubcategoryStart(formValue))
        setEditMode(false);
        history.push('/categories')
      }
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    console.log("form ...", formValue);
  };


  return(
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
  )
}

export default AddEditSubcategories;