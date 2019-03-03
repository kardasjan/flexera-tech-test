import React from "react";
import Table from "./Table";
import AddPerson from "./AddPerson";
import Errors from "./Errors";

const App = () => (
  <div className="row mt-5">
    <div className="col-sm-12">
      <Errors />
    </div>
    <div className="col-sm-12">
      <AddPerson />
    </div>
    <div className="col-sm-12">
      <h2>People</h2>
      <Table />
    </div>
  </div>
);

export default App
