<script setup lang="ts">
    import GLCanvas from './GLCanvas.vue';
</script>

<template>
    <header class="header" id="header">
        <GLCanvas />
        <div class="title-wrapper">
            <h1 class="title">Hi, I’m Kuro!</h1>
            <p class="subtitle">Student / Game developer</p> 
        </div>
    </header>
</template>

<style scoped>
.header {
    position: relative;
    width: 100%;
    height: 100vh;
    color: var(--ku-accent);
    display: flex;
    justify-content: center;
    align-items: center;
}
.title-wrapper {
    mix-blend-mode: difference;
}
.title{
    font-size: 2em;
}
.subtitle {
    font-size: .5em;
}
</style>