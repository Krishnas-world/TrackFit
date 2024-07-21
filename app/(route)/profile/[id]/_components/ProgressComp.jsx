import { useState, useEffect } from "react";
import { db } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LineChart, CartesianGrid, XAxis, Line, Tooltip, BarChart, Bar, ResponsiveContainer } from "recharts";

const LineChartComponent = ({ data }) => (
  <ResponsiveContainer width="100%" height={200}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
      <Tooltip />
    </LineChart>
  </ResponsiveContainer>
);

const BarChartComponent = ({ data }) => (
  <ResponsiveContainer width="100%" height={200}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <Bar dataKey="value" fill="#82ca9d" />
      <Tooltip />
    </BarChart>
  </ResponsiveContainer>
);

export default function ProgressComponent() {
  const [workoutLogs, setWorkoutLogs] = useState([]);
  const [goals, setGoals] = useState([]);
  const [dailyWorkoutData, setDailyWorkoutData] = useState([]);
  const [workoutTypeData, setWorkoutTypeData] = useState([]);
  const [goalProgressData, setGoalProgressData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const storedData = JSON.parse(sessionStorage.getItem("userProfile"));
      const userId = storedData ? storedData.id : null;

      if (userId) {
        // Fetch workout logs
        const workoutsCollection = collection(db, "users", userId, "workouts");
        const workoutsSnapshot = await getDocs(workoutsCollection);
        const logs = workoutsSnapshot.docs.map(doc => doc.data());
        setWorkoutLogs(logs);

        // Fetch goals
        const goalsCollection = collection(db, "users", userId, "goals");
        const goalsSnapshot = await getDocs(goalsCollection);
        const fetchedGoals = goalsSnapshot.docs.map(doc => doc.data());
        setGoals(fetchedGoals);

        // Process daily workout data
        const dailyData = logs.reduce((acc, log) => {
          const date = new Date(log.date).toLocaleDateString();
          if (!acc[date]) {
            acc[date] = { name: date, value: 0 };
          }
          acc[date].value += parseFloat(log.duration) || 0;
          return acc;
        }, {});
        setDailyWorkoutData(Object.values(dailyData));

        // Process workout type data
        const workoutTypeData = logs.reduce((acc, log) => {
          if (!acc[log.workoutType]) {
            acc[log.workoutType] = { name: log.workoutType, value: 0 };
          }
          acc[log.workoutType].value += parseFloat(log.duration) || 0;
          return acc;
        }, {});
        setWorkoutTypeData(Object.values(workoutTypeData));

        // Process goal progress data
        const goalProgressData = fetchedGoals.map(goal => ({
          name: goal.title,
          value: goal.progress
        }));
        setGoalProgressData(goalProgressData);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-muted rounded-lg p-4">
      <h2 className="text-lg font-bold text-black">Progress</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Daily Workout Hours</CardTitle>
          </CardHeader>
          <CardContent className="h-60">
            <LineChartComponent data={dailyWorkoutData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Workout Type Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="h-60">
            <BarChartComponent data={workoutTypeData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Goal Progress</CardTitle>
          </CardHeader>
          <CardContent className="h-60">
            <BarChartComponent data={goalProgressData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
