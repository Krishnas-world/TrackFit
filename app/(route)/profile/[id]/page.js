"use client";
import { useState, useEffect } from 'react';
import { db } from '@/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Content from '../_components/Content';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Get the `id` from the URL using useParams

  useEffect(() => {
    const fetchProfile = async () => {
      if (id) {
        try {
          const docRef = doc(db, 'users', id);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            setProfile(docSnap.data());
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

  const router = useRouter();

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
    <div className="p-8">
      <div className="bg-white border-[1px] text-gray-900 rounded-xl shadow-lg w-full md:max-w-2xl mx-auto p-6 m-4">
        <div className="flex items-center space-x-4">
          <Image src={profile.picture || '/default-profile.png'} alt="Profile photo" width={100} height={100} className="rounded-full border border-gray-300" />
          <div>
            <h2 className="text-xl font-bold">{profile.name}</h2>
            <p className="text-sm text-gray-600">{profile.email}</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-indigo-500">Profile Details</h3>
          <p className="mt-2 text-gray-600"><strong>Date of Birth:</strong> {profile.dob}</p>
          <p className="mt-2 text-gray-600"><strong>Gender:</strong> {profile.gender}</p>
          <p className="mt-2 text-gray-600"><strong>Height:</strong> {profile.height} cm</p>
          <p className="mt-2 text-gray-600"><strong>Weight:</strong> {profile.weight} kg</p>
          <p className="mt-2 text-gray-600"><strong>Fitness Goal:</strong> {profile.goal}</p>
          <p className="mt-2 text-gray-600"><strong>Phone Number:</strong> {profile.phone || 'Not provided'}</p>
        </div>
        <Button className='bg-indigo-500 text-white mt-4 hover:bg-indigo-700' onClick={handleEditClick}>Edit Profile</Button>
      </div>
      <div>
        <Content/>
      </div>
    </div>
  );
};

export default ProfilePage;
