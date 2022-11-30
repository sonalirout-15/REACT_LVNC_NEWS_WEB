import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Header } from "../../../components/admin";
import SideBar from "../../../components/admin/sidebar";
import { getSingleCategoryStart } from "../../../Redux/Actions/CategoryAction";

const ViewCategories = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const singleData = useSelector((state) => state?.categoryData?.categoryData[0])

  useEffect(() => {
    dispatch(getSingleCategoryStart(id))
  }, [])

  return (
    <>
      <Header />
      <SideBar />
      <div class="main-content">
        <section class="section">
          <div class="section-header">
            <h1>Category</h1>
          </div>
          <div class="section-body">
            <div class="row">
              <div class="col-10 col-md-4 col-lg-4">
                <div class="card">
                  <div class="card-header">
                    <h4>Single Category</h4>
                    <Link style={{ marginLeft: '70%' }} to={'/categories'} className="btn btn-primary">Back</Link>
                  </div>
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table table-bordered table-md">
                        <tr>
                          <td><div><label htmlFor="id" style={{ fontWeight: 'bold' }}>Category Id : </label></div></td>
                          <td><div><label>{singleData?.id}</label></div></td>
                        </tr>
                        <tr>
                          <td><div><label htmlFor="name" style={{ fontWeight: 'bold' }}>Name : </label></div></td>
                          <td><div><label>{singleData?.category_name}</label></div></td>
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

export default ViewCategories;