<script setup lang="ts">
import { onUnmounted, reactive } from 'vue'

// global state, created in module scope
const state = reactive({
    isReady: false
})

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    state.isReady = true;
}


document.addEventListener('deviceready', onDeviceReady, false);

onUnmounted(() => {
    document.removeEventListener('deviceready', onDeviceReady)
})

</script>

<template>
    <div class="blink" :class="{ ready: state.isReady }">
        <p class="event listening">Connecting to Device</p>
        <p class="event received">Device is Ready</p>
    </div>
</template>
<style scoped lang="scss">
.event {
    border-radius: 4px;
    color: #FFFFFF;
    font-size: 12px;
    margin: 0px 30px;
    padding: 2px 0px;
}

.event.listening {
    background-color: #333333;
    display: block;
}

.event.received {
    background-color: #4B946A;
    display: none;
}

.ready .event.listening {
    display: none;
}

.ready .event.received {
    display: block;
}

@keyframes fade {
    from {
        opacity: 1.0;
    }

    50% {
        opacity: 0.4;
    }

    to {
        opacity: 1.0;
    }
}

.blink {
    animation: fade 3000ms infinite;
    -webkit-animation: fade 3000ms infinite;
}



</style>