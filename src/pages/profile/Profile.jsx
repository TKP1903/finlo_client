import React from "react";
import "./profile.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function Profile() {
  const [edit, setEdit] = useState(false);

  // const [name, setName] = useState({
  //   Name: "",
  // });
  // const [spouse, setSpouse] = useState({
  //   Spouse: "",
  // });
  // const [email, setEmail] = useState({
  //   Email: "",
  // });
  // const [phone, setPhone] = useState({
  //   Phone: "",
  // });
  // const [city, setCity] = useState({
  //   City: "",
  // });
  // const [zipcode, setZipcode] = useState({
  //   Zipcode: "",
  // });

  const [inputs, setInputs] = useState({
    name: "",
    spouse: "",
    email: "",
    phone: "",
    city: "",
    zipcode: "",
  });

  const handleChange = (e) => {
    console.log(e.target.name)
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  //console.log(inputs);

  return (
    <div className="profileContainer">
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
                  value = {inputs.name}
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
    </div>
  );
}

export default Profile;