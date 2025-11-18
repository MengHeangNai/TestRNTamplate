import { collection, FirebaseFirestoreTypes, getFirestore } from '@react-native-firebase/firestore'
import { getAuth } from '@react-native-firebase/auth'
import { getApp } from '@react-native-firebase/app'

const app = getApp()
const db = getFirestore(app)
const auth = getAuth(app)
db.settings({ ignoreUndefinedProperties: true, persistence: true })

export type FireDocsType = FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>
export type FireQueryType = FirebaseFirestoreTypes.Query<FirebaseFirestoreTypes.DocumentData>

export function batchRef() {
  return db.batch()
}

export function baseQueryRef(collectionName: string) {
  return collection(db, collectionName)
}

export function usersRef() {
  return db.collection('users')
}

export function authRef() {
  return auth
}
