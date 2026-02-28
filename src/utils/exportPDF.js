/**
 * Shared PDF export utility using html2canvas-pro + jsPDF.
 * html2canvas-pro supports modern CSS including oklch().
 *
 * @param {HTMLElement} element - The DOM element to capture.
 * @param {string} filename - Output PDF file name.
 * @param {'portrait'|'landscape'} orientation - PDF orientation.
 */
export const exportElementToPDF = async (element, filename = 'document.pdf', orientation = 'landscape') => {
    const { jsPDF } = await import('jspdf');
    const { default: html2canvas } = await import('html2canvas-pro');

    if (!element) return;

    // Hide no-print elements before capture
    const noPrintEls = element.querySelectorAll('.no-print');
    noPrintEls.forEach(el => el.style.display = 'none');

    try {
        const pdf = new jsPDF({ orientation, unit: 'mm', format: 'letter' });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
        });

        const imgData = canvas.toDataURL('image/png');
        const imgWidth = pdfWidth - 20;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        if (imgHeight <= pdfHeight - 20) {
            pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        } else {
            const pageContentHeight = pdfHeight - 20;
            let remainingHeight = imgHeight;
            let canvasY = 0;
            let yPos = 10;
            while (remainingHeight > 0) {
                const sliceHeight = Math.min(remainingHeight, pageContentHeight);
                const sliceCanvas = document.createElement('canvas');
                const scaleRatio = canvas.width / imgWidth;
                sliceCanvas.width = canvas.width;
                sliceCanvas.height = sliceHeight * scaleRatio;
                const ctx = sliceCanvas.getContext('2d');
                ctx.drawImage(canvas, 0, canvasY * scaleRatio, canvas.width, sliceCanvas.height,
                    0, 0, sliceCanvas.width, sliceCanvas.height);
                pdf.addImage(sliceCanvas.toDataURL('image/png'), 'PNG', 10, yPos, imgWidth, sliceHeight);
                remainingHeight -= pageContentHeight;
                canvasY += pageContentHeight;
                if (remainingHeight > 0) pdf.addPage();
            }
        }

        pdf.save(filename);
    } finally {
        noPrintEls.forEach(el => el.style.display = '');
    }
};
