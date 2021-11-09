import axios from "../../config/axios";
import React from "react";

function InboxMessage({ message, setOnPage, setRefresh }) {
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  const handleDelete = async () => {
    try {
      await axios.delete(`/contactUs/${message.id}`)
      setOnPage(1)
      setRefresh(cur => !cur)
    }
    catch (err) {
      console.log(err.message)
    }
  }
  return (
    <div>
      <div className="container my-2" style={{ width: "75%" }}>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#ss${message.id}`}
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                <div className="d-flex bd-highlight">
                  <div
                    className="p-2 flex-fill bd-highlight"
                    style={{ minWidth: "25vw " }}
                  >
                    {message.firstName} {message.lastName}
                  </div>
                  <div
                    className="p-2 flex-fill bd-highlight"
                    style={{ minWidth: "25vw" }}
                  >
                    {message.email}
                  </div>
                  <span className="p-2 flex-fill bd-highlight">
                    {`${new Date(message.updatedAt).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}   ${new Date(message.updatedAt).toTimeString().split(' ')[0]}`}
                  </span>
                </div>
              </button>
            </h2>
            <div
              id={`ss${message.id}`}
              className="accordion-collapse collapse"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body my-2 mx-2">
                <div>
                  {message.message}
                  <button onClick={handleDelete} className="btn btn-outline-danger btn-sm float-end pt-1">
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InboxMessage;
