import { Card, CardContent, CardHeader } from "@mui/material";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import _ from "lodash";

export default function Home() {
  const [chartData, setChartData] = useState<
    { activity: string; duration: number }[]
  >([]);

  useEffect(() => {
    fetch(
      "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings"
    )
      .then((response) => response.json())
      .then((data) => {
        const grouped = _.groupBy(data, "activity");

        const groupedActivityData = Object.keys(grouped).map((activity) => ({
          activity,
          duration: _.sumBy(grouped[activity], "duration"),
        }));

        setChartData(groupedActivityData);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  return (
    <main className="mx-auto m-24 max-w-4xl">
      <Card>
        <CardHeader />
        <CardContent>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="activity" />
                <YAxis
                  label={{
                    value: "Duration (minutes)",
                    angle: -90,
                    position: "insideLeft",
                    offset: 10,
                  }}
                />
                <Tooltip />
                <Bar dataKey="duration" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
