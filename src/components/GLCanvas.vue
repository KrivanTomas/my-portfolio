<script setup lang="ts">

//import './../webgl.ts'
import './../wb.ts'

</script>

<template>
    <canvas id="glcanvas"></canvas>
</template>

<style scoped>
#glcanvas {
    z-index: -1;
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
}
</style>