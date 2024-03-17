<template>
    <div class="container">
      <div class="row justify-content-center mt-5">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h1 class="card-title mb-4">Register</h1>
              <form @submit.prevent="handleSubmit">
                <div class="mb-3">
                  <label for="inputFirstName" class="form-label">First Name</label>
                  <input type="text" class="form-control" id="inputFirstName" placeholder="Enter first name" v-model.trim="firstName">
                </div>
                <div class="mb-3">
                  <label for="inputLastName" class="form-label">Last Name</label>
                  <input type="text" class="form-control" id="inputLastName" placeholder="Enter last name" v-model.trim="lastName">
                </div>
                <div class="mb-3">
                  <label for="inputEmail" class="form-label">Email</label>
                  <input type="email" class="form-control" id="inputEmail" placeholder="Enter email" v-model.trim="email">
                </div>
                <div class="mb-3">
                  <label for="inputPassword" class="form-label">Password</label>
                  <input type="password" class="form-control" id="inputPassword" placeholder="Enter password" v-model.trim="password">
                </div>
                <button type="submit" class="btn btn-primary" :disabled="userStore.loadingUser">Create User</button>
              </form>
              <!-- Button to navigate to Register.vue -->
            <router-link to="/login" class="btn btn-link">Login</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useUserStore } from '../stores/user';
  
  const userStore = useUserStore();
  
  const email = ref('bluuweb1@test.com');
  const password = ref('123123');
  const firstName = ref('');
  const lastName = ref('');
  
  const handleSubmit = async () => {
    if (!email.value || !firstName.value || !lastName.value || password.value.length < 6) {
      return alert('Please fill in all the fields correctly');
    }
    await userStore.registerUser(email.value, password.value, firstName.value, lastName.value);
  };
  </script>
  