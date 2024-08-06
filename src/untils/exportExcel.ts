import * as XLSX from "xlsx";

export async function exportToExcel(
    jsonData: any,
    fileName: string = "output.xlsx"
) {
    const sheetsID = jsonData.sheetOrder[0];
    const sheetData = jsonData.sheets[sheetsID];

    // 创建一个工作簿
    const wb = XLSX.utils.book_new();

    // 创建一个工作表
    const ws = XLSX.utils.aoa_to_sheet([]);

    // 设置列标题
    const header: unknown[] = [];
    Object.keys(sheetData.cellData["0"]).forEach((columnIndex) => {
        header.push(sheetData.cellData["0"][columnIndex].v);
    });
    XLSX.utils.sheet_add_aoa(ws, [header], { origin: "A1" });

    // 填充数据行
    for (let rowIndex = 1; rowIndex <= sheetData.rowCount; rowIndex++) {
        if (!sheetData.cellData[rowIndex]) continue;
        const row: unknown[] = [];
        Object.keys(sheetData.cellData[rowIndex]).forEach((columnIndex) => {
            row.push(sheetData.cellData[rowIndex][columnIndex].v);
        });
        XLSX.utils.sheet_add_aoa(ws, [row], { origin: `A${rowIndex + 1}` });
    }

    // 将工作表添加到工作簿
    XLSX.utils.book_append_sheet(wb, ws, sheetData.name);

    // 将工作簿写入文件并下载
    XLSX.writeFile(wb, fileName);
}
