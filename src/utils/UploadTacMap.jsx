import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase/init";

export async function uploadImage(setupId, file, selectedRoundTime) {
  if (!file) throw new Error("No file provided");

  const path = `setups/${setupId}/${selectedRoundTime}.jpg`;
  const fileRef = ref(storage, path);

  await uploadBytes(fileRef, file);

  const downloadURL = await getDownloadURL(fileRef);

  const setupRef = doc(db, "setups", setupId);
  await updateDoc(setupRef, {
    [`${selectedRoundTime}.tacmap`]: downloadURL,
  });

  return downloadURL;
}
