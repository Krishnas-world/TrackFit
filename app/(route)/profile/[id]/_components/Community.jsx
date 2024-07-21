import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Community() {
  return (
    <div className="bg-muted rounded-lg p-4">
      <h2 className="text-lg font-bold">Community</h2>
      <div className="grid gap-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Fitness Challenge</CardTitle>
            <CardDescription>
              Join our 30-day squat challenge and compete with other members!
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
              Check out today's recommended workout and share your progress!
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
  );
}
