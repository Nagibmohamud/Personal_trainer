import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef, ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { Training, TrainingData } from "../types";
import { format } from "date-fns";
import { Button, Snackbar } from "@mui/material";
import AddTraining from "./AddTraining";
ModuleRegistry.registerModules([AllCommunityModule]);

export default function TrainingList() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings"
      );

      const data = await response.json();

      const formattedTrainings = await Promise.all(
        data._embedded.trainings.map(async (training: TrainingData) => {
          const customerResponse = await fetch(training._links.customer.href);
          const customerData = await customerResponse.json();

          return {
            ...training,
            date: format(new Date(training.date), "dd.MM.yyyy HH:mm"),
            customerName: `${customerData.firstname} ${customerData.lastname}`,
          };
        })
      );

      setTrainings(formattedTrainings);
    } catch (error) {
      console.error("Error fetching trainings or customers:", error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await fetch(
        "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers"
      );
      const data = await response.json();
      setCustomers(data._embedded.customers);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const deleteTraining = (link) => {
    console.log("deleteTraining", link);
    if (window.confirm("Are you sure you want to delete this training?")) {
      fetch(link, { method: "DELETE" })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error when deleting training");
          }
          fetchData();
          setOpen(true);
        })
        .catch((error) => {
          console.error("Error deleting training:", error);
        });
    }
  };

  const saveTraining = (training: Training) => {
    fetch(
      "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(training),
      }
    )
      .then(() => fetchData())
      .catch((error) => console.error("Error saving training:", error));
  };

  const [columnDefs] = useState<ColDef<Training>[]>([
    { field: "customerName", filter: true, width: 250 },
    { field: "date", filter: true, width: 250 },
    { field: "duration", filter: true, width: 250 },
    { field: "activity", filter: true, width: 250 },
    {
      field: "_links.self.href",
      width: 150,
      filter: false,
      sortable: false,
      headerName: "Delete",
      cellRenderer: (params) => (
        <Button
          color="secondary"
          onClick={() => {
            deleteTraining(params.value);
          }}
        >
          Delete
        </Button>
      ),
    },
  ]);

  useEffect(() => {
    fetchData();
    fetchCustomers();
  }, []);

  return (
    <>
      <div style={{ width: "100%", height: 450 }}>
        <AddTraining saveTraining={saveTraining} customers={customers} />
        <AgGridReact
          rowData={trainings}
          columnDefs={columnDefs}
          pagination={true}
          paginationAutoPageSize={true}
        />
      </div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message="Customer deleted successfully"
      />
    </>
  );
}
