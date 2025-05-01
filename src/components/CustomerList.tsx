import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef, ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { Customer } from "../types";
import Button from "@mui/material/Button";
import AddCustomer from "./AddCustomer";
import SnackBar from "@mui/material/Snackbar";
import { CSVLink } from "react-csv";
import EditCustomer from "./EditCustomer";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [open, setOpen] = useState(false);

  const deleteCustomer = (link) => {
    fetch(link, { method: "DELETE" })
      .then(() => fetchData())
      .catch((error) => console.error("Error deleting customer:", error));
  };
  const saveCustomer = (customer: Customer) => {
    fetch(
      "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      }
    )
      .then(() => fetchData())
      .catch((error) => console.error("Error saving customer:", error));
  };

  const updateCustomer = (customer, link) => {
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then(() => fetchData())
      .catch((error) => console.error("Error updating customer:", error));
  };

  const [columnDefs] = useState<ColDef<Customer>[]>([
    { field: "firstname", filter: true, width: 150 },
    { field: "lastname", filter: true, width: 150 },
    { field: "streetaddress", filter: true, width: 150 },
    { field: "postcode", filter: true, width: 150 },
    { field: "city", filter: true, width: 150 },
    { field: "email", filter: true, width: 150 },
    { field: "phone", filter: true, width: 150 },
    {
      field: "_links.self.href",
      width: 150,
      filter: false,
      sortable: false,
      headerName: "Edit",
      cellRenderer: (params) => (
        <EditCustomer
          updateCustomer={updateCustomer}
          customer={params.data}
          link={params.value}
        />
      ),
    },
    {
      field: "_links.self.href",
      width: 150,
      filter: false,
      sortable: false,
      headerName: "Delete",
      cellRenderer: (params) => (
        <Button color="secondary" onClick={() => deleteCustomer(params.value)}>
          Delete
        </Button>
      ),
    },
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

  const csvHeaders = [
    {
      label: "First Name",
      key: "firstname",
    },
    {
      label: "Last Name",
      key: "lastname",
    },
    {
      label: "Street Address",
      key: "streetaddress",
    },
    {
      label: "Postcode",
      key: "postcode",
    },
    {
      label: "City",
      key: "city",
    },
    {
      label: "Email",
      key: "email",
    },
    {
      label: "Phone",
      key: "phone",
    },
  ];

  return (
    <>
      <div style={{ width: "100%", height: 450 }}>
        <AddCustomer saveCustomer={saveCustomer} />
        <AgGridReact
          rowData={customers}
          columnDefs={columnDefs}
          pagination={true}
          paginationAutoPageSize={true}
        />
        <CSVLink
          data={customers}
          headers={csvHeaders}
          filename="customers.csv"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Export to CSV
        </CSVLink>
      </div>
      <SnackBar
        open={open}
        autoHideDuration={300}
        onClose={() => setOpen(false)}
        message="Car deleted successfully"
      />
    </>
  );
}
