<script setup lang="ts">
import LearnHeader from "./components/LearnHeader.vue";
import LearnAside from "./components/LearnAside.vue";
import { routes1 } from "./router/routes";
import { useAddRoute } from "./hooks/route.hooks";

const { addRoutes } = useAddRoute();
addRoutes(routes1);
</script>

<template>
    <div class="learn-layout">
        <el-container>
            <el-header>
                <learn-header />
            </el-header>
            <el-container>
                <el-aside width="200px"
                    ><learn-aside
                        :aside-list="Array.from($router.options.routes)"
                /></el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped></style>
