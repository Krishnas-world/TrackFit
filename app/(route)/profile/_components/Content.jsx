import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CartesianGrid, XAxis, Line, LineChart, Bar, BarChart, Tooltip } from "recharts";
import { BellIcon, DumbbellIcon } from "lucide-react";

export default function Content() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
        <Link href="#" className="flex items-center gap-2 font-bold text-lg" prefetch={false}>
          <DumbbellIcon className="h-6 w-6 text-primary-foreground" />
          Fitness Tracker
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          <Link href="#" className="hover:underline" prefetch={false}>
            Workouts
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Progress
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Goals
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Community
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <BellIcon className="h-5 w-5 text-primary-foreground" />
            <span className="sr-only">Notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span className="sr-only">User Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>John Doe</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex-1 grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-6">
        <div className="bg-muted rounded-lg p-4 space-y-4">
          <h2 className="text-lg font-bold">Workout Log</h2>
          <form className="space-y-2">
            <div className="grid gap-2">
              <Label htmlFor="workout-date">Date</Label>
              <Input type="date" id="workout-date" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="workout-type">Workout Type</Label>
              <Select id="workout-type">
                <SelectTrigger>
                  <SelectValue placeholder="Select workout type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="strength">Strength Training</SelectItem>
                  <SelectItem value="cardio">Cardio</SelectItem>
                  <SelectItem value="yoga">Yoga</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="workout-duration">Duration (minutes)</Label>
              <Input type="number" id="workout-duration" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="workout-notes">Notes</Label>
              <Textarea id="workout-notes" rows={3} />
            </div>
            <Button type="submit" className="w-full">
              Log Workout
            </Button>
          </form>
        </div>
        <div className="space-y-6">
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
          <div className="bg-muted rounded-lg p-4">
            <h2 className="text-lg font-bold">Goals</h2>
            <div className="grid gap-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Lose 10 lbs</CardTitle>
                  <CardDescription>By June 30, 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={60} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Bench Press 225 lbs</CardTitle>
                  <CardDescription>By September 1, 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={80} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Run a 5K in under 25 minutes</CardTitle>
                  <CardDescription>By November 15, 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={40} />
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="bg-muted rounded-lg p-4">
            <h2 className="text-lg font-bold">Community</h2>
            <div className="grid gap-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Fitness Challenge</CardTitle>
                  <CardDescription>
                    Join our 30-day squat challenge and compete with other
                    members!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Starts: June 1, 2023</p>
                      <p className="text-sm text-muted-foreground">Ends: June 30, 2023</p>
                    </div>
                    <Button>Join Challenge</Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Workout of the Day</CardTitle>
                  <CardDescription>
                    Check out today's recommended workout and share your
                    progress!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">
                        Dumbbell Shoulder Press
                      </p>
                      <p className="text-sm text-muted-foreground">
                        3 sets of 12 reps
                      </p>
                    </div>
                    <Button>View Workout</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
        <p className="text-sm">&copy; 2023 Fitness Tracker. All rights reserved.</p>
        <nav className="flex items-center gap-4">
          <Link href="#" className="hover:underline" prefetch={false}>
            Privacy Policy
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Terms of Service
          </Link>
        </nav>
      </footer>
    </div>
  );
}

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
