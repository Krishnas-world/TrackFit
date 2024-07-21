"use client";
import { useState, useEffect } from 'react';
import { db } from '@/firebaseConfig';
import { collection, query, where, orderBy, limit, getDocs, doc, setDoc } from 'firebase/firestore';
import { toast } from 'sonner';
import Image from 'next/image';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

// Fitness goals dataset
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

export default function Register({ user }) {
  const [formData, setFormData] = useState({
    name: "",
    email: user.email || "",
    dob: "",
    gender: "",
    height: "",
    weight: "",
    goal: "",
    phone: "",
  });
  const [photo, setPhoto] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [docId, setDocId] = useState('');
  const [profileExists, setProfileExists] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.email) {
        try {
          const q = query(collection(db, 'users'), where('email', '==', user.email));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0].data();
            setFormData({
              name: userDoc.name || "",
              email: userDoc.email || "",
              dob: userDoc.dob || "",
              gender: userDoc.gender || "",
              height: userDoc.height || "",
              weight: userDoc.weight || "",
              goal: userDoc.goal || "",
              phone: userDoc.phone || "",
            });
            setPhoto(userDoc.picture || "");
            setDocId(querySnapshot.docs[0].id);
            setProfileExists(true);
            storeUserDataInSession(userDoc, querySnapshot.docs[0].id);
          } else {
            setProfileExists(false);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [user]);

  useEffect(() => {
    const isFormValid = Object.values(formData).every(value => typeof value === 'string' && value.trim() !== "");
    setIsButtonDisabled(!isFormValid);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value.trim(), // Trim spaces
    }));
  };

  const getNextDocumentName = async () => {
    const q = query(collection(db, "users"), orderBy("createdAt", "desc"), limit(1));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const lastDoc = querySnapshot.docs[0];
      const lastDocId = lastDoc.id;
      const numberPart = parseInt(lastDocId.replace("TFit", ""));
      const nextNumber = numberPart + 1;
      return `TFit${nextNumber.toString().padStart(1, "0")}`;
    }
    return "TFit1";
  };

  const checkPhoneNumberExists = async (phoneNumber) => {
    if (!phoneNumber) return false;

    try {
      const q = query(collection(db, "users"), where("phone", "==", phoneNumber));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error checking phone number:", error);
      return false;
    }
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (await checkPhoneNumberExists(formData.phone) && formData.phone !== formData.phone) {
        return toast.warning("Phone number already exists. Please use a different phone number.");
      }

      const age = calculateAge(formData.dob);
      const dataToSave = {
        ...formData,
        age,
        email: user.email,
        picture: photo || user.picture,
        createdAt: new Date(),
      };

      if (profileExists) {
        await setDoc(doc(db, "users", docId), dataToSave);
        toast.success("Profile updated successfully!");
      } else {
        const newDocName = await getNextDocumentName();
        const newDocRef = doc(db, "users", newDocName);
        await setDoc(newDocRef, dataToSave);
        toast.success("Profile saved successfully!");
        setDocId(newDocName); // Update docId with new document ID
      }

      storeUserDataInSession(dataToSave, docId);
      router.push(`/profile/${docId}`); // Redirect to profile route with docId
    } catch (error) {
      console.error("Error updating document: ", error);
      toast.error("Failed to save profile.");
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const storeUserDataInSession = (userData, id) => {
    const expirationTime = new Date().getTime() + 7 * 24 * 60 * 60 * 1000; // 7 days from now
    const dataToStore = {
      userData,
      id,
      expirationTime,
    };
    sessionStorage.setItem('userProfile', JSON.stringify(dataToStore));
  };

  const getUserDataFromSession = () => {
    const storedData = sessionStorage.getItem('userProfile');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (new Date().getTime() < parsedData.expirationTime) {
        return parsedData;
      } else {
        sessionStorage.removeItem('userProfile');
      }
    }
    return null;
  };

  useEffect(() => {
    const sessionData = getUserDataFromSession();
    if (sessionData) {
      setFormData({
        name: sessionData.userData.name || "",
        email: sessionData.userData.email || "",
        dob: sessionData.userData.dob || "",
        gender: sessionData.userData.gender || "",
        height: sessionData.userData.height || "",
        weight: sessionData.userData.weight || "",
        goal: sessionData.userData.goal || "",
        phone: sessionData.userData.phone || "",
      });
      setPhoto(sessionData.userData.picture || "");
      setDocId(sessionData.id || "");
      setProfileExists(true);
    }
  }, []);

  return (
    <form onSubmit={handleSave} className="p-8">
      <div className="bg-card border-[1px] text-card-foreground rounded-lg w-auto mx-auto p-6 m-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-4">
            <Image src={photo || user.picture} alt="Profile photo" width={100} height={100} className="rounded-full border border-muted" />
            <div>
              <label className="block text-sm font-medium text-muted-foreground">Profile photo</label>
              <input type="file" onChange={handlePhotoChange} className="mt-1" />
            </div>
          </div>

          {/* Form Fields */}
          <div>
            <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
            <Input id="name" required name="name" className='bg-blue-100 text-black border border-blue-400' placeholder="John Doe" value={formData.name} onChange={handleChange} />
          </div>

          <div>
            <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
            <Input id="email" required name="email" className='bg-blue-100 text-black border border-blue-400' placeholder="example@domain.com" value={formData.email} onChange={handleChange} disabled />
          </div>

          <div>
            <Label htmlFor="dob">Date of Birth <span className="text-red-500">*</span></Label>
            <Input id="dob" required name="dob" className='bg-blue-100 text-black border border-blue-400' type="date" value={formData.dob} onChange={handleChange} />
          </div>

          <div>
            <Label htmlFor="gender">Gender</Label><span className="text-red-500">*</span>
            <Select id="gender" name="gender" value={formData.gender} onValueChange={(value) => setFormData(prevData => ({ ...prevData, gender: value }))}>
              <SelectTrigger className='bg-blue-100 text-black border border-blue-400'>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="height">Height (cm) <span className="text-red-500">*</span></Label>
            <Input id="height" required name="height" className='bg-blue-100 text-black border border-blue-400' type="number" value={formData.height} onChange={handleChange} />
          </div>

          <div>
            <Label htmlFor="weight">Weight (kg) <span className="text-red-500">*</span></Label>
            <Input id="weight" required name="weight" className='bg-blue-100 text-black border border-blue-400' type="number" value={formData.weight} onChange={handleChange} />
          </div>

          <div>
            <Label htmlFor="goal">Fitness Goal <span className="text-red-500">*</span></Label>
            <Select id="goal" name="goal" value={formData.goal} onValueChange={(value) => setFormData(prevData => ({ ...prevData, goal: value }))}>
              <SelectTrigger className='bg-blue-100 text-black border border-blue-400'>
                <SelectValue placeholder="Select fitness goal" />
              </SelectTrigger>
              <SelectContent>
                {fitnessGoals.map((goal) => (
                  <SelectItem key={goal.id} value={goal.goal}>{goal.goal}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label><span className="text-red-500">*</span>
            <Input id="phone" name="phone" className='bg-blue-100 text-black border border-blue-400' placeholder="Optional" value={formData.phone} onChange={handleChange} />
          </div>

          <Button type="submit" disabled={isButtonDisabled} className={`mt-4 ${isButtonDisabled ? 'bg-gray-400' : 'bg-blue-500'} hover:bg-blue-700`}>Save</Button>
        </div>
      </div>
    </form>
  );
}
