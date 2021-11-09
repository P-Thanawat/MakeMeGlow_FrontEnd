import React from "react";
import { Link } from "react-router-dom";

function AccountHeader() {
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
                  className="nav-link"
                  to="/myProFile"
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
                <Link className="nav-link" to="/myProfileOrder" style={{ color: "inherit" }}>
                  MY ORDERS
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
                  to="/myAddress"
                  style={{ color: "inherit" }}
                >
                  MY ADDRESS
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
                  to="/user_payment"
                  style={{ color: "inherit" }}
                >
                  PAYMENT
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
                  to="/favorite"
                  style={{ color: "inherit" }}
                >
                  FAVORITE
                </Link>
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountHeader;
