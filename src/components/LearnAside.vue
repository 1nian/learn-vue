<template>
    <div class="learn-aside">
        <RouterLink v-for="item in routes" :key="item.name" :to="item.path">
            {{ item.meta?.title }}
        </RouterLink>
    </div>
</template>

<script setup lang="ts">
import { routes } from "../router";
</script>

<style scoped lang="scss"></style>
