<script setup lang="ts">
    import GLCanvas from './GLCanvas.vue';
</script>

<template>
    <header class="header">
        <GLCanvas />
        <div class="title-wrapper">
            <h1 class="title">Hi, I’m Kuro!</h1>
            <p class="subtitle">Student / Game developer</p> 
        </div>
    </header>
</template>

<style scoped>
.header {
    width: 100vw;
    height: 100vh;
    color: rgb(255, 50, 255);
    display: flex;
    justify-content: center;
    align-items: center;
}
.title-wrapper {
    mix-blend-mode: difference;
}
.title{
    font-size: 150px;
}
.subtitle {
    font-size: 50px;
}
</style>