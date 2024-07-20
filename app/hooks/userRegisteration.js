// hooks/useUserRegistration.js
import { useState, useEffect } from 'react';
import { db } from '@/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

const useUserRegistration = (email) => {
  const [isRegistered, setIsRegistered] = useState(null);

  useEffect(() => {
    const checkRegistration = async () => {
      if (email) {
        try {
          const q = query(collection(db, 'users'), where('email', '==', email));
          const querySnapshot = await getDocs(q);
          setIsRegistered(!querySnapshot.empty);
        } catch (error) {
          console.error('Error checking registration status:', error);
        }
      }
    };

    checkRegistration();
  }, [email]);

  return isRegistered;
};

export default useUserRegistration;
