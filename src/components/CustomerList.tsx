import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  ColDef,
  ModuleRegistry,
  AllCommunityModule,
  themeMaterial,
} from "ag-grid-community";
import { Customer } from "../types";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const [columnDefs] = useState<ColDef<Customer>[]>([
    { field: "firstname", filter: true },
    { field: "lastname", filter: true, width: 150 },
    { field: "streetaddress", filter: true, width: 150 },
    { field: "postcode", filter: true, width: 150 },
    { field: "city", filter: true, width: 150 },
    { field: "email", filter: true, width: 150 },
    { field: "phone", filter: true, width: 150 },
  ]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch(
      "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers"
    )
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data._embedded.customers);
      });
  };

  return (
    <>
      <div style={{ width: "100%", height: 450 }}>
        <AgGridReact
          rowData={customers}
          columnDefs={columnDefs}
          pagination={true}
          paginationAutoPageSize={true}
          theme={themeMaterial}
        />
      </div>
    </>
  );
}
