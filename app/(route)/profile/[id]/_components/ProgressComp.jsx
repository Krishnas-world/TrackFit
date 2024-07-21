import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LineChart, CartesianGrid, XAxis, Line, Tooltip, BarChart, Bar } from "recharts";
import { Progress } from "@/components/ui/progress";

const LineChartComponent = () => {
  const data = [
    { name: "Week 1", value: 200 },
    { name: "Week 2", value: 240 },
    { name: "Week 3", value: 220 },
    { name: "Week 4", value: 260 },
  ];
  return (
    <LineChart width={300} height={200} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
      <Tooltip />
    </LineChart>
  );
};

const BarChartComponent = () => {
  const data = [
    { name: "Bench", value: 180 },
    { name: "Squat", value: 200 },
    { name: "Deadlift", value: 220 },
    { name: "Row", value: 140 },
  ];
  return (
    <BarChart width={300} height={200} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <Bar dataKey="value" fill="#82ca9d" />
      <Tooltip />
    </BarChart>
  );
};

export default function ProgressComponent() {
  return (
    <>
      <div className="bg-muted rounded-lg p-4">
        <h2 className="text-lg font-bold">Progress</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Weight</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChartComponent />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Body Fat</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChartComponent />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Lifts</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChartComponent />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
