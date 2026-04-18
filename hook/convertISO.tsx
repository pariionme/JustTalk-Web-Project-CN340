import { Timestamp } from "firebase/firestore";

export function convertISO(obj: Timestamp) {
  return obj.toDate().toISOString()
}
