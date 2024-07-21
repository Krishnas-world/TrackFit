"use client";
import { useState, useEffect } from 'react';
import { db } from '@/firebaseConfig';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { badges } from '@/app/utils/badges';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userBadges, setUserBadges] = useState([]);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      if (id) {
        try {
          const docRef = doc(db, 'users', id);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setProfile(userData);

            // Fetch workout logs and goals
            const goalsCollection = collection(db, 'users', id, 'goals');
            const goalsSnapshot = await getDocs(goalsCollection);
            const userGoals = goalsSnapshot.docs.map(doc => doc.data());

            // Calculate goals completed
            const goalsCompleted = userGoals.filter(goal => goal.progress === 100).length;

            // Determine user badges
            const newBadges = [];
            if (goalsCompleted >= 75) newBadges.push(badges.expert[0]); // 75 goals
            else if (goalsCompleted >= 50) newBadges.push(badges.intermediate[2]); // 50 goals
            else if (goalsCompleted >= 25) newBadges.push(badges.intermediate[1]); // 25 goals
            else if (goalsCompleted >= 10) newBadges.push(badges.beginner[2]); // 10 goals
            else if (goalsCompleted >= 5) newBadges.push(badges.beginner[1]); // 5 goals
            else if (goalsCompleted >= 1) newBadges.push(badges.beginner[0]); // 1 goal

            setUserBadges(newBadges);

          } else {
            console.error("No such document!");
          }
        } catch (error) {
          console.error("Error fetching document: ", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProfile();
  }, [id]);

  const handleEditClick = () => {
    toast.warning("Please wait as we redirect you to update your profile");
    setTimeout(() => {
      router.push('/dashboard');
    }, 2000);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>No profile found.</div>;
  }

  return (
    <div className="bg-white border-[1px] text-gray-900 rounded-xl shadow-lg w-full md:max-w-2xl mx-auto p-6 m-4">
      <div className="flex items-center space-x-4">
        <Image src={profile.picture || '/default-profile.png'} alt="Profile photo" width={100} height={100} className="rounded-full border border-gray-300" />
        <div>
          <h2 className="text-xl font-bold">{profile.name}</h2>
          <p className="text-sm text-gray-600">{profile.email}</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-blue-500">Profile Details</h3>
        <p className="mt-2 text-gray-600"><strong>Date of Birth:</strong> {profile.dob}</p>
        <p className="mt-2 text-gray-600"><strong>Gender:</strong> {profile.gender}</p>
        <p className="mt-2 text-gray-600"><strong>Height:</strong> {profile.height} cm</p>
        <p className="mt-2 text-gray-600"><strong>Weight:</strong> {profile.weight} kg</p>
        <p className="mt-2 text-gray-600"><strong>Fitness Goal:</strong> {profile.goal}</p>
        <p className="mt-2 text-gray-600"><strong>Phone Number:</strong> {profile.phone || 'Not provided'}</p>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-blue-500">Badges</h3>
        <p className="text-sm text-gray-500 mt-2">
          <span className="font-semibold">Badges:</span> 
          <br />
          <span className="block">Beginner: Earned for completing 1, 5, and 10 goals.</span>
          <span className="block">Intermediate: Earned for completing 25, 50, and 75 goals.</span>
          <span className="block">Expert: Earned for completing 100 goals.</span>
        </p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {userBadges.length > 0 ? (
            userBadges.map(badge => (
              <div key={badge.id} className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
                <Image src={badge.image} alt={badge.name} width={60} height={60} className="mx-auto" />
                <h4 className="mt-2 text-md font-semibold">{badge.name}</h4>
                <p className="text-sm text-gray-600">{badge.description}</p>
              </div>
            ))
          ) : (
            <div className="col-span-1 sm:col-span-2 md:col-span-3">
              <p className="text-gray-600">No badges earned yet.</p>
            </div>
          )}
        </div>
      </div>

      <Button className='bg-blue-500 text-white mt-4 hover:bg-blue-700' onClick={handleEditClick}>Edit Profile</Button>
    </div>
  );
};

export default ProfilePage;
