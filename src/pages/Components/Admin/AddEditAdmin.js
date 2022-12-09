import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { createAdminStart, updateAdminStart } from "../../../Redux/Actions/AdminActions";

const initialState = {
  name: '',
  email: '',
  password: '',
  confirm_password: '',
  mobile: '',
  gender: '',
  address: '',
  image: '',
}

const AddEditAdmin = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [editMode, setEditMode] = useState(false);
  const history = useHistory();
  const [genderCheck, setGenderCheck] = useState("Male");
  const [nameError, setNameError] = useState();
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [confirmPasswordError, setConfirmPasswordError] = useState();
  const [mobileError, setMobileError] = useState();
  const [genderError, setGenderError] = useState();
  const [addressError, setAddressError] = useState();
  const [imageError, setImageError] = useState();
  var { name, email, password, confirm_password, mobile, gender, address, image } = formValue;
  const dispatch = useDispatch();
  var { id } = useParams();

  const admin = useSelector((state) => state?.admin?.admin?.rows)
 
  useEffect(() => {
    if (id) {
      setEditMode(true);
      const singleAdmin = admin ? admin.find((item) => item.id === Number(id)) : null;
      setFormValue({ ...singleAdmin });
    } else {
      setEditMode(false);
      setFormValue({ ...formValue });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === '') {
      setNameError('Name Required!')
    }
    if (email === '') {
      setEmailError('Email is required.');
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setEmailError('Invalid email address!')
    }
    if (password === '') {
      setPasswordError('Password Required!');
    } else if (password.length < 6) {
      setPasswordError('Atleast 6 character Required!')
    }
    if (confirm_password === '') {
      setConfirmPasswordError('Confirm Password Required!')
    } else if (password !== confirm_password) {
      setConfirmPasswordError('Password and Confirm Password does not match!')
    }
    if (mobile === '') {
      setMobileError('Mobile Required!')
    } else if (mobile.length != 10) {
      setMobileError('Enter valid Mobile No!')
    }
    if (gender === '') {
      setGenderError('Gender Required!')
    }
    if (address === '') {
      setAddressError('Address Required!')
    }
    if (image === '') {
      setImageError('Image Required!')
    } else {

      if (!editMode) {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("confirm_password", confirm_password);
        formData.append("mobile", mobile);
        formData.append("gender", gender);
        formData.append("address", address);
        formData.append("image", image);
        dispatch(createAdminStart(formData));
        history.push('/admins')
      }
      else {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("confirm_password", confirm_password);
        formData.append("mobile", mobile);
        formData.append("gender", gender);
        formData.append("address", address);
        formData.append("image", image);
        dispatch(updateAdminStart(formData));
        setEditMode(false);
        history.push('/admins')
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

  const handleGenderChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    setGenderCheck(e.target.value)
  }

  return (
    <>
      <div className="main-content">
        <section className="section">
          <div className="section-header">
            <h4>Admin</h4>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="section-body">
              <div className="row">
                <div className="col-18 col-md-6 col-lg-6">
                  <div className="card">
                    <div className="card-header">
                      <center><strong>{!editMode ? "Add Admin" : "Update Admin"}</strong></center>
                    </div>
                    <div className="card-body">
                      <div className="form-group">
                        <label>Admin Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          value={name || ""}
                          name="name"
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
                        <label>Email</label>
                        <input
                          type="text"
                          className="form-control"
                          id="email"
                          value={email || ""}
                          name="email"
                          onChange={onInputChange} />
                      <label style={{
                        color: "red",
                        marginLeft: "2%",
                        display: "flex"
                      }}>
                        {emailError}
                      </label>
                      </div>
                      <div className="form-group">
                        <label>Password Strength</label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <div className="input-group-text">
                              <i className="fas fa-lock"></i>
                            </div>
                          </div>
                          <input
                            type="password"
                            className="form-control pwstrength"
                            data-indicator="pwindicator"
                            id="password"
                            value={password || ""}
                            name="password"
                            onChange={onInputChange}
                          />
                        <label style={{
                          color: "red",
                          marginLeft: "2%",
                          display: "flex"
                        }}>
                          {passwordError}
                        </label>
                        </div>
                        <div id="pwindicator" className="pwindicator">
                          <div className="bar"></div>
                          <div className="label"></div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Confirm Password</label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <div className="input-group-text">
                              <i className="fas fa-lock"></i>
                            </div>
                          </div>
                          <input
                            type="password"
                            className="form-control pwstrength"
                            data-indicator="pwindicator"
                            id="confirm_password"
                            value={confirm_password || ""}
                            name="confirm_password"
                            onChange={onInputChange}
                          />
                        <label style={{
                          color: "red",
                          marginLeft: "2%",
                          display: "flex"
                        }}>
                          {confirmPasswordError}
                        </label>
                        </div>
                        <div id="pwindicator" className="pwindicator">
                          <div className="bar"></div>
                          <div className="label"></div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Phone Number (US Format)</label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <div className="input-group-text">
                              <i className="fas fa-phone"></i>
                            </div>
                          </div>
                          <input
                            type="text"
                            className="form-control phone-number"
                            id="mobile"
                            value={mobile || ""}
                            name="mobile"
                            onChange={onInputChange}
                          />
                        </div>
                      <label style={{
                        color: "red",
                        marginLeft: "2%",
                        display: "flex"
                      }}>
                        {mobileError}
                      </label>  
                      </div>
                      <div className="form-group">
                        <label>Gender</label>
                        <div onChange={handleGenderChange}>
                          <input type="radio" value="Male" name="gender" checked={genderCheck === "Male"}/> Male {" "}
                          <input type="radio" value="Female" name="gender" checked={genderCheck === "Female"}/> Female {" "}
                          <input type="radio" value="Other" name="gender" checked={genderCheck === "Other"} /> Other {" "}
                    </div>
                        {/* <input
                          type="text"
                          className="form-control"
                          id="gender"
                          value={gender || ""}
                          name="gender"
                          onChange={onInputChange} /> */}
                      <label style={{
                        color: "red",
                        marginLeft: "2%",
                        display: "flex"
                      }}>
                        {genderError}
                      </label>
                      </div>
                      <div className="form-group">
                        <label>Address</label>
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          value={address || ""}
                          name="address"
                          onChange={onInputChange} />
                      <label style={{
                        color: "red",
                        marginLeft: "2%",
                        display: "flex"
                      }}>
                        {addressError}
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
                      <Link to={'/admins'} className="btn btn-info"> Back </Link>
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

export default AddEditAdmin;