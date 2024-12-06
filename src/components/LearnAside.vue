<template>
    <div class="learn-aside">
        <RouterLink v-for="item in asideList" :key="item.name" :to="item.path">
            {{ item.meta?.title }}
            <template v-if="item.children && item.children.length">
                <learn-aside :aside-list="item.children" />
            </template>
        </RouterLink>
    </div>
</template>

<script setup lang="ts">
import { RouteRecordRaw } from "vue-router";
defineProps({
    asideList: {
        type: Array as () => RouteRecordRaw[],
    },
});
</script>

<style scoped lang="scss"></style>
