<template>
    <div class="excel">
        <div class="excel-title">
            <Draggable
                v-for="item in draggableList"
                :key="item.value"
                v-bind="item"
            />

            <el-button @click="exprotExcel">导出</el-button>
        </div>
        <!-- 表格 -->
        <UniverSheet
            @drop="onDrop"
            @dragover="onDragOver"
            ref="univerRef"
            :data="data"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Draggable from "@/components/Draggable.vue";
import UniverSheet from "@/components/UniverSheet.vue";
import { sheetList, draggableList } from "./data";
import { exportToExcel } from "@/untils/exportExcel";

const univerRef = ref();
const data = ref(sheetList);

// 拖放事件处理
const onDragOver = (event: DragEvent) => {
    event.preventDefault();
};

const onDrop = async (event: DragEvent) => {
    event.preventDefault();
};

const exprotExcel = async () => {
    const jsonData = univerRef.value?.getData();
    const sheetsID = jsonData.sheetOrder[0];
    const sheetData = jsonData.sheets[sheetsID];
    await exportToExcel(
        univerRef.value?.getData(),
        `${sheetData.name}-${new Date().getTime()}.xlsx`
    );
};
// function exportFile(res, name) {
//     let disposition = [];
//     let fileName = "";
//     if (!name) {
//         disposition = res.headers["content-disposition"].split(";")[1];
//         fileName = decodeURI(disposition.split("=")[1]).replace(/[\\"']/g, "");
//     }
//     const blob = new Blob([res.data], { type: res.data.type });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.setAttribute("href", url);
//     a.setAttribute("download", name || fileName);
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(blob);
// }
</script>

<style scoped>
.excel {
    position: relative;
}
.excel-title {
    width: 100%;
    height: 40px;
    background-color: #ddd;
    display: flex;
}
#univer {
    width: 100%;
    height: calc(100vh - 160px);
}
.univer-cell {
    cursor: pointer;
    border: 1px solid #ddd;
    padding: 5px;
    text-align: center;
}
#el {
    position: absolute;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid #ccc;
    padding: 5px;
    border-radius: 4px;
}
</style>
