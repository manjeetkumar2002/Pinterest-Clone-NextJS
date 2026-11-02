"use client"

import { collection, getDocs, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import PinList from './components/Pins/PinsList';
import { db } from './Shared/firebaseConfig';

export default function Home() {

  const [listOfPins, setListOfPins] = useState([]);

  useEffect(() => {
    getAllPins();
  }, []);

  const getAllPins = async () => {
    try {
      const q = query(collection(db, 'pinterest-post'));

      const querySnapshot = await getDocs(q);

      const pins = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setListOfPins(pins);

    } catch (error) {
      console.error("Error fetching pins:", error);
    }
  };

  return (
    <div className='p-3'>
      <PinList listOfPins={listOfPins} />
    </div>
  );
}