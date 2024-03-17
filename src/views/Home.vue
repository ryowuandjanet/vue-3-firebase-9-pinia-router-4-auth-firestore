<template>
    <div class="container">
      <div class="row justify-content-center mt-5">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h1 class="card-title">Home</h1>
              <p class="card-text">User Email: {{ userStore.userData?.email }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  

<script setup>
import {useUserStore} from '../stores/user'
const userStore = useUserStore()
</script>