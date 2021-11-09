import React from "react";
import { Link } from "react-router-dom";

function AdminHeader() {
  return (
    <>
      <div
        style={{
          width: "100%",
          backgroundColor: "#FEF3F5",
        }}
      >
        <div
          style={{
            height: "160px",
          }}
          className=" container d-flex flex-column justify-content-between "
        >
          <h3 className="fw-bold mt-5">MY ACCOUNT</h3>
          <div className=" ">
            <button
              className="btn me-3"
              style={{
                width: "160PX",
                height: "45px",
                backgroundColor: "#FFD6DC",
              }}
            >
              <span className="fw-bold">
                <Link
                  className="nav-link "
                  to="/admin_profile"
                  style={{ color: "inherit" }}
                >
                  MY PROFILE
                </Link>
              </span>
            </button>
            <button
              className="btn me-3"
              style={{
                width: "160PX",
                height: "45px",
                backgroundColor: "#FFD6DC",
              }}
            >
              <span className="fw-bold">
                <Link
                  className="nav-link "
                  to="/transaction"
                  style={{ color: "inherit" }}
                >
                  DASHBOARD
                </Link>
              </span>
            </button>
            <button
              className="btn me-3"
              style={{
                width: "160PX",
                height: "45px",
                backgroundColor: "#FFD6DC",
              }}
            >
              <span className="fw-bold">
                <Link className="nav-link " to="/product_summary" style={{ color: "inherit" }}>
                  PRODUCTS
                </Link>
              </span>
            </button>
            <button
              className="btn me-3"
              style={{
                width: "160PX",
                height: "45px",
                backgroundColor: "#FFD6DC",
              }}
            >
              <span className="fw-bold">
                <Link
                  className="nav-link "
                  to="/admin_order"
                  style={{ color: "inherit" }}
                >
                  SHIPPING
                </Link>
              </span>
            </button>
            <button
              className="btn me-3"
              style={{
                width: "160PX",
                height: "45px",
                backgroundColor: "#FFD6DC",
              }}
            >
              <span className="fw-bold">
                <Link
                  className="nav-link"
                  to="/admin_inbox"
                  style={{ color: "inherit" }}
                >
                  INBOX
                </Link>
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHeader;
