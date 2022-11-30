import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Header } from "../../../components/admin";
import SideBar from "../../../components/admin/sidebar";
import { getSingleMettersStart } from "../../../Redux/Actions/MattersActions";

const ViewMatters = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const singleData = useSelector((state) => state?.metters?.metterData);
  useEffect(() => {
    dispatch(getSingleMettersStart(id))
  }, [])

  return (
    <>
      <Header />
      <SideBar />
      <div class="main-content">
        <section class="section">
          <div class="section-header">
            <h1>Metters</h1>
          </div>
          <div class="section-body">
            <div class="row">
              <div class="col-12 col-md-6 col-lg-6">
                <div class="card">
                  <div class="card-header">
                    <h4>Single Metters</h4>
                    <Link style={{ marginLeft: '70%' }} to={'/metters'} className="btn btn-primary">Back</Link>
                  </div>
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table table-bordered table-md">
                        <tr>
                          <td><div><label htmlFor="id" style={{ fontWeight: 'bold' }}>Metters Id : </label></div></td>
                          <td><div><label>{singleData?.id}</label></div></td>
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

export default ViewMatters;