export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  date: string
  author: string
  category: string
  tags: string[]
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Guía completa para el mantenimiento de tu rifle de aire comprimido",
    slug: "guia-mantenimiento-rifle-aire-comprimido",
    excerpt:
      "Aprende cómo mantener tu rifle de aire comprimido en óptimas condiciones para garantizar su rendimiento y durabilidad a lo largo del tiempo.",
    content: `
# Guía completa para el mantenimiento de tu rifle de aire comprimido

El mantenimiento adecuado de tu rifle de aire comprimido es esencial para garantizar su rendimiento óptimo y prolongar su vida útil. En esta guía, te mostraremos los pasos fundamentales para mantener tu rifle J. Murrieta en perfectas condiciones.

## Limpieza básica

La limpieza regular es la base de un buen mantenimiento. Después de cada sesión de tiro, debes:

1. **Asegurarte de que el rifle esté descargado y desamartillado.**
2. **Limpiar el cañón** con una baqueta y parches de limpieza. Utiliza un solvente específico para armas y realiza pasadas hasta que el parche salga limpio.
3. **Limpiar las superficies externas** con un paño ligeramente humedecido con aceite para armas, prestando especial atención a las partes metálicas para prevenir la oxidación.
4. **Revisar y limpiar la recámara** para eliminar residuos que puedan afectar la precisión.

## Lubricación

Una lubricación adecuada es crucial para el funcionamiento suave de tu rifle:

1. **Aplica aceite específico para armas de aire** en las partes móviles como el mecanismo de disparo y las bisagras.
2. **No excedas en la cantidad de aceite**, ya que puede atraer suciedad y afectar el rendimiento.
3. **Para rifles PCP**, lubrica los sellos y juntas tóricas con grasa de silicona específica para este tipo de rifles.

## Revisión periódica

Cada 500 disparos aproximadamente, realiza una revisión más profunda:

1. **Verifica el apriete de todos los tornillos** y ajústalos si es necesario.
2. **Inspecciona los sellos y juntas** en busca de desgaste o daños.
3. **Comprueba el estado de los resortes** y otras piezas mecánicas.

## Almacenamiento

El almacenamiento adecuado es tan importante como la limpieza:

1. **Guarda tu rifle en un lugar seco y a temperatura constante** para evitar la condensación.
2. **Utiliza un estuche o funda de calidad** que proteja el rifle del polvo y golpes.
3. **Si no vas a utilizar el rifle por un período prolongado**, aplica una capa ligera de aceite protector en las partes metálicas.

## Cuándo acudir al servicio técnico

Aunque el mantenimiento regular puede realizarse en casa, hay situaciones en las que es mejor acudir a nuestro servicio técnico especializado:

1. **Pérdida notable de potencia o precisión** que no se resuelve con la limpieza básica.
2. **Ruidos o comportamientos inusuales** durante el ciclo de disparo.
3. **Fugas de aire** en rifles PCP.
4. **Mantenimiento preventivo anual** para una revisión completa.

Siguiendo estos consejos, tu rifle J. Murrieta mantendrá su rendimiento excepcional durante muchos años. Recuerda que un mantenimiento adecuado no solo mejora la experiencia de tiro, sino que también es una inversión en la durabilidad de tu rifle.

Para cualquier duda o servicio técnico especializado, no dudes en contactar con nuestro equipo de expertos.
    `,
    image: "/images/craftsmanship.jpeg",
    date: "15 de marzo de 2023",
    author: "Carlos Rodríguez",
    category: "guias",
    tags: ["mantenimiento", "cuidado", "limpieza", "rifles"],
  },
  {
    id: "2",
    title: "Nuevo modelo Murrieta Tactical Pro: Innovación y precisión sin precedentes",
    slug: "nuevo-modelo-murrieta-tactical-pro",
    excerpt:
      "Presentamos el nuevo Murrieta Tactical Pro, nuestro rifle más avanzado hasta la fecha, diseñado para tiradores profesionales que exigen el máximo rendimiento.",
    content: `
# Nuevo modelo Murrieta Tactical Pro: Innovación y precisión sin precedentes

Nos complace presentar el nuevo Murrieta Tactical Pro, el rifle de aire comprimido más avanzado de nuestra historia. Después de tres años de intenso desarrollo y pruebas, este modelo representa la culminación de nuestra experiencia y pasión por la excelencia.

## Características revolucionarias

El Murrieta Tactical Pro incorpora innovaciones que establecen un nuevo estándar en el mundo de los rifles de aire comprimido:

### Sistema de disparo de última generación

Hemos desarrollado un sistema de disparo completamente nuevo que ofrece:

- **Gatillo ajustable en tres etapas** con una precisión de ajuste de 0.1mm
- **Recorrido ultra-corto** para una respuesta inmediata
- **Consistencia excepcional** disparo tras disparo

### Cañón de alta precisión

El nuevo cañón Precision+ está fabricado con una aleación especial y un proceso de estriado patentado que garantiza:

- **Agrupaciones sub-MOA** a 50 metros
- **Mayor velocidad** con el mismo consumo de aire
- **Vida útil extendida** gracias a su tratamiento anti-desgaste

### Culata modular ergonómica

La culata del Tactical Pro ha sido diseñada en colaboración con tiradores profesionales:

- **Completamente ajustable** en longitud, altura de carrillera y ángulo de empuñadura
- **Fabricada en polímeros avanzados** reforzados con fibra de carbono
- **Rieles integrados** para accesorios

## Disponibilidad y especificaciones

El Murrieta Tactical Pro estará disponible a partir del 1 de junio en nuestras armerías autorizadas en los siguientes calibres:

- 4.5mm (.177) - Ideal para tiro de precisión
- 5.5mm (.22) - Equilibrio perfecto entre velocidad y energía
- 6.35mm (.25) - Máxima potencia para distancias medias

Cada rifle incluye un certificado de precisión firmado por el maestro armero responsable de su fabricación y ajuste final.

## Reserva anticipada

A partir de hoy, abrimos el período de reserva anticipada con un descuento especial del 10% y un kit de accesorios premium valorado en $25,000.

No pierdas la oportunidad de ser uno de los primeros en experimentar el futuro de los rifles de aire comprimido con el Murrieta Tactical Pro.

Para más información o para realizar tu reserva, contacta con tu armería autorizada J. Murrieta más cercana o visita nuestra sección de productos.
    `,
    image: "/images/product-2.jpeg",
    date: "5 de abril de 2023",
    author: "Equipo J. Murrieta",
    category: "productos",
    tags: ["nuevo modelo", "tactical", "innovación", "lanzamiento"],
  },
  {
    id: "3",
    title: "5 técnicas avanzadas para mejorar tu precisión en tiro deportivo",
    slug: "tecnicas-avanzadas-precision-tiro-deportivo",
    excerpt:
      "Descubre técnicas profesionales para llevar tu precisión al siguiente nivel. Consejos de campeones que transformarán tu experiencia de tiro.",
    content: `
# 5 técnicas avanzadas para mejorar tu precisión en tiro deportivo

La precisión en el tiro deportivo es una combinación de técnica, práctica y equipamiento adecuado. Si ya dominas los fundamentos y buscas llevar tu rendimiento al siguiente nivel, estas cinco técnicas avanzadas te ayudarán a mejorar significativamente tu precisión.

## 1. Respiración controlada en ciclos

La respiración afecta directamente a la estabilidad del rifle. La técnica de respiración en ciclos consiste en:

1. **Inhalar profundamente** durante 4 segundos
2. **Exhalar parcialmente** durante 2 segundos, liberando aproximadamente el 70% del aire
3. **Mantener** esta posición durante la ventana de tiro (no más de 8 segundos)
4. **Completar la exhalación** después del disparo
5. **Descansar** con respiración normal entre disparos

Esta técnica proporciona la máxima estabilidad durante el momento crítico del disparo, manteniendo un nivel óptimo de oxígeno en el cuerpo.

## 2. Alineación natural del punto de mira (NPA)

La técnica NPA (Natural Point of Aim) consiste en alinear tu cuerpo de manera que apunte naturalmente al blanco:

1. **Apunta al blanco** y cierra los ojos
2. **Relaja completamente** tu cuerpo
3. **Abre los ojos** y verifica dónde está apuntando el rifle
4. **Ajusta la posición de todo tu cuerpo** (no solo los brazos) hasta que, al repetir el proceso, el rifle apunte naturalmente al blanco

Esta técnica reduce la tensión muscular y mejora la consistencia entre disparos.

## 3. Seguimiento mental del disparo

El seguimiento mental (follow-through) es crucial para la precisión:

1. **Mantén la posición** y la presión del gatillo después del disparo
2. **Observa dónde estaba la mira** en el momento exacto del disparo
3. **Analiza mentalmente** la trayectoria y el impacto
4. **Respira normalmente** antes de relajar la posición

Esta técnica te permite identificar errores sutiles y realizar ajustes precisos para el siguiente disparo.

## 4. Entrenamiento de estabilidad con peso progresivo

Para desarrollar los músculos específicos necesarios para el tiro:

1. **Utiliza un rifle de entrenamiento** con peso adicional (10-15% más que tu rifle habitual)
2. **Mantén la posición de tiro** durante períodos progresivamente más largos
3. **Alterna entre sesiones con peso** y sesiones normales
4. **Incrementa gradualmente** el tiempo y el peso adicional

Este entrenamiento desarrolla la resistencia muscular específica necesaria para mantener la estabilidad durante sesiones largas.

## 5. Visualización detallada

Los tiradores de élite utilizan técnicas de visualización avanzadas:

1. **Antes de cada sesión**, dedica 5-10 minutos a visualizar cada aspecto del tiro perfecto
2. **Incluye todos los sentidos**: la vista de la mira alineada, la sensación del gatillo, el sonido del disparo
3. **Visualiza en cámara lenta** cada microajuste y movimiento
4. **Imagina la corrección** de errores comunes

La visualización detallada programa tu sistema neuromuscular para ejecutar con precisión los movimientos visualizados.

## Implementación y práctica

Para obtener los mejores resultados:

1. **Introduce una técnica a la vez** en tu entrenamiento
2. **Practica cada técnica** durante al menos 3-4 semanas antes de añadir otra
3. **Lleva un registro detallado** de tu progreso
4. **Graba tus sesiones** cuando sea posible para análisis posterior

Recuerda que la consistencia es más importante que la intensidad. Es preferible practicar 30 minutos diarios que 4 horas una vez por semana.

Con dedicación y la aplicación sistemática de estas técnicas avanzadas, verás mejoras significativas en tu precisión y rendimiento general en el tiro deportivo.
    `,
    image: "/images/product-1.jpeg",
    date: "20 de abril de 2023",
    author: "Ana Martínez",
    category: "tecnicas",
    tags: ["técnicas", "precisión", "tiro deportivo", "entrenamiento"],
  },
  {
    id: "4",
    title: "J. Murrieta patrocina el Campeonato Nacional de Tiro con Aire Comprimido 2023",
    slug: "patrocinio-campeonato-nacional-tiro-2023",
    excerpt:
      "Nos complace anunciar nuestro patrocinio oficial del Campeonato Nacional de Tiro con Aire Comprimido 2023, reafirmando nuestro compromiso con el deporte.",
    content: `
# J. Murrieta patrocina el Campeonato Nacional de Tiro con Aire Comprimido 2023

Nos enorgullece anunciar que J. Murrieta será el patrocinador principal del Campeonato Nacional de Tiro con Aire Comprimido 2023, que se celebrará del 15 al 18 de septiembre en Buenos Aires.

## Un compromiso con la excelencia deportiva

Este patrocinio refleja nuestro compromiso continuo con el desarrollo del tiro deportivo en Argentina y la promoción de valores como la disciplina, la precisión y la superación personal.

"En J. Murrieta creemos firmemente en apoyar a los deportistas que comparten nuestra pasión por la excelencia. Este campeonato es una plataforma ideal para mostrar el talento nacional y fomentar el crecimiento de este deporte", comentó Martín Murrieta, Director General de la compañía.

## El campeonato

El Campeonato Nacional de Tiro con Aire Comprimido 2023 reunirá a más de 200 tiradores de todo el país en diversas categorías:

- Rifle de aire 10m (masculino y femenino)
- Pistola de aire 10m (masculino y femenino)
- Categorías juveniles (sub-18 y sub-21)
- Categoría máster (+50 años)

El evento contará con la presencia de destacados tiradores olímpicos y será clasificatorio para competencias internacionales.

## Actividades especiales

Como parte de nuestro patrocinio, organizaremos diversas actividades durante el campeonato:

### Exhibición de productos

Presentaremos en exclusiva nuestra nueva línea de rifles de competición, incluyendo el Murrieta Precision Pro, diseñado específicamente para competiciones de alto nivel.

### Clínicas técnicas

Ofreceremos clínicas gratuitas impartidas por tiradores profesionales, donde los participantes podrán recibir consejos personalizados para mejorar su técnica.

### Sorteos y premios especiales

Todos los participantes entrarán en el sorteo de equipamiento premium J. Murrieta, incluyendo un rifle de competición para el ganador.

## Información para asistentes

El campeonato estará abierto al público con entrada gratuita. Se realizarán transmisiones en vivo de las finales a través de nuestras redes sociales.

Para más información sobre el evento, horarios y actividades, visita la sección de eventos en nuestra web o contacta con la Federación Argentina de Tiro.

Esperamos que este patrocinio contribuya al crecimiento del tiro deportivo en nuestro país y sirva como plataforma para descubrir nuevos talentos. En J. Murrieta estamos comprometidos con la comunidad de tiradores y seguiremos apoyando iniciativas que promuevan este deporte.

## Voluntariado y participación

Si estás interesado en participar como voluntario durante el campeonato, puedes registrarte a través de nuestra página web. Necesitamos apoyo en diversas áreas como logística, atención a participantes y asistencia técnica.

## Contacto para medios

Los medios de comunicación interesados en cubrir el evento pueden solicitar acreditaciones y más información contactando a nuestro departamento de prensa en prensa@jmurrieta.com.

Nos vemos en septiembre para celebrar juntos la pasión por el tiro deportivo en el Campeonato Nacional 2023.
    `,
    image: "/placeholder.svg?height=400&width=600",
    date: "10 de mayo de 2023",
    author: "Equipo J. Murrieta",
    category: "noticias",
    tags: ["campeonato", "patrocinio", "evento", "competición"],
  },
]
