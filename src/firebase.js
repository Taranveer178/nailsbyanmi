import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyDiPLmHIadVBlHA33WsGavpzTVFUnOVlHY',
  authDomain: 'glam-by-anmi.firebaseapp.com',
  projectId: 'glam-by-anmi',
  storageBucket: 'glam-by-anmi.firebasestorage.app',
  messagingSenderId: '159230072988',
  appId: '1:159230072988:web:a5df01c6b8ab774341b559',
  measurementId: 'G-61C4XR2F47',
}

export const app = initializeApp(firebaseConfig)
export const getFirebaseAuth = async () => {
  const { getAuth } = await import('firebase/auth')
  return getAuth(app)
}
export const getFirebaseDatabase = async () => {
  const { getFirestore } = await import('firebase/firestore')
  return getFirestore(app)
}
export const analytics = import('firebase/analytics').then(
  async ({ getAnalytics, isSupported }) =>
    (await isSupported()) ? getAnalytics(app) : null,
)