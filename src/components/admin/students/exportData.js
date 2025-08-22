import jsPDF from "jspdf";
import "jspdf-autotable";

export const exportToPDF = (data, fileName) => {
    const doc = new jsPDF();

    const columns = ["Full Name", "Phone", "Status", "Qualification", "District"];
    const rows = data.map((item) => [
        item.fullName,
        item.phone,
        item.status,
        item.highestQualification,
        item.district || "-",
    ]);

    doc.setFontSize(14);
    doc.text("Students Data", 14, 15);

    doc.autoTable({
        head: [columns],
        body: rows,
        startY: 20,
        styles: { fontSize: 10 },
        theme: "grid",
    });

    doc.save(`${fileName}.pdf`);
};
