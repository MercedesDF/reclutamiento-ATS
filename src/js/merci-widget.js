// src/js/merci-widget.js - Lógica del widget de Mercí

export function initMerciWidget() {
    const messages = [
        {
            text: "Eh… hola, soy Mercí. Soy la llama coder… o algo así. Sube tu PDF… o no. A ver qué pasa.",
            type: "reclutador-inicio"
        },
        {
            text: "Uhh, parece que hay un 85% de skills. O eso creo, igual me confundí… ¿Seguro? Bueno, seguro que sí, ¡bravo!",
            type: "reclutador-alto"
        },
        {
            text: "Mmm, 60%… o 70%, no sé, a lo mejor es 50%. En fin, algo decente. Inténtalo otra vez.",
            type: "reclutador-medio"
        },
        {
            text: "No sé, he mirado el PDF, pero… ¿esto es una oferta? No me queda claro. Igual solo tienes un 30% de skills o menos. O no.",
            type: "reclutador-bajo"
        },
        {
            text: "Hola, soy Mercí. No prometo ayudar mucho, pero aquí tienes tu análisis, o eso creo. Suerte con la búsqueda, yo sigo aquí calentando fuego.",
            type: "aspirante-general"
        },
    ];

    let currentMessageIndex = 0;
    let isVisible = true;
    let messageIntervalId;

    const merciContainer = document.getElementById('merci-container');
    const merciMessage = document.getElementById('merci-message');
    const merciToggleBtn = document.getElementById('merci-toggle-btn');
    const merciSvg = document.getElementById('merci-svg');

    if (!merciContainer || !merciMessage || !merciToggleBtn || !merciSvg) {
        console.error("Error: Elementos del widget de Mercí no encontrados. Asegúrate de que el HTML esté cargado.");
        return;
    }

    // Función para mostrar el siguiente mensaje
    const showNextMessage = () => {
        currentMessageIndex = (currentMessageIndex + 1) % messages.length;
        merciMessage.textContent = messages[currentMessageIndex].text;
    };

    // Iniciar el cambio automático de mensajes
    const startMessageInterval = () => {
        clearInterval(messageIntervalId); // Limpiar cualquier intervalo previo
        messageIntervalId = setInterval(showNextMessage, 10000); // Cambiar cada 10 segundos
    };

    // Manejar clic en el contenedor de Mercí (para cambiar mensaje y reiniciar temporizador)
    merciContainer.addEventListener('click', (event) => {
        // Evitar que el clic en el botón de toggle también cambie el mensaje
        if (event.target === merciToggleBtn) {
            return;
        }
        showNextMessage();
        startMessageInterval(); // Reiniciar el temporizador
    });

    // Manejar el botón de ocultar/mostrar
    merciToggleBtn.addEventListener('click', () => {
        isVisible = !isVisible;
        if (isVisible) {
            merciContainer.classList.remove('merci--hidden');
            merciToggleBtn.textContent = 'Ocultar Mercí';
            startMessageInterval(); // Reiniciar el temporizador al mostrar
        } else {
            merciContainer.classList.add('merci--hidden');
            merciToggleBtn.textContent = 'Mostrar Mercí';
            clearInterval(messageIntervalId); // Detener el temporizador al ocultar
        }
    });

    // Lógica para Mobile First: mostrar solo la cabeza en llamas en pantallas pequeñas
    const handleMobileView = () => {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        const bodyParts = merciSvg.querySelectorAll('.merci__body, .merci__arm, .merci__leg');

        if (isMobile) {
            bodyParts.forEach(part => part.style.display = 'none');
            merciSvg.style.width = '100px'; // Ajustar tamaño para solo la cabeza
            merciSvg.style.height = '100px';
            merciSvg.setAttribute('viewBox', '0 0 150 60'); // Ajustar viewBox para la cabeza
        } else {
            bodyParts.forEach(part => part.style.display = 'block'); // O 'initial' o 'inline' según el elemento
            merciSvg.style.width = '150px';
            merciSvg.style.height = '200px';
            merciSvg.setAttribute('viewBox', '0 0 150 200');
        }
    };

    // Ejecutar al cargar y al redimensionar la ventana
    window.addEventListener('DOMContentLoaded', handleMobileView);
    window.addEventListener('resize', handleMobileView);

    // Inicializar el primer mensaje y el intervalo
    merciMessage.textContent = messages[currentMessageIndex].text;
    startMessageInterval();
}
