<template>
    <div class="learn-header">
        <el-row :gutter="20" justify="space-between">
            <el-col :span="22">Learn Vue</el-col>
            <el-col :span="2">
                <el-switch
                    v-model="theme"
                    :active-action-icon="Sunny"
                    :inactive-action-icon="Moon"
                    active-value="light"
                    inactive-value="dark"
                    @change="toggleTheme"
                />
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import { useTheme } from "../hooks/ThemeHooks.ts";
import { Sunny, Moon } from "@element-plus/icons-vue";

const { theme, toggleTheme } = useTheme();
</script>

<style></style>
