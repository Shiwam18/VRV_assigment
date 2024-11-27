import React from "react"

const Footer = (props:any) => {
  return (
    <>
         {/*<!--start overlay--> */}
        <div className="overlay toggle-icon"></div>
        {/* <!--end overlay-->
        <!--Start Back To Top Button-->  */}
        <a href="#" className="back-to-top"><i className='bx bxs-up-arrow-alt'></i></a>
        {/* <!--End Back To Top Button--> */}
        <footer className="page-footer">
            <p className="mb-0">Copyright &copy; {(new Date()).getFullYear()}. All right reserved.</p>
        </footer>
    </>
  )
};

export default Footer;
