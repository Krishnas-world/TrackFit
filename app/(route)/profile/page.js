"use client";
import React, { useState, useEffect } from 'react';
import Card from './_components/Card';
import { db } from '@/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

const Page = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedData = sessionStorage.getItem("userProfile");
      const user = storedData ? JSON.parse(storedData) : null;
      const email = user?.userData?.email;

      if (email) {
        try {
          const q = query(collection(db, 'users'), where('email', '==', email));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const docId = querySnapshot.docs[0].id;
            setUserId(docId);
            storeUserIdInSession(docId);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    const storeUserIdInSession = (id) => {
      const storedData = sessionStorage.getItem('userProfile');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        parsedData.id = id;
        sessionStorage.setItem('userProfile', JSON.stringify(parsedData));
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className='bg-white p-8 flex flex-row items-center gap-8'>
      <Card
        imageSrc="/bg2.avif"
        title="Profile"
        discountText="Works"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet officia rem vel voluptatum in eum vitae aliquid at sed dignissimos."
        buttonText="Visit Now"
        buttonLink={userId ? `/profile/${userId}` : '#'}  // Use the user ID to generate the link
      />      
      <Card
        imageSrc="/bg3.avif"
        title="Profile"
        discountText="Doesn't work yet"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet officia rem vel voluptatum in eum vitae aliquid at sed dignissimos."
        buttonText="Visit Now"
        buttonLink={userId ? `/profile/${userId}` : '#'}  // Use the user ID to generate the link
      />
      <Card
        imageSrc="/bg1.avif"
        title="Workouts"
        discountText="Doesn't work yet"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet officia rem vel voluptatum in eum vitae aliquid at sed dignissimos."
        buttonText="Explore"
        buttonLink={`/explore`}
      />
    </div>
  );
};

export default Page;
