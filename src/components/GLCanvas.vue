<script setup lang="ts">

//import './../webgl.ts'
import './../wb.ts'

</script>

<template>
    <canvas id="glcanvas"></canvas>
</template>

<style scoped>
#glcanvas {
    position: absolute;
    z-index: -1;
    width: 100%;
    left: 0px;
    top:0px;
    height: 100%;
}
</style>