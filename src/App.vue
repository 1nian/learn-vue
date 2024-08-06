<script setup lang="ts">
import LearnHeader from "./components/LearnHeader.vue";
import LearnAside from "./components/LearnAside.vue";
</script>

<template>
    <div class="learn-layout">
        <el-container>
            <el-header>
                <learn-header />
            </el-header>
            <el-container>
                <el-aside width="200px"><learn-aside /></el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped></style>
