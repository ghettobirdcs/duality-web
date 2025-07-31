import { useCallback, useState } from "react";
import { db, storage } from "../firebase/init";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { toast } from "react-toastify";

const useSetups = (mapName, selectedSide, selectedType) => {
  const [fetchedSetups, setFetchedSetups] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSetups = useCallback(async () => {
    setLoading(true);
    try {
      const setupsRef = collection(db, "setups");
      let q;

      if (selectedType === "all") {
        q = query(
          setupsRef,
          where("map", "==", mapName),
          where("side", "==", selectedSide),
        );
      } else {
        q = query(
          setupsRef,
          where("map", "==", mapName),
          where("side", "==", selectedSide),
          where("type", "==", selectedType),
        );
      }

      const { docs } = await getDocs(q);
      setFetchedSetups(docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (e) {
      toast.error("Failed to fetch setups");
    } finally {
      setLoading(false);
    }
  }, [mapName, selectedSide, selectedType]);

  const saveSetup = async (setup, user, selectedSetupId, onSaveId) => {
    if (!user) return;

    try {
      if (selectedSetupId) {
        const docRef = doc(db, "setups", selectedSetupId);
        await setDoc(docRef, setup);
      } else {
        const docRef = await addDoc(collection(db, "setups"), setup);
        onSaveId(docRef.id);
      }
      toast("Setup saved successfully");
    } catch (e) {
      toast.error("Failed to save setup");
    }
  };

  const deleteSetup = async (selectedSetupId) => {
    if (!selectedSetupId) return;

    const setupRef = doc(db, "setups", selectedSetupId);
    const filePaths = ["early.jpg", "mid.jpg", "late.jpg"].map(
      (time) => `setups/${selectedSetupId}/${time}`,
    );

    try {
      await Promise.all(
        filePaths.map(async (path) => {
          try {
            await deleteObject(ref(storage, path));
          } catch (e) {
            if (e.code !== "storage/object-not-found") throw e;
          }
        }),
      );

      await deleteDoc(setupRef);
      toast.success("Setup deleted");
    } catch (e) {
      toast.error("Failed to delete setup");
    }
  };

  return {
    fetchedSetups,
    loading,
    fetchSetups,
    saveSetup,
    deleteSetup,
  };
};

export default useSetups;
