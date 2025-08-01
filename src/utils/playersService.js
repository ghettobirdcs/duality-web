import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/init";

// Update the role of a specific player
export async function updatePlayerRole(playerId, newRole) {
  const ref = doc(db, "players", playerId);
  await updateDoc(ref, { role: newRole });
}

// Update the status of the current user
export async function updatePlayerStatus(playerId, status) {
  const ref = doc(db, "players", playerId);
  await updateDoc(ref, { status });
}
