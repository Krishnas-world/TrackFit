import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
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

export default function FitnessDashboard() {
  return (
    <div className="bg-muted rounded-lg p-4 space-y-6">
      {/* Workout Log Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-black">Workout Log</h2>
        <form className="space-y-2 text-black">
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
                <SelectItem value="pilates">Pilates</SelectItem>
                <SelectItem value="stretching">Stretching</SelectItem>
                <SelectItem value="HIIT">HIIT</SelectItem>
                <SelectItem value="cycling">Cycling</SelectItem>
                <SelectItem value="swimming">Swimming</SelectItem>
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

      {/* Goals Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-black">Goals</h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Goal 1: Weight Loss</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-start">
                <Progress value={60} max={100} className="w-full" />
                <p className="mt-2 text-sm">You have reached 60% of your weight loss goal.</p>
                <Button className="mt-4">Update Goal</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Goal 2: Muscle Gain</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-start">
                <Progress value={40} max={100} className="w-full" />
                <p className="mt-2 text-sm">You have reached 40% of your muscle gain goal.</p>
                <Button className="mt-4">Update Goal</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
