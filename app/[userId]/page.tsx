
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { db } from "../Shared/firebaseConfig";
import UserInfo from "../components/UserInfo";
import PinsList from "../components/Pins/PinsList";

import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

function Profile() {
  const params = useParams();
  const userId = params.userId as string;

  const [userInfo, setUserInfo] = useState<any>(null);
  const [listOfPins, setListOfPins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch user information
  useEffect(() => {
    if (!userId) return;

    const getUserInfo = async () => {
      try {
        setLoading(true);

        const email = decodeURIComponent(userId);

        const docRef = doc(db, "user", email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserInfo(docSnap.data());
        } else {
          console.log("No such document!");
          setUserInfo(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    getUserInfo();
  }, [userId]);

  // Fetch user's pins
  useEffect(() => {
    if (!userInfo?.email) return;

    const getUserPins = async () => {
      try {
        const q = query(
          collection(db, "pinterest-post"),
          where("email", "==", userInfo.email)
        );

        const querySnapshot = await getDocs(q);

        const pins = querySnapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));
        setListOfPins(pins);
      } catch (error) {
        console.error("Error fetching pins:", error);
      } finally {
        setLoading(false);
      }
    };

    getUserPins();
  }, [userInfo]);

  if (loading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div>
      {userInfo ? (
        <div>
          <UserInfo userInfo={userInfo} />
          <PinsList listOfPins={listOfPins} />
        </div>
      ) : (
        <div>User not found.</div>
      )}
    </div>
  );
}

export default Profile;
