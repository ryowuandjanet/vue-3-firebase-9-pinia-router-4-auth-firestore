import { defineStore } from "pinia";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig"; // Import Firestore db
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'; // Import Firestore functions
import router from "../router";
import Swal from 'sweetalert2'; // Import SweetAlert2

export const useUserStore = defineStore("userStore", {
    state: () => ({
        userData: null,
        loadingUser: false,
        loadingSession: false,
    }),
    actions: {
        async registerUser(email, password, firstname, lastname) {
            this.loadingUser = true;
            try {
                // Check if the user already exists
                const userExistsQuery = query(collection(db, "userList"), where("email", "==", email));
                const userExistsSnapshot = await getDocs(userExistsQuery);
                if (!userExistsSnapshot.empty) {
                    // User already exists, display a warning message
                    Swal.fire({
                        icon: 'warning',
                        title: '註冊的使用者己存在',
                        text: '此郵箱號碼已被註冊。 請使用不同的電子郵件.',
                    });
                    return;
                }
                // User doesn't exist, proceed with registration
                const { user } = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                // Store user data in Firestore
                await addDoc(collection(db, "userList"), {
                    userId: user.uid,
                    email: email,
                    firstname: firstname,
                    lastname: lastname
                });

                this.userData = { email: email, uid: user.uid };
                router.push("/");
            } catch (error) {
                console.log(error);
            } finally {
                this.loadingUser = false;
            }
        },
        async loginUser(email, password) {
            this.loadingUser = true;
            try {
                const { user } = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                this.userData = { email: user.email, uid: user.uid };
                router.push("/");
            } catch (error) {
                // Handle login failure
                Swal.fire({
                    icon: 'error',
                    title: '登入失敗',
                    text: '錯誤的郵箱帳號或密碼。 請再試一次.',
                });
                console.log(error);
            } finally {
                this.loadingUser = false;
            }
        },
        async logoutUser() {
            try {
                const confirmLogout = await Swal.fire({
                    icon: 'question',
                    title: '確認登出',
                    text: '您確定要登出嗎？',
                    showCancelButton: true,
                    confirmButtonText: '確認',
                    cancelButtonText: '取消',
                    reverseButtons: true
                });

                if (confirmLogout.isConfirmed) {
                    await signOut(auth);
                    this.userData = null;
                    router.push("/login");
                }
            } catch (error) {
                console.log(error);
            }
        },
        async resetPassword(email) {
            try {
                await sendPasswordResetEmail(auth, email);
                console.log("Password reset email sent successfully");
            } catch (error) {
                console.log(error);
            }
        },
        currentUser() {
            return new Promise((resolve, reject) => {
                const unsuscribe = onAuthStateChanged(
                    auth,
                    (user) => {
                        if (user) {
                            this.userData = {
                                email: user.email,
                                uid: user.uid,
                            };
                        } else {
                            this.userData = null;
                        }
                        resolve(user);
                    },
                    (e) => reject(e)
                );
                unsuscribe();
            });
        },
    },
});
