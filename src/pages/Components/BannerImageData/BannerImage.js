import React, { useEffect, useState } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { loadBannerImageStart } from "../../../Redux/Actions/BannerImageAction";
const { SearchBar } = Search;

// const NewsCard = (props) => {
// 	return (
// 		<div style={{ padding: '20' }}>
// 			<a href={props.name}>
// 				{props.imageName} by {props.image}
// 			</a>
// 		</div>
// 	);
// };

const BannerImage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    
    const [isLoaded, setisLoaded] = useState(false);
    const [query, setQuery] = useState('startups'); 

    useEffect(() => {
      dispatch(loadBannerImageStart())
    }, [])

      const bannerData = useSelector((state) => state?.banner?.bannerImageData?.BannerData)
      console.log('BANNER-DATA~~~~~~~~~~~>', bannerData)
      const [data, setData] = useState(bannerData)

   useEffect(() => {
    setData(bannerData)
   },[bannerData])

   const URL = `http://localhost:8080/api/banner/getall?query=${query}`;

   const handleFetch = () => {
		fetch(URL)
			.then(response => response.json())
			.then(body => {
				setData([...body.data]);
			})
			.catch(error => console.error('Error', error));
	};


  //  const columns = [
  //   {
  //     text: 'No', formatter: (cell, row, rowIndex, formateExtraData) => {
  //       return rowIndex + 1;
  //     }, sort: true
  //   },
  //   { dataField: 'imageName', text: 'Title', sort: true },
  //   {
  //     dataField: 'image', text: 'Image', formatter: (cell, row) => {
  //       return (
  //         <img src={row.image} style={{ height: "50px" }} />
  //       )
  //     }
  //   },
  //   { dataField: 'status', text: 'Status', sort: true },
  //   {
  //     text: 'Action', formatter: (cell, row) => {
  //       return (
  //         <>
  //           <a
  //             className="btn btn-primary btn-action mr-1"
  //             data-toggle="tooltip"
  //             title="Edit"
  //             onClick={() => history.push(`/editBanner/${row.id}`)}
  //            >
  //             <i className="far fa-edit"></i>
  //          </a>{" "}
  //          <a
  //             className="btn btn-danger btn-action"
  //             data-toggle="tooltip"
  //             title="Delete"
  //             onClick={() => handleDelete(row.id)}
  //             >
  //             <i className="fas fa-trash"></i>
  //           </a>{" "}
  //           <a
  //             className="btn btn-info btn-action"
  //             data-toggle="tooltip"
  //             title="Delete"
  //             onClick={() => history.push(`viewBanner/${row.id}`)}
  //             >
  //               <i className="fas fa-eye"></i>
  //           </a>
  //         </>
  //       )
  //     }
  //   },
  // ]

  const handleDelete = (id) => {
    if (window.confirm("Are you sure that you wanted to delete that campaning?")) {
      dispatch((id))
    }
  }

  // const pagination = paginationFactory({
  //   page: 1,
  //   sizePerPage: 4,
  //   lastPageText: '>>',
  //   firstPageText: '>',
  //   prePageText: '<',
  //   showTotal: true,
  //   alwaysShowAllBtns: true,
  //   onPageChange: function (page, sizePerPage) {
  //     console.log('page', page);
  //     console.log('sizePerPage', sizePerPage)
  //     console.log()
  //   },
  //   onSizePerPageChange: function (page, sizePerPage) {
  //     console.log('page', page);
  //     console.log('sizePerPage', sizePerPage)
  //   }
  // })

    return (
        <div className="main-content">
        <section className="section">
          <div className="section-header">
            <h1>Banner</h1>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-12 col-sm-25">
              <div className="card">
                <div className="card-header">
                  <h4>Banner Image Details</h4>
                  <div className="card-header-action">
                    <Link to={'/addBanner'} className="btn btn-primary">+ New </Link>
                  </div>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    //   <div>
    //      <label>Search</label>
    //     <input type="text" onChange={(event) => setQuery(event.target.value)} />
    //     <button onClick={handleFetch}>Get Data</button>

		// 	{isLoaded ? (
		// 		data.map((item) => {
		// 			return (
		// 				<table
		// 					name={item.name}
		// 					imageName={item.imageName}
		// 					image={item.image}
		// 					key={item.id}
		// 				/>
		// 			);
		// 		})
		// 	) : (
		// 		<div></div>
		// 	)}    
    // </div>
    )
}


export default BannerImage;