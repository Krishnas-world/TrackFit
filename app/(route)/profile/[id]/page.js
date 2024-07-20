"use client";
import { useState, useEffect } from 'react';
import { db } from '@/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
import { useParams } from 'next/navigation';

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>No profile found.</div>;
  }

  return (
    <div className="p-8">
      <div className="bg-card border-[1px] text-card-foreground rounded-lg w-auto mx-auto p-6 m-4">
        <div className="flex items-center space-x-4">
          <Image src={profile.picture || '/default-profile.png'} alt="Profile photo" width={100} height={100} className="rounded-full border border-muted" />
          <div>
            <h2 className="text-xl font-bold">{profile.name}</h2>
            <p className="text-sm text-muted-foreground">{profile.email}</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold">Profile Details</h3>
          <p><strong>Date of Birth:</strong> {profile.dob}</p>
          <p><strong>Gender:</strong> {profile.gender}</p>
          <p><strong>Height:</strong> {profile.height} cm</p>
          <p><strong>Weight:</strong> {profile.weight} kg</p>
          <p><strong>Fitness Goal:</strong> {profile.goal}</p>
          <p><strong>Phone Number:</strong> {profile.phone || 'Not provided'}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
