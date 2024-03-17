<script setup>
import { ref } from "vue"
import { useUserStore } from "../stores/user"

const userStore = useUserStore()

const email = ref("ryowu0329@gmail.com")
const password = ref("leo140814")

const handleSubmit = async () => {
  if (!email.value || password.value.length < 6) {
    return alert("Please fill in the fields correctly")
  }
  await userStore.loginUser(email.value, password.value)
}

const handleForgotPassword = async () => {
  if (!email.value) {
    return alert("Please enter your email to reset the password")
  }
  await userStore.resetPassword(email.value)
  alert("Password reset email sent. Please check your inbox.")
}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h1 class="card-title mb-4">Login</h1>
            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label for="inputEmail" class="form-label">Email</label>
                <input type="email" class="form-control" id="inputEmail" placeholder="Enter email" v-model.trim="email">
              </div>
              <div class="mb-3">
                <label for="inputPassword" class="form-label">Password</label>
                <input type="password" class="form-control" id="inputPassword" placeholder="Enter password" v-model.trim="password">
              </div>
              <!-- Display "Loading..." when userStore.loadingUser is true -->
              <button type="submit" class="btn btn-primary" :disabled="userStore.loadingUser">
                <span v-if="userStore.loadingUser">Loading...</span>
                <span v-else>Login</span>
              </button>
            </form>
            <p class="mt-3">
              <a href="#" @click="handleForgotPassword">Forgot Password?</a>
            </p>
            <!-- Button to navigate to Register.vue -->
            <router-link to="/register" class="btn btn-link">Register</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

