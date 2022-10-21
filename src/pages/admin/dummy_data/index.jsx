// import react
import React from "react";

const dummyClients = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "jhonedoe@xyz.com",
    phone: "1234567890",
    city: "Abbeville",
    state: "Alabama",
    country: "United States",
    status: "active",
    // branchOffice: "office1",
    // sales: "sales",
    // employee: "raju",
  },
  {
    id: 2,
    firstName: "John",
    lastName: "Doe",
    email: "jhonedoe@xyz.com",
    phone: "1234567890",
    city: "Abbeville",
    state: "Alabama",
    country: "United States",
    status: "inactive",
    // branchOffice: "office1",
    // sales: "sales",
    // employee: "raju",
  },
  {
    id: 3,
    firstName: "John",
    lastName: "Doe",
    email: "jhonedoe@xyz.com",
    phone: "1234567890",
    city: "Abbeville",
    state: "Alabama",
    country: "United States",
    status: "active",
    // branchOffice: "office1",
    // sales: "sales",
    // employee: "raju",
  },
];

for (let i = 0; i < 10; i++) {
  dummyClients.push({
    ...dummyClients[0],
    id: dummyClients.length + 1,
  });
}

export {
    dummyClients,
};