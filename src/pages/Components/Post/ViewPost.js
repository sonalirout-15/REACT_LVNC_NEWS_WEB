import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Header } from "../../../components/admin";
import SideBar from "../../../components/admin/sidebar";
import { getSinglePostStart } from "../../../Redux/Actions/PostActions";

const ViewPost = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const singleData = useSelector((state) => state?.post?.postData?.data?.postData);


  useEffect(() => {
    dispatch(getSinglePostStart(id))
  }, [])

  return (
    <>
      <Header />
      <SideBar />
      {/* <div className="main-content">
        <section className="section">
          <div className="section-header">
            <h1>Single Post Detail</h1>
          </div>
          <div className="card-header-action">
            <Link to={'/post'} className="btn btn-primary">
              Back
            </Link>
          </div>
          <div className="single">
            <div className="singleContainer">
              <div className="top">
                <div className="left">
                  <h2 className="title">Information</h2>
                  <div className="item">
                    <div className="details">
                      <div className="detailItem">
                        <div className="detailItem">
                          <span className="itemKey" style={{ color: "black" }}>ID:</span>
                          <span className="itemValue" style={{ fontWeight: 'bold' }}>{singleData?.id}</span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey" style={{ color: "black" }}>Title:</span>
                          <span className="itemValue" style={{ fontWeight: 'bold' }}>{singleData?.title}</span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey" style={{ color: "black" }}>Description:</span>
                          <span className="itemValue" style={{ fontWeight: 'bold' }}>{singleData?.description}</span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey" style={{ color: "black" }}>Image:</span>
                          <img src={singleData?.image} style={{ height: "82px" }}></img>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey" style={{ color: "black" }}>Audio:</span>
                          <audio controls><source src={singleData?.audio} type='audio/mp3' style={{ height: "20px" }} /></audio>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey" style={{ color: "black" }}>Video:</span>
                          <video src={singleData?.video} type="video/mp4" style={{ height: "40px" }}></video>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey" style={{ color: "black" }}>Status:</span>
                          <span className="itemValue" style={{ fontWeight: 'bold' }}>{singleData?.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div> */}
      <div class="main-content">
        <section class="section">
          <div class="section-header">
            <h1>Post</h1>
          </div>
          <div class="section-body">
            <div class="row">
              <div class="col-12 col-md-6 col-lg-6">
                <div class="card">
                  <div class="card-header">
                    <h4>Single Post</h4>
                    <Link style={{ marginLeft: '70%' }} to={'/post'} className="btn btn-primary">Back</Link>
                  </div>
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table table-bordered table-md">
                        <tr>
                          <td><div><label htmlFor="id" style={{ fontWeight: 'bold' }}>Post Id : </label></div></td>
                          <td><div><label>{singleData?.id}</label></div></td>
                        </tr>
                        <tr>
                          <td><div><label htmlFor="id" style={{ fontWeight: 'bold' }}>Admin Ref Id : </label></div></td>
                          <td><div><label>{singleData?.admin_ref_id}</label></div></td>
                        </tr>
                        <tr>
                          <td><div><label htmlFor="id" style={{ fontWeight: 'bold' }}>Category Ref Id : </label></div></td>
                          <td><div><label>{singleData?.category_ref_id}</label></div></td>
                        </tr>
                        <tr>
                          <td><div><label htmlFor="id" style={{ fontWeight: 'bold' }}>Subcategory Ref Id : </label></div></td>
                          <td><div><label>{singleData?.subcategory_ref_id}</label></div></td>
                        </tr>
                        <tr>
                          <td><div><label htmlFor="name" style={{ fontWeight: 'bold' }}>Title : </label></div></td>
                          <td><div><label>{singleData?.title}</label></div></td>
                        </tr>

                        <tr>
                          <td><div><label htmlFor="email" style={{ fontWeight: 'bold' }}>Description : </label></div></td>
                          <td><div><label>{singleData?.description}</label></div></td>
                        </tr>

                        <tr>
                          <td><div><label htmlFor="image" style={{ fontWeight: 'bold' }}>Image : </label></div></td>
                          <td><div><label><img src={singleData?.image} style={{ height: "60px" }}></img></label></div></td>
                        </tr>

                        <tr>
                          <td><div><label htmlFor="audio" style={{ fontWeight: 'bold' }}>Audio : </label></div></td>
                          <td><div><label><audio controls><source src={singleData?.audio} type='audio/mp3' style={{ height: "30px" }} /></audio></label></div></td>
                        </tr>

                        <tr>
                          <td><div><label htmlFor="vedio" style={{ fontWeight: 'bold' }}>Vedio : </label></div></td>
                          <td><div><label><video src={singleData?.video} type="video/mp4" style={{ height: "50px" }}></video></label></div></td>
                        </tr>


                        <tr>
                          <td><div><label htmlFor="status" style={{ fontWeight: 'bold' }}>Status</label></div></td>
                          <td><div ><label>{singleData?.status}</label></div></td>
                        </tr>

                        {/* <td>
                            <div class="badge badge-success">Active</div>
                          </td> */}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default ViewPost;