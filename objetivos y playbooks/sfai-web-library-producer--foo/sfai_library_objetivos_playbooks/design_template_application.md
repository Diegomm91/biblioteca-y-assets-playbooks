# Diseño Conceptual: Aplicación de Plantillas de Campaña

Este documento describe el diseño conceptual para la funcionalidad de aplicación de plantillas en la creación de campañas, abordando los escenarios de prueba y criterios de aceptación definidos.

## Diagrama de Flujo de Aplicación de Plantilla

```mermaid
graph TD
    A[Usuario] --> B{Inicia Creación de Campaña};
    B --> C{Selecciona Plantilla};
    C -- Permisos OK --> D[UI: Muestra Previsualización/Confirmación];
    C -- Permisos NO OK --> E[UI: Opción Deshabilitada / API: 403 Forbidden];

    D -- Confirma Aplicación --> F[Backend: Aplica Plantilla];
    F -- Plantilla Válida --> G[Backend: Prellena Campaña];
    G --> H[UI: Campaña Prellenada (Editable, Borrador)];

    F -- Assets Faltantes --> I[Backend: Marca Assets Faltantes];
    I --> J[UI: Placeholders + Advertencia + To-Do];

    F -- Presupuesto Inválido --> K[Backend: Bloquea Guardado];
    K --> L[UI: Mensaje Error + Sugerencias];

    F -- Fecha Inicio Pasada --> M[Backend: Ajusta Fecha Inicio];
    M --> N[UI: Notificación Ajuste Fecha];

    F -- Integración Faltante --> O[Backend: Marca Canal "Integración Faltante"];
    O --> P[UI: Canal "Integración Faltante" + CTA Conectar];

    F -- Idempotencia --> Q[Backend: Fusiona Cambios, No Duplica];

    H -- Guarda Campaña --> R[Backend: Persiste Campaña + Auditoría];
    R --> S[DB: campaign_id + audit_log];

    subgraph RBAC
        E
    end

    subgraph Validaciones
        I
        J
        K
        L
        M
        N
        O
        P
    end

    subgraph Persistencia
        Q
        R
        S
    end

    subgraph i18n
        T[Usuario con idioma en-US] --> U{Aplica Plantilla};
        U --> V[Backend: Contenido en en-US];
        V --> W[UI: Contenido en Inglés + Selector Idioma];
    end
```

## Descripción de Componentes y Flujos

### 1. Interfaz de Usuario (UI)
- **Selección de Plantilla**: La UI presentará una lista de plantillas disponibles. La opción "Usar plantilla" estará deshabilitada si el usuario no tiene los permisos adecuados (`campaign:create`).
- **Previsualización y Confirmación**: Antes de aplicar, se podría mostrar una previsualización de los elementos que se prellenarán.
- **Campaña Prellenada**: Una vez aplicada, la UI mostrará la campaña con todos los campos prellenados (título, descripción, actividades, assets, presupuesto, calendario, metadatos). Todos los campos serán editables.
- **Manejo de Errores/Advertencias**:
    - **Assets Faltantes**: Se mostrarán placeholders visuales para imágenes y presets de copy no encontrados, junto con una advertencia clara listando los assets faltantes y un elemento en la lista de tareas (to-do).
    - **Presupuesto Inválido**: Un mensaje de error bloqueará el guardado/publicación si el presupuesto excede los límites de la cuenta, sugiriendo alternativas.
    - **Fechas Ajustadas**: Una notificación informará al usuario si la fecha de inicio de la campaña fue ajustada automáticamente.
    - **Integraciones Faltantes**: Los canales de publicación con credenciales faltantes se marcarán con un estado "Integración faltante" y un CTA para conectar.
- **i18n**: La UI prellenará el contenido en el idioma del usuario y ofrecerá un selector para cambiar y editar otras traducciones.

### 2. Backend
- **API de Aplicación de Plantilla**: Un endpoint recibirá el `template_id` y el `campaign_id` (si es una campaña existente en borrador) o creará una nueva campaña.
- **Verificación de Permisos (RBAC)**: Antes de procesar la solicitud, el backend verificará que el `user_id` tenga el permiso `campaign:create`. Si no, devolverá un `403 Forbidden`.
- **Procesamiento de Plantilla**:
    - **Extracción de Datos**: Leerá los datos de la plantilla (título, descripción, actividades, assets, presupuesto, pacing, calendario, metadatos, configuración de LP, integraciones).
    - **Idempotencia**: Al aplicar la misma plantilla a una campaña existente, el sistema fusionará los cambios, identificando actividades por `template_activity_id` para evitar duplicados.
    - **Validaciones**:
        - **Assets**: Identificará assets referenciados que no existen en el Asset Library de la cuenta y los marcará como faltantes.
        - **Presupuesto**: Validará el presupuesto de la plantilla contra los límites de la cuenta. Si excede, bloqueará el guardado.
        - **Fechas**: Ajustará automáticamente la fecha de inicio si es anterior a `hoy + 1 día`.
        - **Integraciones**: Verificará la existencia de credenciales válidas para las integraciones de publicación.
        - **Landing Page/Consentimiento**: Preconfigurará la LP con campos obligatorios y consentimiento. Validará el envío de formularios para asegurar el consentimiento.
- **Persistencia**:
    - Guardará la campaña prellenada en la base de datos con un `campaign_id`.
    - Creará un registro de auditoría en la tabla `audit_logs` con `template_id`, `campaign_id`, `user_id`, `timestamp` y un resumen de los campos aplicados.

### 3. Base de Datos (DB)
- **Tabla de Campañas**: Almacenará los datos de la campaña, incluyendo los prellenados por la plantilla.
- **Tabla de Actividades**: Almacenará las actividades del playbook, con un `template_activity_id` para la idempotencia.
- **Tabla de Assets**: Referenciará los assets vinculados a la campaña.
- **Tabla de Auditoría (`audit_logs`)**: Registrará cada aplicación de plantilla.
- **Tabla de To-Do's**: Registrará tareas pendientes como "Agregar assets faltantes".

## Consideraciones Adicionales

- **API Gateway**: Se utilizará para enrutar las solicitudes y aplicar políticas de seguridad.
- **Servicio de Plantillas**: Un servicio dedicado para gestionar el repositorio de plantillas.
- **Servicio de Campañas**: El servicio principal para la creación y gestión de campañas.
- **Servicio de Assets**: Para verificar la existencia de assets.
- **Servicio de Usuarios/RBAC**: Para la gestión de permisos.