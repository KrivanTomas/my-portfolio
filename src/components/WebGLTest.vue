<script setup lang="ts">

import './../webgl.ts'


</script>

<template>
    <div class="hero-canvas">
        <canvas id="hero-canvas"></canvas>
    </div>
</template>

<style scoped>
.hero-canvas {
    width: 100%;
    height: 100vh;
    canvas {
        height: 100%;
        width: 100%;
    }
}
</style>