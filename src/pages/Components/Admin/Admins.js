import React, { useEffect, useState } from "react";
import { Link, useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Footer, Header } from "../../../components/admin";
import SideBar from "../../../components/admin/sidebar";
import { loadAdminStart, deleteAdminStart } from "../../../Redux/Actions/AdminActions";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

const { SearchBar } = Search;

const Admins = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(loadAdminStart())
  }, [])
  const tableData = useSelector((state) => state?.admin?.admin?.rows)
  const [data, setData] = useState(tableData);

  useEffect(() => {
    setData(tableData)
  }, [tableData])

  const columns = [
    {
      text: 'No', formatter: (cell, row, rowIndex, formateExtraData) => {
        return rowIndex + 1;
      }, sort: true
    },
    { dataField: 'name', text: 'Name', sort: true },
    { dataField: 'email', text: 'Email', sort: true },
    { dataField: 'mobile', text: 'Mobile', sort: true },
    { dataField: 'gender', text: 'Gender', sort: true },
    { dataField: 'address', text: 'Address', sort: true },
    {
      dataField: 'image', text: 'Image', formatter: (cell, row) => {
        return (
          <img src={row.image} style={{ height: "50px" }} />
        )
      }
    },
    { dataField: 'status', text: 'Status', sort: true },
    {
      text: 'Action', formatter: (cell, row) => {
        return (
          <>
           <a
              className="btn btn-primary btn-action mr-1"
              data-toggle="tooltip"
              title="Edit"
              onClick={() => history.push(`/editAdmin/${row.id}`)}
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
              onClick={() => history.push(`viewAdmin/${row.id}`)}
              >
                <i className="fas fa-eye"></i>
            </a>
          </>
        )
      }
    },
  ]
  const handleDelete = (id) => {
    if (window.confirm("Are you sure that you wanted to delete that admin?")) {
      dispatch(deleteAdminStart(id))
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
            <h1>Admins</h1>
          </div>
          <div className="row">
          <div className="col-lg-20 col-md-20 col-20 col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h4>Admin Details</h4>
                  <div className="card-header-action">
                    <Link to={'/addAdmin'} className="btn btn-primary"> + New </Link>
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
                            <h4 style={{ marginLeft: '10px' }}></h4>
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


export default Admins;