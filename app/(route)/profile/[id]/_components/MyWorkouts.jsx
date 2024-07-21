import { useState, useEffect } from "react";
import { db } from "@/firebaseConfig";
import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import Confetti from "react-confetti";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";

export default function FitnessDashboard() {
  const [workoutLogs, setWorkoutLogs] = useState([]);
  const [goals, setGoals] = useState([]);
  const [date, setDate] = useState("");
  const [workoutType, setWorkoutType] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");
  const [weight, setWeight] = useState("");
  const [selectedGoal, setSelectedGoal] = useState(""); // For dropdown selection
  const [customGoal, setCustomGoal] = useState(""); // For custom goal
  const [goalProgress, setGoalProgress] = useState(0);
  const [userExists, setUserExists] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // For search functionality
  const [editingGoalId, setEditingGoalId] = useState(null);
  const [editingGoalTitle, setEditingGoalTitle] = useState("");
  const [editingGoalProgress, setEditingGoalProgress] = useState(0);

  const [showConfetti, setShowConfetti] = useState(false);
  const [congratsMessage, setCongratsMessage] = useState("");
  const [showCongratsDialog, setShowCongratsDialog] = useState(false); // State to control the visibility of the congrats dialog

  const exerciseTypes = [
    "Strength Training", "Cardio", "Yoga", "Pilates", "Stretching",
    "HIIT", "Cycling", "Swimming", "Push-ups", "Squats", "Lunges",
    "Pull-ups", "Crunches", "Planks", "Burpees", "Jumping Jacks",
    "Other"
  ];

  const fitnessGoals = [
    { id: 1, goal: "Lose weight" },
    { id: 2, goal: "Build muscle" },
    { id: 3, goal: "Improve endurance" },
    { id: 4, goal: "Increase flexibility" },
    { id: 5, goal: "Enhance overall fitness" },
    { id: 6, goal: "Increase strength" },
    { id: 7, goal: "Tone up" },
    { id: 8, goal: "Improve cardiovascular health" },
    { id: 9, goal: "Gain weight" },
    { id: 10, goal: "Prepare for a specific event" },
    { id: 11, goal: "Improve balance" },
    { id: 12, goal: "Reduce stress" },
    { id: 13, goal: "Increase mobility" },
    { id: 14, goal: "Rehabilitation and recovery" },
    { id: 15, goal: "Achieve a personal best in a sport" }
  ];

  useEffect(() => {
    const storedData = JSON.parse(sessionStorage.getItem("userProfile"));
    const userId = storedData ? storedData.id : null;

    if (userId) {
      const userDocRef = doc(db, "users", userId);
      getDoc(userDocRef).then((docSnap) => {
        if (docSnap.exists()) {
          setUserExists(true);
          const workoutsCollection = collection(db, "users", userId, "workouts");
          getDocs(workoutsCollection).then((querySnapshot) => {
            const logs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setWorkoutLogs(logs);
          });

          const goalsCollection = collection(db, "users", userId, "goals");
          getDocs(goalsCollection).then((querySnapshot) => {
            const fetchedGoals = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setGoals(fetchedGoals);
          });
        } else {
          setUserExists(false);
        }
      });
    }
  }, []);

  const handleLogWorkout = async (e) => {
    e.preventDefault();
    if (!date || !workoutType || !duration || !notes || !weight) {
      toast.error("Please fill out all required fields for logging workout.");
      return;
    }
    const storedData = JSON.parse(sessionStorage.getItem("userProfile"));
    const userId = storedData ? storedData.id : null;

    if (userId && userExists) {
      const workoutData = {
        date,
        workoutType,
        duration,
        notes,
        weight,
        documentName: userId,
      };

      try {
        const workoutDocRef = doc(collection(db, "users", userId, "workouts"));
        await setDoc(workoutDocRef, workoutData);

        setWorkoutLogs(prevLogs => [...prevLogs, { id: workoutDocRef.id, ...workoutData }]);
        toast.success("Workout logged successfully!");
      } catch (error) {
        toast.error("Failed to log workout. Please try again.");
      }
    }
  };

  const handleAddGoal = async (e) => {
    e.preventDefault();
    if (!selectedGoal || (selectedGoal === "Custom" && !customGoal) || goalProgress === "") {
      toast.error("Please fill out all required fields for adding goal.");
      return;
    }
    if (goalProgress < 0 || goalProgress > 100) {
      toast.error("Goal progress must be between 0 and 100.");
      return;
    }

    const storedData = JSON.parse(sessionStorage.getItem("userProfile"));
    const userId = storedData ? storedData.id : null;

    if (userId && userExists) {
      const goalData = {
        title: selectedGoal === "Custom" ? customGoal : selectedGoal,
        progress: goalProgress,
      };

      try {
        const goalDocRef = doc(collection(db, "users", userId, "goals"));
        await setDoc(goalDocRef, goalData);

        setGoals(prevGoals => [...prevGoals, { id: goalDocRef.id, ...goalData }]);
        if (goalProgress === 100) {
          // Check if congrats message was already shown
          const congratulatedGoals = JSON.parse(localStorage.getItem("congratulatedGoals")) || [];
          if (!congratulatedGoals.includes(goalData.title)) {
            setCongratsMessage("Congratulations on completing your goal!");
            setShowConfetti(true);
            setShowCongratsDialog(true); // Show the congrats dialog

            // Add to congratulated goals
            localStorage.setItem("congratulatedGoals", JSON.stringify([...congratulatedGoals, goalData.title]));
          }
        }
        setSelectedGoal("");
        setCustomGoal("");
        setGoalProgress(0);
        toast.success("Goal added successfully!");
      } catch (error) {
        toast.error("Failed to add goal. Please try again.");
      }
    }
  };

  const handleEditGoal = (goal) => {
    setEditingGoalId(goal.id);
    setEditingGoalTitle(goal.title);
    setEditingGoalProgress(goal.progress);
  };

  const handleSaveEditedGoal = async (e) => {
    e.preventDefault();
    if (!editingGoalTitle || editingGoalProgress === "") {
      toast.error("Please fill out all required fields for editing goal.");
      return;
    }
    if (editingGoalProgress < 0 || editingGoalProgress > 100) {
      toast.error("Goal progress must be between 0 and 100.");
      return;
    }

    const storedData = JSON.parse(sessionStorage.getItem("userProfile"));
    const userId = storedData ? storedData.id : null;

    if (userId && userExists) {
      const goalData = {
        title: editingGoalTitle,
        progress: editingGoalProgress,
      };

      try {
        const goalDocRef = doc(db, "users", userId, "goals", editingGoalId);
        await setDoc(goalDocRef, goalData, { merge: true });

        setGoals((prevGoals) =>
          prevGoals.map((goal) =>
            goal.id === editingGoalId ? { ...goal, ...goalData } : goal
          )
        );
        if (editingGoalProgress === 100) {
          // Check if congrats message was already shown
          const congratulatedGoals = JSON.parse(localStorage.getItem("congratulatedGoals")) || [];
          if (!congratulatedGoals.includes(editingGoalTitle)) {
            setCongratsMessage("Congratulations on completing your goal!");
            setShowConfetti(true);
            setShowCongratsDialog(true); // Show the congrats dialog

            // Add to congratulated goals
            localStorage.setItem("congratulatedGoals", JSON.stringify([...congratulatedGoals, editingGoalTitle]));
          }
        }
        setEditingGoalId(null);
        setEditingGoalTitle("");
        setEditingGoalProgress(0);
        toast.success("Goal updated successfully!");
      } catch (error) {
        toast.error("Failed to update goal. Please try again.");
      }
    }
  };

  const filteredExerciseTypes = exerciseTypes.filter(type =>
    type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
<div className="bg-muted rounded-lg p-4 space-y-6">
      {showConfetti && (
        <Confetti
          recycle={false}
          onConfettiComplete={() => setShowConfetti(false)}
        />
      )}

      <h1 className="text-black font-bold mb-4">Workout Log</h1>

      <form onSubmit={handleLogWorkout} className="space-y-4 text-black">
        <div>
          <Label htmlFor="date">Date</Label>
          <Input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>

        <div>
          <Label htmlFor="workoutType">Workout Type</Label>
          <div className="relative">
            <Select value={workoutType} onValueChange={(value) => setWorkoutType(value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a workout type" />
              </SelectTrigger>
              <SelectContent>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search workout type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-2 p-2"
                  />
                  <Search className="absolute top-3 right-3 h-5 w-5 text-muted" />
                </div>
                {filteredExerciseTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="duration">Duration (minutes)</Label>
          <Input
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="weight">Weight</Label>
          <Input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </div>

        <Button type="submit">Log Workout</Button>
      </form>

      <form onSubmit={handleAddGoal} className="space-y-4 text-black">
        <div>
          <Label htmlFor="goalTitle">Goal Title</Label>
          <Select value={selectedGoal} onValueChange={(value) => setSelectedGoal(value)} required>
            <SelectTrigger>
              <SelectValue placeholder="Select a goal" />
            </SelectTrigger>
            <SelectContent>
              {fitnessGoals.map((goal) => (
                <SelectItem key={goal.id} value={goal.goal}>
                  {goal.goal}
                </SelectItem>
              ))}
              <SelectItem key="Custom" value="Custom">
                Custom Goal
              </SelectItem>
            </SelectContent>
          </Select>
          {selectedGoal === "Custom" && (
            <Input
              type="text"
              id="customGoal"
              value={customGoal}
              onChange={(e) => setCustomGoal(e.target.value)}
              placeholder="Enter your custom goal"
              required
            />
          )}
        </div>

        <div>
          <Label htmlFor="goalProgress">Goal Progress (%)</Label>
          <Input
            type="number"
            id="goalProgress"
            value={goalProgress}
            onChange={(e) => setGoalProgress(Math.max(0, Math.min(100, e.target.value)))}
            required
          />
        </div>

        <Button type="submit">Add Goal</Button>
      </form>

      {goals.map((goal) => (
        <Card key={goal.id} className="mb-4">
          <CardHeader>
            <CardTitle>{goal.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={goal.progress} className="mb-2 text-black" />
            <p>Progress: {goal.progress}%</p>
            <Dialog open={showCongratsDialog} onOpenChange={(open) => !open && setShowCongratsDialog(false)}>
        <DialogTitle className='text-black text-center' style={{ backgroundColor: '#4CAF50', color: 'white', padding: '16px', borderRadius: '8px' }}>
          🎉 Congratulations! 🎉
        </DialogTitle>
        <DialogContent>
          <p style={{ fontSize: '1.2rem', textAlign: 'center', color: '#333' }}>
            {congratsMessage} 🎊 You're doing an amazing job! Keep up the great work and stay motivated. 💪✨
          </p>
          <div className="flex justify-center mt-4">
            <Button onClick={() => setShowCongratsDialog(false)} style={{ backgroundColor: '#4CAF50', color: 'white' }}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
