"use client";
import React, { useState, useEffect } from 'react';
import Card from './_components/Card';

const Page = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Retrieve user ID from session storage on the client side
    const storedData = sessionStorage.getItem("userProfile");
    const user = storedData ? JSON.parse(storedData) : null;
    setUserId(user?.id || null);
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
        discountText="Doesnt work yet"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet officia rem vel voluptatum in eum vitae aliquid at sed dignissimos."
        buttonText="Visit Now"
        buttonLink={userId ? `/profile/${userId}` : '#'}  // Use the user ID to generate the link
      />
    
      <Card
        imageSrc="/bg1.avif"
        title="Workouts"
        discountText="Doesnt work yet"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet officia rem vel voluptatum in eum vitae aliquid at sed dignissimos."
        buttonText="Explore"
        buttonLink={`/explore`}
      />
    </div>
  );
};

export default Page;
