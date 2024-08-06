<script setup lang="ts">
import { ref } from "vue";
interface Props {
    msg: string;
}

const props = withDefaults(defineProps<Props>(), {
    msg: "xxx",
});

const count = ref(0);
const emit = defineEmits<{
    "update:count": [void];
}>();
</script>

<template>
    <h1>{{ props.msg }}</h1>

    <div class="card">
        <button type="button" @click="emit('update:count')">
            count is {{ count }}
        </button>
        <p>
            Edit
            <code>components/HelloWorld.vue</code> to test HMR
        </p>
    </div>

    <p>
        Check out
        <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
            >create-vue</a
        >, the official Vue + Vite starter
    </p>
    <p>
        Learn more about IDE Support for Vue in the
        <a
            href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
            target="_blank"
            >Vue Docs Scaling up Guide</a
        >.
    </p>
    <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped></style>
