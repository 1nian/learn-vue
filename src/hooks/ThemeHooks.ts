/**
 * css文件
 * html[data-theme='dark'] {
    --text-color: green
    }
    :root{
        --text-color:red
    }
 *  vue 文件 style 标签
    color: var(--text-color)
 */
import { ref, watch } from "vue";
type Theme = "light" | "dark";
const themeKey = "__theme_key";

export const useTheme = () => {
    let storage = localStorage.getItem(themeKey) as Theme;
    const theme = ref<Theme>(storage || "light");

    const toggleTheme = (val: Theme): void => {
        theme.value = val;
        localStorage.setItem(themeKey, theme.value);
    };

    watch(
        theme,
        (val) => {
            document.documentElement.dataset.theme = val;
        },
        {
            immediate: true,
        }
    );

    return {
        theme,
        toggleTheme,
    };
};
