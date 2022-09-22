<script setup lang="ts">
import usePostStore from '../stores/post.js';
import { storeToRefs } from 'pinia'


const post_store = usePostStore();
const { posts, loading, error, getPostsPerAuthor } = storeToRefs(post_store)
function fetchPosts(){
    post_store.fetchPosts()
}

</script>
    

    
<template>
    <h1>Test Page!</h1>
    
    <button @click="fetchPosts" v-if="!loading">Test pinia!</button>
    <div v-if="posts">{{ JSON.stringify(posts) }}</div>
    <router-link to="/">Go Home!</router-link>

</template>
    