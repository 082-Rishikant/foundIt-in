import React, { useContext, useEffect, useState } from 'react'
import Itemcontext from '../context APIs/items/Itemcontext';
import Items from './Items';
import AddItem from './AddItem';

export default function Homepage(props) {
  const context = useContext(Itemcontext);
  const { fetchAllItems, items, getUser } = context;
  const [fis, setFilterItemStatus] = useState("All");
  const [losti, setLosti] = useState(0);
  const [foundi, setFoundi] = useState(0);

  useEffect(() => {
    if (localStorage.getItem('foundit_auth_token')) {
      getUser();
      fetchAllItems().then((d) => { 
        if (!(d.success)) props.showAlert(d.message, "danger");  
        else{
          let li = 0, fi = 0;
          for (let i = 0; i < d.items_list.length; i++) {
            if (d.items_list[i].status==="Lost") li = li + 1;
            else  fi=fi+1;
          } setLosti(li); setFoundi(fi);
        }
      })
    }
    else props.showAlert("!! You have not loggedin", "danger");
    
    // eslint-disable-next-line
  }, []);

  const setGender = (event) => {
    setFilterItemStatus(event.target.value);
  }

  return (
    <>
      {/* 1. staring image */}
      <div className="position-relative overflow-hidden text-center px-3 py-5">
        <div className="col-md-7 p-lg-3 mx-auto mb-4">
          <h1 className="display-4 fw-normal">Have you lost Something</h1>
          <p className="lead fw-normal">This is the platefom where you may find your lost thing, If someone else got that and has already uploded that thing here.</p>
          <p className="lead fw-normal">And If you got something that is unknown to you can upload it here so that someone else who lost it, can get back.</p>
        </div>
        <div className="product-device shadow-sm d-none d-md-block"></div>
        <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
      </div>

      {/* 2. Counting details */}
      <section className="py-5">
        <div className="container">
          <div className="row g-3">

            {/* Counter item */}
            <div className="col-sm-6 col-xl-4 bg-light px-2">
              <div className="d-flex justify-content-center align-items-center p-4 bg-white bg-opacity-10 rounded-3 shadow-lg">
              <span className="display-6 lh-1 text-primary mb-0"><i className="bi bi-patch-check-fill"></i></span>
                <div className="ms-4 h6 fw-normal mb-0">
                  <div className="d-flex">
                    <h5 className="purecounter mb-0 fw-bold me-2" data-purecounter-start="0" data-purecounter-end="10" data-purecounter-delay="200" data-purecounter-duration="0">{(localStorage.getItem('foundit_auth_token'))?items.length:0}</h5>
                    <span className="mb-0 h5">Items</span>
                  </div>
                  <p className="mb-0">you have uploaded total items</p>
                </div>
              </div>
            </div>

            {/*Counter item -->*/}
            <div className="col-sm-6 col-xl-4 p-0 bg-light px-2">
              <div className="d-flex justify-content-center align-items-center p-4 bg-white bg-opacity-10 rounded-3 shadow-lg">
                <span className="display-6 lh-1 text-primary mb-0"><i className="bi bi-patch-check-fill"></i></span>
                <div className="ms-4 h6 fw-normal mb-0">
                  <div className="d-flex">
                    <h5 className="purecounter mb-0 me-2 fw-bold" data-purecounter-start="0" data-purecounter-end="6" data-purecounter-delay="300" data-purecounter-duration="0">{losti} </h5>
                    <span className="mb-0 h5">Lost items</span>
                  </div>
                  <p className="mb-0">Your lost items</p>
                </div>
              </div>
            </div>

            {/* Counter item */}
            <div className="col-sm-6 col-xl-4 bg-light px-2">
              <div className="d-flex justify-content-center align-items-center p-4 bg-white bg-opacity-10 rounded-3 shadow-lg">
                <span className="display-6 lh-1 text-primary mb-0"><i className="bi bi-patch-check-fill"></i></span>
                <div className="ms-4 h6 fw-normal mb-0">
                  <div className="d-flex">
                    <h5 className="purecounter mb-0 me-2 fw-bold" data-purecounter-start="0" data-purecounter-end="6" data-purecounter-delay="300" data-purecounter-duration="0">{foundi}</h5>
                    <span className="mb-0 h5">Found items</span>
                  </div>
                  <p className="mb-0">Your found items</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. User's Uploaded Items */}
      <div className='pt-5 pb-4'>

        {/*<!-- Title and Description -->*/}
        <div className="b-3 px-3 my-5">
          <div className="col-lg-8 mx-auto text-center">
            <h2 className="fs-1">Items Uploaded by you</h2>
          </div>
        </div>

        {/*<!-- Filters -->*/}
        <ul onChange={setGender} className="nav nav-pills nav-pills-bg-soft justify-content-center mb-4 px-3" id="course-pills-tab" role="tablist">
          {/*<!-- Filter-1 -->*/}
          <li className="nav-item me-2 me-sm-5">
            <input type="radio" className="btn-check" name="options" id="option1" autoComplete="off" value="Lost"/>
            <label className="btn nav-link mb-2 px-2 py-0 mb-md-0" htmlFor="option1" id="course-pills-tab-1" data-bs-toggle="pill" data-bs-target="#course-pills-tabs-1">LOST</label>
          </li>
          <li className="nav-item me-2 me-sm-5">
            <input type="radio" className="btn-check" name="options" id="option2" autoComplete="off" value="Found" />
            <label className="btn nav-link mb-2 px-2 py-0 mb-md-0" htmlFor="option2" id="course-pills-tab-2" data-bs-toggle="pill" data-bs-target="#course-pills-tabs-2">FOUND</label>
          </li>
          <li className="nav-item me-2 me-sm-5">
            <input type="radio" className="btn-check" name="options" id="option3" autoComplete="off" value="All" defaultChecked/>
            <label className="btn nav-link mb-2 px-2 py-0 mb-md-0" htmlFor="option3" id="course-pills-tab-3" data-bs-toggle="pill" data-bs-target="#course-pills-tabs-3">ALL</label>
          </li>
        </ul>

        {/* Items of User */}
        <div className='mt-5'>
          {
            items.length === 0 ?
              <h3 className='text-center'>No item!!</h3>
              : <Items items={items} showAlert={props.showAlert} flag={true} fis={fis}/>
          }
        </div>

      </div>

      {/* 4.  Add Item Button */}
      <AddItem showAlert={props.showAlert}/>

    </>
  )
}






