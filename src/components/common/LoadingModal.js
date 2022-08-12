import { ElLoading } from "element-plus";

export default function openLoading() {
    const loading = ElLoading.service({
        lock: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.7)",
    });
    setTimeout(() => {
        loading.close();
    }, 5000);
}