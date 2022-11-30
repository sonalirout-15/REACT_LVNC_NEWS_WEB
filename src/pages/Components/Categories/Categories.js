import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Footer, Header } from "../../../components/admin";
import SideBar from "../../../components/admin/sidebar";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { deleteCategoryStart, loadCategoryStart } from "../../../Redux/Actions/CategoryAction";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

const { SearchBar } = Search;

const Categories = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(loadCategoryStart())
  }, [])
  const categoriesData = useSelector((state) => state?.categoryData?.categories?.categoryData?.rows)
  
  const [data, setData] = useState(categoriesData)
  useEffect(() => {
    setData(categoriesData)
  }, [categoriesData])

  const columns = [
    {
      text: 'No', formatter: (cell, row, rowIndex, formateExtraData) => {
        return rowIndex + 1;
      },
      sort: true
    },
    { dataField: 'category_name', text: 'Category Name', sort: true },
    { dataField: 'status', text: 'Status', sort: true },
    {
      text: 'Action', formatter: (cell, row) => {
        return (
          <>
             <a
              className="btn btn-primary btn-action mr-1"
              data-toggle="tooltip"
              title="Edit"
              onClick={() => history.push(`/editCategory/${row.id}`)}
             >
              <i className="far fa-edit"></i>
           </a>{" "}
           <a
              className="btn btn-danger btn-action"
              data-toggle="tooltip"
              title="Delete"
              onClick={() => handleDelete(row.id)}
              >
              <i className="fas fa-trash"></i>
            </a>{" "}
            <a
              className="btn btn-info btn-action"
              data-toggle="tooltip"
              title="Delete"
              onClick={() => history.push(`viewCategory/${row.id}`)}
              >
                <i className="fas fa-eye"></i>
            </a>
          </>
        )
      }
    },
  ]

  const handleDelete = (id) => {
    if (window.confirm("Are you sure that you wanted to delete that category?")) {
      dispatch(deleteCategoryStart(id))
    }
  }


  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 4,
    lastPageText: '>>',
    firstPageText: '>',
    prePageText: '<',
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage)
      console.log()
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage)
    }
  })

  return (
    <>
      <Header />
      <SideBar />
      <div className="main-content">
        <section className="section">
          <div className="section-header">
            <h1>Categories</h1>
          </div>
          <div className="row">
            <div className="col-lg-10 col-md-12 col-12 col-sm-14">
              <div className="card">
                <div className="card-header">
                  <h4>Categories Details</h4>
                  <div className="card-header-action">
                    <Link to={'/addCategory'} className="btn btn-primary"> + New </Link>
                  </div>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <ToolkitProvider
                      keyField="id"
                      columns={columns}
                      data={data}
                      search
                    >
                      {
                        props => (
                          <>
                            <h3 style={{ marginLeft: '10px' }}></h3>
                            <SearchBar {...props.searchProps} style={{ marginLeft: '10px' }} />
                            <BootstrapTable
                              {...props.baseProps}
                              pagination={pagination}
                            />
                          </>
                        )
                      }

                    </ToolkitProvider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default Categories;