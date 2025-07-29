// main.js - Lógica principal de la aplicación

// Este archivo está configurado como un módulo ES6.
// Puedes importar y exportar funcionalidades aquí.

import { initMerciWidget } from './merci-widget.js';
import { extractTextFromPdf, analyzeOffer } from './pdf-analyzer.js';

console.log('¡Mercedev ATS cargado!');

document.addEventListener('DOMContentLoaded', () => {
    initMerciWidget();

    // Lógica específica para la página del reclutador
    if (document.body.classList.contains('page-reclutador')) {
        const pdfUploadInput = document.getElementById('pdf-upload-input');
        const analyzePdfBtn = document.getElementById('analyze-pdf-btn');
        const analysisResultsDiv = document.getElementById('analysis-results');

        if (pdfUploadInput && analyzePdfBtn && analysisResultsDiv) {
            pdfUploadInput.addEventListener('change', () => {
                analyzePdfBtn.disabled = !pdfUploadInput.files.length;
            });

            analyzePdfBtn.addEventListener('click', async () => {
                const file = pdfUploadInput.files[0];
                if (!file) {
                    analysisResultsDiv.innerHTML = '<p class="analysis-results__error">Por favor, selecciona un archivo PDF.</p>';
                    return;
                }

                analysisResultsDiv.innerHTML = '<p class="analysis-results__loading">Analizando PDF... Esto puede tardar un momento.</p>';
                analyzePdfBtn.disabled = true;

                try {
                    const text = await extractTextFromPdf(file);
                    const result = analyzeOffer(text);

                    let resultsHtml = `
                        <h3 class="analysis-results__score">Compatibilidad: ${result.score}%</h3>
                        <div class="analysis-results__details">
                            <h4>Habilidades Encontradas (${result.matches.length}):</h4>
                            <ul class="analysis-results__list analysis-results__list--matches">
                                ${result.matches.map(skill => `<li>✅ ${skill}</li>`).join('')}
                            </ul>
                            <h4>Habilidades Faltantes (${result.missing.length}):</h4>
                            <ul class="analysis-results__list analysis-results__list--missing">
                                ${result.missing.map(skill => `<li>❌ ${skill}</li>`).join('')}
                            </ul>
                        </div>
                    `;
                    analysisResultsDiv.innerHTML = resultsHtml;

                } catch (error) {
                    console.error("Error durante el análisis:", error);
                    analysisResultsDiv.innerHTML = `<p class="analysis-results__error">Error al analizar el PDF: ${error}</p>`;
                } finally {
                    analyzePdfBtn.disabled = false;
                }
            });
        }
    }

    // Lógica específica para la página del aspirante (si fuera necesario)
    if (document.body.classList.contains('page-aspirante')) {
        // Aquí podrías añadir lógica si el análisis del aspirante fuera dinámico
        // Por ahora, es estático como se definió en el HTML
    }
});
