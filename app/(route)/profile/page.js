import React from 'react';
import Card from './_components/Card';

const Page = () => {
  return (
    <div className='bg-white p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
      <Card
        imageSrc="https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        discountText="Save 10%"
        title="Profile"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet officia rem vel voluptatum in eum vitae aliquid at sed dignissimos."
        buttonText="Learn More"
        buttonLink=''
      />
      <Card
        imageSrc="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        discountText="Save 15%"
        title="Rose Petal"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet officia rem vel voluptatum in eum vitae aliquid at sed dignissimos."
        buttonText="Discover"
        buttonLink="#"
      />
      <Card
        imageSrc="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        discountText="Save 20%"
        title="Lavender"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet officia rem vel voluptatum in eum vitae aliquid at sed dignissimos."
        buttonText="Explore"
        buttonLink="#"
      />
    </div>
  );
};

export default Page;
