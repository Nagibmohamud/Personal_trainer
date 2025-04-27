import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  ColDef,
  ModuleRegistry,
  AllCommunityModule,
  themeMaterial,
} from "ag-grid-community";
import { Training } from "../types";
import { format } from "date-fns";
ModuleRegistry.registerModules([AllCommunityModule]);

export default function TrainingList() {
  const [trainings, setTrainings] = useState<Training[]>([]);

  const [columnDefs] = useState<ColDef<Training>[]>([
    { field: "date", filter: true, width: 350 },
    { field: "duration", filter: true, width: 150 },
    { field: "activity", filter: true, width: 150 },
  ]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch(
      "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings"
    )
      .then((response) => response.json())
      .then((data) => {
        const formattedTrainings = data._embedded.trainings.map(
          (training: Training) => {
            return {
              ...training,
              date: format(new Date(training.date), "dd.MM.yyyy HH:mm"),
            };
          }
        );
        setTrainings(formattedTrainings);
      });
  };

  return (
    <>
      <div style={{ width: "100%", height: 450 }}>
        <AgGridReact
          rowData={trainings}
          columnDefs={columnDefs}
          pagination={true}
          paginationAutoPageSize={true}
          theme={themeMaterial}
        />
      </div>
    </>
  );
}
