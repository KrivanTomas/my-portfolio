<script setup lang="ts">

//import './../webgl.ts'
import './../wb.ts'

</script>

<template>
    <div class="glcanvas">
        <canvas id="glcanvas"></canvas>
    </div>
</template>

<style scoped>
.glcanvas {
    width: 100%;
    height: 100vh;
    canvas {
        height: 100%;
        width: 100%;
    }
}
</style>