<template>
    <div ref="container" class="univer-container" />
</template>

<script setup lang="ts">
import "@univerjs/design/lib/index.css";
import "@univerjs/ui/lib/index.css";
import "@univerjs/docs-ui/lib/index.css";
import "@univerjs/sheets-ui/lib/index.css";
import "@univerjs/sheets-formula/lib/index.css";
import "@univerjs-pro/sheets-exchange-client/lib/index.css";
import {
    LocaleType,
    Tools,
    Univer,
    UniverInstanceType,
    IWorkbookData,
    Workbook,
} from "@univerjs/core";
import { defaultTheme } from "@univerjs/design";

import { UniverFormulaEnginePlugin } from "@univerjs/engine-formula";
import { UniverRenderEnginePlugin } from "@univerjs/engine-render";

import { UniverUIPlugin } from "@univerjs/ui";

import { UniverDocsPlugin } from "@univerjs/docs";
import { UniverDocsUIPlugin } from "@univerjs/docs-ui";

import { UniverSheetsPlugin } from "@univerjs/sheets";
import { UniverSheetsFormulaPlugin } from "@univerjs/sheets-formula";
import { UniverSheetsUIPlugin } from "@univerjs/sheets-ui";

import DesignZhCN from "@univerjs/design/locale/zh-CN";
import UIZhCN from "@univerjs/ui/locale/zh-CN";
import DocsUIZhCN from "@univerjs/docs-ui/locale/zh-CN";
import SheetsZhCN from "@univerjs/sheets/locale/zh-CN";
import SheetsUIZhCN from "@univerjs/sheets-ui/locale/zh-CN";

import { FUniver } from "@univerjs-pro/facade";
import { onBeforeUnmount, onMounted, ref, toRaw } from "vue";

const { data } = defineProps({
    // workbook data
    data: {
        type: Object,
        default: () => ({}),
    },
});

const univerRef = ref<Univer | null>(null);
const workbook = ref<Workbook | null>(null);
const container = ref<HTMLElement | null>(null);

onMounted(() => {
    init(data);
});

onBeforeUnmount(() => {
    destroyUniver();
});

const init = (data = {}) => {
    const univer = new Univer({
        theme: defaultTheme,
        locale: LocaleType.ZH_CN,
        locales: {
            [LocaleType.ZH_CN]: Tools.deepMerge(
                SheetsZhCN,
                DocsUIZhCN,
                SheetsUIZhCN,
                UIZhCN,
                DesignZhCN
            ),
        },
    });
    univerRef.value = univer;

    // core plugins
    univer.registerPlugin(UniverRenderEnginePlugin);
    univer.registerPlugin(UniverFormulaEnginePlugin);
    univer.registerPlugin(UniverUIPlugin, {
        container: container.value!,
        footer: false,
    });

    // doc plugins
    univer.registerPlugin(UniverDocsPlugin, {
        hasScroll: false,
    });
    univer.registerPlugin(UniverDocsUIPlugin);

    // sheet plugins
    univer.registerPlugin(UniverSheetsPlugin);
    univer.registerPlugin(UniverSheetsUIPlugin);
    univer.registerPlugin(UniverSheetsFormulaPlugin);

    // create workbook instance
    workbook.value = univer.createUnit<IWorkbookData, Workbook>(
        UniverInstanceType.UNIVER_SHEET,
        data
    );

    const univerAPI = FUniver.newAPI(univer);
    univerAPI.getSheetHooks().onCellDrop((cell) => {
        const data = JSON.parse(
            localStorage.getItem("cell-data") || ""
        )?.cellData;
        const activeSheet = univerAPI?.getActiveWorkbook()?.getActiveSheet();
        const range = activeSheet?.getRange(
            cell?.location.row as number,
            cell?.location.col as number
        );
        if (!range) {
            console.error("Range not found");
            return;
        }
        range.setValue({
            v: data.label,
            custom: { key: data.value },
        });
    });
};

/**
 * Destroy univer instance and workbook instance
 */
const destroyUniver = () => {
    toRaw(univerRef.value)?.dispose();
    univerRef.value = null;
    workbook.value = null;
};

/**
 * Get workbook data
 */
const getData = () => {
    if (!workbook.value) {
        throw new Error("Workbook is not initialized");
    }
    return workbook.value.save();
};

defineExpose({
    getData,
    destroyUniver,
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.univer-container {
    width: 100%;
    height: calc(100vh - 160px);
    overflow: hidden;
}

/* Also hide the menubar */
:global(.univer-menubar) {
    display: none;
}
</style>
