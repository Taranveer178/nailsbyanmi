const firebaseConfig = {
  apiKey: 'AIzaSyDiPLmHIadVBlHA33WsGavpzTVFUnOVlHY',
  authDomain: 'glam-by-anmi.firebaseapp.com',
  projectId: 'glam-by-anmi',
  storageBucket: 'glam-by-anmi.firebasestorage.app',
  messagingSenderId: '159230072988',
  appId: '1:159230072988:web:a5df01c6b8ab774341b559',
}

let firebaseAppPromise
let firebaseDatabasePromise

export const getFirebaseApp = async () => {
  if (!firebaseAppPromise) {
    firebaseAppPromise = import('firebase/app').then(({ initializeApp }) =>
      initializeApp(firebaseConfig)
    )
  }
  return firebaseAppPromise
}

export const getFirebaseAuth = async () => {
  const [app, { getAuth }] = await Promise.all([getFirebaseApp(), import('firebase/auth')])
  return getAuth(app)
}

export const getFirebaseDatabase = () => {
  if (!firebaseDatabasePromise) {
    firebaseDatabasePromise = Promise.all([
      getFirebaseApp(),
      import('firebase/firestore'),
    ])
      .then(([app, { initializeFirestore }]) =>
        initializeFirestore(app, { experimentalForceLongPolling: true })
      )
      .catch((error) => {
        firebaseDatabasePromise = undefined
        throw error
      })
  }
  return firebaseDatabasePromise
}