import toast from "react-hot-toast";
import { instance } from "../../../api/instance";

export async function useDownloadExpensesCsv() {
	try {
		const response = await instance.get("/dashboard/spreadsheet/csv/export", {
			responseType: "blob",
		});

		const contentDisposition = response.headers["content-disposition"];
		let filename = "despesas.csv";

		if (contentDisposition) {
			const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
			if (filenameMatch?.[1]) {
				filename = filenameMatch[1];
			}
		}

		const timestamp = new Date().toISOString().split("T")[0];
		filename = `despesas_${timestamp}.csv`;

		const blob = new Blob([response.data], { type: "text/csv;charset=utf-8;" });
		const url = window.URL.createObjectURL(blob);

		const a = document.createElement("a");
		a.style.display = "none";
		a.href = url;
		a.download = filename;

		document.body.appendChild(a);
		a.click();

		document.body.removeChild(a);
		window.URL.revokeObjectURL(url);

		toast.success("Backup exportado com sucesso");
		return { success: true, filename };
	} catch (error) {
		toast.error("Erro ao exportar backup");
		throw error;
	}
}
