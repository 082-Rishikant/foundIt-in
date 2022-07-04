import React from 'react'

export default function About() {
  return (
    <div>
      <section className="container my-lg-2 pt-5 pb-lg-7">
        <div className="row align-items-center">
          <div className="col-lg-5 py-3 py-lg-0">
            <h1>Help others by just uploading a picture</h1>
            <h2 className="h3">Do you lost or found something</h2>
            <div className="py-4">
              <p className="callout text-muted fs-5">Here we are to help students of Nit Trichy.
                If anyone lost or find something and if you are thinking that it is important to you or anyone then you can upload all information about that on this platform so that the right person can get it back.</p>
            </div>
            {/* <Link className="btn-video btn-video-primary btn-video-sm me-3" to="https://www.youtube.com/watch?v=hTu0a4o97dU" lg-uid="lg0"></Link>
            <span className="fs-sm text-muted">Get to know us better</span> */}
          </div>
          <div className="col-xl-6 col-lg-7 offset-xl-1 position-relative">
            <div className="py-5" style={{ minHeight: "543px" }}>
              {/* <div className="d-none d-lg-block position-absolute bg-no-repeat bg-position-center h-100" style={{ top: "0", left: "-45px", width: "646px", backgroundImage: "url(img/pages/about/bg-shape.svg)" }}></div> */}
              <div className="row g-0 mx-n2 pt-lg-4">
                <div className="col-sm-4 px-2 mb-3">
                  <div className="card h-100 card-body py-5 justify-content-center border-0 shadow-lg text-center myrounded text-primary" to="/">
                    <h3 className="h5 mb-0 fs-4">Found or Lost</h3>
                  </div>
                </div>

                <div className="col-sm-4 px-2 mb-3">
                  <div className="card card-body py-5 border-0 shadow-lg text-center mb-3 myrounded text-primary" to="/">
                    <i className="ai-pie-chart text-danger h1 mb-3"></i>
                    <h3 className="h5 mb-0 fs-4">take</h3>
                  </div>
                  <div className="card card-body py-5 border-0 shadow-lg text-center myrounded text-primary" to="/"><i className="ai-refresh-ccw text-info h1 mb-3"></i>
                    <h3 className="h5 mb-0 fs-4">picture</h3>
                  </div>
                </div>

                <div className="col-sm-4 px-2 mb-3">
                  <div className="card card-body py-5 border-0 shadow-lg text-center mb-3 myrounded text-primary" to="/"><i className="ai-folder-plus text-success h1 mb-3"></i>
                    <h3 className="h5 mb-0 fs-4">a</h3>
                  </div>
                  <div className="card card-body py-5 border-0 shadow-lg text-center myrounded text-primary" to="/"><i className="ai-share text-warning h1 mb-3"></i>
                    <h3 className="h5 mb-0 fs-4">Upload it</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
