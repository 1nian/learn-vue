<template>
    <div class="draggable-item" draggable="true" @dragstart="onDragStart">
        {{ label }}
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { setLocalStorage } from "@/untils/index";

export default defineComponent({
    name: "Draggable",
    props: {
        label: {},
        value: {},
    },
    methods: {
        onDragStart(event: DragEvent) {
            if (event.dataTransfer) {
                setLocalStorage("cell-data", {
                    label: this.label,
                    value: this.value,
                });
            }
        },
    },
});
</script>

<style scoped>
.draggable-item {
    padding: 10px;
    border: 1px solid #ccc;
    cursor: grab;
}
</style>
