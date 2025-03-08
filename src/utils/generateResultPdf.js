import jsPDF from "jspdf";
import { applyPlugin } from "jspdf-autotable";
import moment from "moment";
applyPlugin(jsPDF)

const generatePDF = (studentData, attempt) => {

    const doc = new jsPDF();

    // Title
    doc.text(`Student Test Results`, 105, 15, { align: "center" });

    // Student Info
    doc.text(`${studentData.student.fullName}:- ${studentData.result[attempt].stream}`, 20, 30);
    doc.text(`Test Date: ${moment(studentData.result[attempt].createdAt).format('DD/MM/YYYY')}`, 130, 30);

    // Table Data
    const tableColumn = ["Question", "Answer Options"];
    const tableRows = studentData.result[attempt].result.map(answer => {
        const allAnswers = answer.questionId.answers
            .map(ans => ans.id === answer.answerId ? `A- ${ans.answer} -(${ans.stream})` : `X- ${ans.answer} -(${ans.stream})`) // Highlight selected answer
            .join("\n"); // Line break for better formatting

        return [
            answer.questionId.question,
            allAnswers
        ];
    });

    // Add Table with Styling
    doc.autoTable({
        startY: 40,
        head: [tableColumn],
        body: tableRows,
        styles: {
            fontSize: 10,
            cellPadding: 5,
            valign: "middle"
        },
        headStyles: {
            fillColor: [0, 102, 204],
            textColor: [255, 255, 255],
            fontStyle: "bold"
        },
        alternateRowStyles: {
            fillColor: [240, 240, 240] // Light grey alternate rows
        },
        columnStyles: {
            2: { textColor: [0, 128, 0], fontStyle: 'bold' }, // Selected answer in green
            3: { textColor: [0, 0, 255], fontStyle: 'italic' } // Answer stream in blue italic
        }
    });


    doc.text(`Generated on ${new Date().toLocaleString()}`, 10, doc.internal.pageSize.height - 10);

    // Download the PDF
    doc.save(`Student_Result_${studentData.student.fullName.replace(' ', '_')}.pdf`);
};

export default generatePDF;
