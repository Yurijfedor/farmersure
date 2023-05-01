import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

const auth = getAuth();

export const register = async (userData) => {
  try {
    const { email, password } = userData;
    await createUserWithEmailAndPassword(auth, email, password).then(
      ({ user }) => {
        localStorage.setItem('user', JSON.stringify(user));
      }
    );
    return true;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const logIn = async (userData) => {
  try {
    const { email, password } = userData;
    await signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
      localStorage.setItem('user', JSON.stringify(user));
    });
    return true;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem('user');
    return true;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
