import React from "react";
// import "./profile.css"; 
import { useState } from "react";

function Profile() {
  import ("./profile.css");

  const [edit, setEdit] = useState(false); 
  
  const [inputs, setInputs] = useState({
    name: "",
    spouse: "",
    email: "",
    phone: "",
    city: "",
    zipcode: "",
  });

  const handleChange = (e) => {
    console.log(e.target.name);
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  //console.log(inputs);
  
  return (
    <div>
      <div className="profileContainer">
        <div className="col1">
          <div className="Title">Profile</div>
          <div className="personal_info">
            <div className="header_box">
              <span className="titleName"> Personal</span>
              <span className="edit_icon">
                <button onClick={() => setEdit(!edit)} className="edit_button">
                  {!edit ? "Edit" : "Save"}
                </button>
              </span>
            </div>
            <div className="details_box">
              <div className="labels">
                <div className="details">Name - Tax Payer</div>
                <div className="details">Name - Spouse</div>
                <div className="details">Email</div>
                <div className="details">Phone</div>
                <div className="details">City</div>
                <div className="details">Zip Code</div>
              </div>
              <div className="separator"></div>
              <div className="values">
                {edit && (
                  <>
                    <input
                      type="text"
                      //value={name.Name}
                      value={inputs.name}
                      name="name"
                      //onChange={(e) => setName(e.target.value)}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      //value={spouse.Spouse}
                      value={inputs.spouse}
                      name="spouse"
                      //onChange={(e) => setSpouse(e.target.value)}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      //value={email.Email}
                      value={inputs.email}
                      name="email"
                      //onChange={(e) => setEmail(e.target.value)}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      //value={phone.Phone}
                      value={inputs.phone}
                      name="phone"
                      //onChange={(e) => setPhone(e.target.value)}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      //value={city.City}
                      value={inputs.city}
                      name="city"
                      //onChange={(e) => setCity(e.target.value)}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      //value={zipcode.Zipcode}
                      value={inputs.zipcode}
                      name="zipcode"
                      //onChange={(e) => setZipcode(e.target.value)}
                      onChange={handleChange}
                    />
                  </>
                )}
                {!edit && (
                  <>
                    {console.log(inputs)}
                    <div>{inputs.name}</div>
                    <div>{inputs.spouse}</div>
                    <div>{inputs.email}</div>
                    <div>{inputs.phone}</div>
                    <div>{inputs.city}</div>
                    <div>{inputs.zipcode}</div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="Business_info"></div>
          <div className="endTitle">Finlo Inc, 2022</div>
        </div>
        <div className="col2">
          <div className="subtables">
            <div className="Tainfo">
              <div className="header2">Tax Associate Info:</div>
              <div className="labels2">
                <div>Name :</div>
                <div>Email :</div>
                <div>Phone :</div>
              </div>
            </div>
            <div className="support">
              <div className="header2">Support info:</div>
              <div className="labels2">
                <div>Email :</div>
                <div>Phone :</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex_2">
          {/* <div className="Business_info"></div> */}
        </div>
      </div>
    </div>
  );
}

export default Profile;
