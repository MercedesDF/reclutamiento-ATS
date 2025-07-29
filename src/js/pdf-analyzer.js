// src/js/pdf-analyzer.js - Lógica para análisis de PDF

// Importar pdf.js desde un CDN
// Nota: En un entorno de producción, considera descargar y servir pdf.js localmente
// para mayor control y rendimiento.
const PDF_JS_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.7.107/pdf.min.js';
const PDF_WORKER_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.7.107/pdf.worker.min.js';

let pdfjsLib;

/**
 * Carga la librería pdf.js dinámicamente.
 * @returns {Promise<void>}
 */
async function loadPdfJs() {
    if (pdfjsLib) return; // Ya cargado

    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = PDF_JS_CDN;
        script.onload = () => {
            pdfjsLib = window['pdfjs-dist/build/pdf'];
            pdfjsLib.GlobalWorkerOptions.workerSrc = PDF_WORKER_CDN;
            resolve();
        };
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

/**
 * Extrae texto de un archivo PDF.
 * @param {File} pdfFile - El archivo PDF a analizar.
 * @returns {Promise<string>}
 */
export async function extractTextFromPdf(pdfFile) {
    await loadPdfJs();

    const fileReader = new FileReader();

    return new Promise((resolve, reject) => {
        fileReader.onload = async function() {
            const typedarray = new Uint8Array(this.result);
            try {
                const pdf = await pdfjsLib.getDocument(typedarray).promise;
                let fullText = '';
                for(let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const content = await page.getTextContent();
                    const strings = content.items.map(item => item.str);
                    fullText += strings.join(' ') + ' \n ';
                }
                resolve(fullText);
            } catch (error) {
                console.error("Error al procesar el PDF:", error);
                reject("No se pudo extraer texto del PDF.");
            }
        };
        fileReader.onerror = () => reject("Error al leer el archivo.");
        fileReader.readAsArrayBuffer(pdfFile);
    });
}

/**
 * Compara el texto de una oferta con las palabras clave del CV de Mercedes.
 * @param {string} offerText - El texto extraído de la oferta de empleo.
 * @returns {{score: number, matches: string[], missing: string[]}}
 */
export function analyzeOffer(offerText) {
    const mercedesCvKeywords = [
        "React", "Node.js", "MongoDB", "Python", "Django", "JavaScript", "TypeScript",
        "HTML", "CSS", "SASS", "Git", "GitHub", "Figma", "Ubuntu", "Linux", "Zsh",
        "Miniconda", "VSCode", "Liderazgo", "Resolución de problemas", "Autonomía",
        "Trabajo en equipo", "Enfoque UX/UI", "Español", "Inglés", "B1", "B2",
        "Scrum", "Docker", "metodologías ágiles", "gestión de proyectos", "atención al cliente"
    ];

    const textLower = offerText.toLowerCase();
    const foundKeywords = new Set();
    const missingKeywords = new Set();

    mercedesCvKeywords.forEach(keyword => {
        const keywordLower = keyword.toLowerCase();
        if (textLower.includes(keywordLower)) {
            foundKeywords.add(keyword);
        } else {
            missingKeywords.add(keyword);
        }
    });

    const score = (foundKeywords.size / mercedesCvKeywords.length) * 100;

    return {
        score: parseFloat(score.toFixed(0)),
        matches: Array.from(foundKeywords),
        missing: Array.from(missingKeywords)
    };
}
