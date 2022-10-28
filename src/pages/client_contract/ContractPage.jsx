import React from "react";
import { useState } from "react";
import "./contractpage.css";
function ContractPage() {
  const [checkbox, setCheckBox] = useState(false);
  return (
    <div>
      <div className="title">
        <h1>Contract Proposal / Engagement</h1>
      </div>
      <div className="contractWrapper">
        <div>
          <div className="tables_flex">
            <div className="maintable">
              {/* <div className="main_table_header">
                <span>Description/Contract Proposal</span>
                <span>Action</span>
                <span>Comments</span>
              </div> */}
              <div class="grid-container">
                <div class="item1 h" style={{ backgroundColor: "#bde0fe" }}>
                  Description/Contract Proposal
                </div>
                <div class="item2 h" style={{ backgroundColor: "#bde0fe" }}>
                  Action
                </div>
                <div class="item3 h" style={{ backgroundColor: "#bde0fe" }}>
                  Comments
                </div>
                <div class="item4"></div>
                <div class="item5">
                  <select name="">
                    <option value="Approve">Approve</option>
                    <option value="Decline">Decline</option>
                  </select>
                </div>
                <div class="item6">
                  <input type="text" placeholder="Type here" />
                </div>
                <div class="item7"></div>
                <div class="item8">
                  <select name="">
                    <option value="Approve">Approve</option>
                    <option value="Decline">Decline</option>
                  </select>
                </div>
                <div class="item9">
                  <input type="text" placeholder="Type here" />
                </div>
              </div>
            </div>
            <div className="sidetables">
              <div className="sidetable1">
                <div className="side_table_header">
                  <span>Tax Associate Info:</span>
                </div>
                <div className="data">
                  <div className="entry">
                    <span>Name</span>
                    <span>Raju</span>
                  </div>
                  <div className="entry">
                    <span>Email</span>
                    <span>Raj33@gmail.com</span>
                  </div>
                  <div className="entry">
                    <span>Phone</span>
                    <span>1234567890</span>
                  </div>
                </div>
              </div>
              <div className="sidetable1">
                <div className="sidetable1">
                  <div className="side_table_header">
                    <span>Support Info:</span>
                  </div>
                  <div className="data">
                    <div className="entry">
                      <span>Email</span>
                      <span>help@finlotax.com</span>
                    </div>
                    <div className="entry">
                      <span>Phone</span>
                      <span>(408) 822-9406</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="terms_conditions">
            <input
              type="checkbox"
              className="checkbox"
              onClick={() => setCheckBox(!checkbox)}
            />
            <p>
              I have read the{" "}
              <span style={{ color: "blue" }}>
                Terms & Conditions, Privacy Policy, Disclaimer
              </span>{" "}
              and Approve this contract proposal for processing
            </p>
          </div>
          <div className="submitButtondiv">
            <button className={checkbox ? "active" : "disabled"}>Submit</button>
          </div>
        </div>
        <div>
          <div className="endTitle">© Finlo Inc, 2022</div>
        </div>
      </div>
    </div>
  );
}

export default ContractPage;
