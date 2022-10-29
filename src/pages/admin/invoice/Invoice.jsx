import React from "react";
import { useState } from "react";
// import './invoice.css';    // Conditionally imported inside the component
// import "./contracts.css";  // Conditionally imported inside the component
import { BiUserPlus } from "react-icons/bi";
import { FaEdit , FaPlus} from "react-icons/fa";

function Invoice() {

  const [duedate, setDueDate] = useState(false);
  const [additem, setAddItem] = useState(false);
  const [editadmin, setEditAdmin] = useState(false);
  const [admindetails, setAdminDetails] = useState({
    contractNo: "A000001",
    address: "XYZ street LA",
    email: "finlo@gmail.com",
  });
  
  const [initialitems, setInitialItems] = useState([
    {
      item: "",
      qunatity: "",
      rate: "",
      total: "",
    },
  ]);
  
  const handleChange = (e) => {
    setInitialItems((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

//   import("./contracts.css");
  import("./invoice.css");
  return (
    <div className="ContainerWrapper">
      <div className="row">
        <div className="table1">
          <form action="" className="form1">
            <div className="fields">
              <div>
                <label htmlFor="ContractNo">Contract ID</label>
              </div>
              <input
                type="text"
                placeholder="A000001"
                name="ContractNo"
                value={""}
              />
            </div>
            <div className="fields">
              <div>
                <label htmlFor="ContractDate">Contract Date</label>
              </div>

              <input
                type="date"
                placeholder="=01-01-2022"
                name="ContractDate"
                value={""}
              />
            </div>
            <div className="fields" style={{ cursor: "pointer" }}>
              <span onClick={() => setDueDate(!duedate)}>
                Add Due Date
                <span
                  className="sign-plus"
                >
                  {" "}
                  +{" "}
                </span>
              </span>
            </div>
            {duedate && (
              <div className="fields">
                <div>
                  <label htmlFor="ContractDate">Contract Date</label>
                </div>

                <input
                  type="date"
                  placeholder="=01-01-2022"
                  name="ContractDate"
                  value={""}
                  onChange={{}}
                />
              </div>
            )}
          </form>
        </div>
      </div>
      <div className="row row2">
        <div className="billedby">
          <h5>Billed By (Your Details)</h5>
          <select name="" id="">
            <option value="Vijay">Vijay</option>
            <option value="Sanjay">Sanjay</option>
          </select>
          <div className="admin_details">
            <div className="edit_button_div">
              <h5>Finlo Details</h5>
              <div
                onClick={() => setEditAdmin(!editadmin)}
                style={{ cursor: "pointer" }}
              >
                <h5>
                  <FaEdit />
                  Edit
                </h5>
              </div>
            </div>
            <form action="">
              <div className="fields">
                <div>
                  <label htmlFor="Contract No">Contract No</label>
                </div>
                {editadmin ? (
                  <input
                    type="text"
                    placeholder="A000001"
                    value={""}
                    name="Contract No"
                    onChange={{}}
                  />
                ) : (
                  <div>{admindetails.contractNo}</div>
                )}
              </div>
              <div className="fields">
                <div>
                  <label htmlFor="Address">Address</label>
                </div>
                {editadmin ? (
                  <input
                    type="text"
                    placeholder="XYZ street LA"
                    value={""}
                    name="Address"
                  />
                ) : (
                  <div>{admindetails.address}</div>
                )}
              </div>
              <div className="fields">
                <div>
                  <label htmlFor="Email">Email</label>
                </div>
                {editadmin ? (
                  <input
                    type="email"
                    placeholder="finlo@gmail.com"
                    value={""}
                    name="Email"
                  />
                ) : (
                  <div>{admindetails.email}</div>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="billedto">
          <h5>Billed To (Client Details)</h5>
          <select name="" id="">
            <option value="">Select a client</option>
            <option value="Vijay">Ram</option>
            <option value="Sanjay">Shyam</option>
          </select>
          <div className="client_details">
            {/* <div className="image">
               
            </div> */}
            <div style={{ borderRadius: "70px", backgroundColor: "#1c76bd" }}>
              <BiUserPlus size={40} color={"white"} enableBackground={true} />
            </div>
            <div>Select a client / Business from the list</div>
            <div>or</div>
            <button className="AddClient"><FaPlus style={{paddingTop:"3px",paddingRight:"2px"}}/>Add Client</button>
          </div>
        </div>
      </div>
      <div className="row">
        <button className="addItem" onClick={() => setAddItem(!additem)}>
          + Add Items
        </button>
      </div>
      <div className="row row4">
        <div className="combined_row">
          <div className="items_table">
            <div className="items_table_header">
              <span>Items</span>
              <span></span>
              <span>Quantity</span>
              <span>Rate</span>
              <span>Amount</span>
            </div>
            {/* <div className="items_table_body">
            {initialitems.map((item) => {
              <span>{item.item}</span>;
              <span>{item.qunatity}</span>;
              <span>{item.rate}</span>;
              <span>{item.total}</span>;
            })}
          </div> */}
            <div className="items_table_body">
              <span>Tax Filing Service FY 20-21</span>
              <span>1</span>
              <span>$500</span>
              <span>$500</span>
              {/* {initialitems.map((item) => {
              <span>{item.item}</span>;
              <span>{item.qunatity}</span>;
              <span>{item.rate}</span>;
              <span>{item.total}</span>;
            })} */}
            </div>
            <hr></hr>
            {additem && (
              <>
                <div className="items_table_body">
                  <span>
                    <input
                      type="text"
                      placeholder="name"
                      name="item"
                      onChange={handleChange}
                      value={initialitems.item}
                    />
                  </span>
                  <span>
                    <input
                      type="number"
                      placeholder="Quantity"
                      name="quantity"
                      onChange={handleChange}
                      value={initialitems.qunatity}
                    />
                  </span>
                  <span>
                    <input
                      type="number"
                      placeholder="Rate"
                      name="rate"
                      onChange={handleChange}
                      value={initialitems.rate}
                    />
                  </span>
                  <span>
                    <input
                      type="number"
                      placeholder="Amount"
                      name="total"
                      onChange={handleChange}
                      value={initialitems.total}
                    />
                  </span>
                </div>
                <button onClick={() => setAddItem(!additem)}>Save</button>
                <hr />
              </>
            )}
          </div>
          <div className="bottom_table">
            <div className="btable_entry">
              <span>Subtotal</span> <span>USD 1000</span>
            </div>
            <div className="hr"></div>
            <div className="btable_entry">
              <span>Discount</span> <span>10 %</span>
            </div>
            <div className="hr"></div>
            <div className="btable_entry">
              <span>Total</span> <span>USD 900</span>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="row row5">
        <div className="bottom_table">
          <div className="btable_entry">
            <span>Subtotal</span> <span>USD 1000</span>
          </div>
          <div className="hr"></div>
          <div className="btable_entry">
            <span>Discount</span> <span>10 %</span>
          </div>
          <div className="hr"></div>
          <div className="btable_entry">
            <span>Total</span> <span>USD 900</span>
          </div>
        </div>
      </div> */}
      <div className="row">
        <div className="resultrow">
          <h4>Invoices Created</h4>
          <div className="contracts_list_table">
            <div className="contracts_header">
              <span>Contract ID</span>
              <span className="br"></span>
              <span>Service/Description</span>
              <span className="br"></span>
              <span>Amount</span>
              <span className="br"></span>
              <span>Action</span>
            </div>
            <div className="contracts_details">
              <span>A0000001</span>
              <span>Some Message</span>
              <span>$450</span>
              <span>Edit / Delete</span>
            </div>
          </div>
        </div>
      </div>
      <div className="row row6">
        <button className="backbutton">Back</button>
      </div>
    </div>
  );
}

export default Invoice;