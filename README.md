# Aplicación de Reclutamiento ATS con Mercí

Este proyecto es una aplicación web innovadora diseñada para optimizar el proceso de reclutamiento, con una integración pensada para entornos WordPress (específicamente con Hello Elementor Pro y un tema hijo). Su objetivo principal es facilitar la vida tanto a reclutadores como a aspirantes, ofreciendo herramientas de análisis de compatibilidad de CVs y ofertas de empleo.

## ✨ Características Principales

*   **Selector de Rol Intuitivo:** Una página de inicio clara que permite al usuario elegir entre el perfil de "Reclutador" o "Aspirante".
*   **Análisis ATS para Reclutadores:**
    *   Subida de ofertas de empleo en formato PDF.
    *   Extracción de texto y análisis de palabras clave para identificar habilidades y requisitos.
    *   Cálculo de un porcentaje de compatibilidad con un CV base (el de Mercedes).
    *   Desglose visual de habilidades coincidentes y faltantes.
*   **Análisis de CV para Aspirantes:**
    *   Feedback sobre la optimización del CV (basado en un perfil predefinido).
    *   Enlaces directos a portales de empleo relevantes.
    *   Recomendaciones personalizadas para mejorar el perfil profesional.
*   **Mercí, la Mascota Inútil pero Adorable:**
    *   Una llama coder única (cabeza de fuego, brazos `</>`, piernas de palotes) que flota por la web.
    *   Personalidad humorística y mensajes "poco útiles" que cambian al interactuar o con el tiempo.
    *   Diseño SVG animado para una experiencia visual ligera y memorable.
    *   Opción para ocultar/mostrar la mascota.
    *   Adaptación para móvil (solo cabeza en llamas) para optimizar el espacio.

## 💡 Filosofía del Proyecto

Este proyecto se construye bajo una serie de principios y buenas prácticas de ingeniería de software para asegurar su calidad, mantenibilidad y rendimiento:

*   **Motherfuckingwebsite:** Priorizamos la simplicidad, la ligereza y la funcionalidad por encima de la complejidad innecesaria.
*   **Modularidad y Atomización:** El código está organizado en componentes pequeños y reutilizables.
*   **POO (Programación Orientada a Objetos):** Aplicación de principios de POO para una estructura de código clara.
*   **Clean Architecture & SOLID:** Diseño de software que facilita la escalabilidad, la testabilidad y la separación de responsabilidades.
*   **Buenas Prácticas de Código:**
    *   Comentarios claros y concisos en castellano, explicando el *porqué* más que el *qué*.
    *   Manejo robusto de errores para una experiencia de usuario fluida.
*   **Rendimiento y Optimización (Lighting):**
    *   **Lazy Loading:** Para imágenes y recursos que no son críticos en la carga inicial.
    *   Animaciones CSS suaves y optimizadas para evitar sobrecargas.
    *   Minimización del uso de JavaScript cuando no es estrictamente necesario.
*   **Accesibilidad y SEO:**
    *   Uso de `aria-label`, `alt` tags y roles ARIA para mejorar la accesibilidad.
    *   Diseño semántico y optimizado para motores de búsqueda.
    *   Auditorías con herramientas como Lighthouse o Axe-core.
*   **Mobile First & Responsive Design:** La aplicación está diseñada pensando primero en dispositivos móviles, asegurando una experiencia óptima en cualquier tamaño de pantalla.
*   **Estilos:** Organización de CSS siguiendo la metodología BEM (Block Element Modifier) y preparado para una futura implementación con SASS (arquitectura 7+1).

## 🛠️ Tecnologías Utilizadas

*   **Plataforma:** WordPress (con tema padre Hello Elementor Pro y un Child Theme personalizado).
*   **Frontend:**
    *   HTML5 (semántico y accesible)
    *   CSS3 (BEM, variables CSS, animaciones ligeras)
    *   JavaScript (ES Modules para modularidad)
    *   `pdf.js` (para la extracción de texto de PDFs en el navegador)

## 🚀 Configuración y Uso (para el Desarrollador)

1.  **Clonar el Repositorio:**
    ```bash
    git clone https://github.com/MercedesDF/reclutamiento-ATS.git
    cd reclutamiento-ATS
    ```
2.  **Integración en WordPress:**
    *   Los archivos HTML (`index.html`, `reclutador.html`, `aspirante.html`) están diseñados para ser insertados como bloques HTML personalizados en páginas de WordPress o como plantillas PHP dentro de tu Child Theme.
    *   El archivo `src/css/main.css` debe ser enlazado o copiado al `style.css` de tu Child Theme.
    *   El archivo `src/js/main.js` debe ser enlazado como un módulo JavaScript en tus páginas.
3.  **Widget de Mercí:**
    *   El código de Mercí (`merci.html` - *aún no creado, pero será el contenido del widget*) está pensado para ser pegado en un widget HTML dentro de una plantilla global de Elementor Pro (Header o Footer), asegurando su presencia en toda la web.
    *   Asegúrate de reemplazar las URLs de las imágenes de Mercí (si usas PNG/JPG) o de integrar el SVG animado directamente.

## 📞 Contacto

*   **GitHub:** [Mercedesdf](https://github.com/MercedesDF/mercedev.es)
*   **LinkedIn (Ingeniería):** [mercedesdf-ingenieria](https://www.linkedin.com/in/mercedesdf-ingenieria)
*   **Email:** [mercedev@mercedev.es](mailto:mercedev@mercedev.es)

## 🗺️ Roadmap / Próximos Pasos

1.  **Fase 2: Implementación de la Página de Inicio (`index.html`)**
    *   Creación de la estructura HTML básica y los botones de selección de rol.
    *   Estilización inicial con CSS (Mobile First, colores base).
2.  **Fase 3: Desarrollo del Widget de Mercí**
    *   Creación del SVG animado de Mercí.
    *   Implementación de la lógica JavaScript para mensajes interactivos y ocultar/mostrar.
    *   Integración en una plantilla global de Elementor.
3.  **Fase 4: Creación de las Páginas de Reclutador y Aspirante**
    *   Formulario de subida de PDF para reclutadores.
    *   Integración de `pdf.js` para análisis de texto.
    *   Lógica de comparación de habilidades y visualización de resultados.
    *   Página de aspirante con análisis de CV y enlaces a portales de empleo.
4.  **Fase 5: Refactorización y Optimización**
    *   Refactorización de CSS a SASS (arquitectura 7+1).
    *   Pruebas exhaustivas de accesibilidad (Lighthouse, Axe-core) y rendimiento.
    *   Implementación de manejo de errores avanzado.
    *   Documentación detallada en la carpeta `docs/`.