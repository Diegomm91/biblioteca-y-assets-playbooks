## Environments & Product flavors

- dev -> using app


## tree

```plaintext
├── config
│   ├── AWS_Config.md                         # Documentación y configuración relacionada con AWS
│   ├── Constants.ts                          # Constantes globales utilizadas en todo el proyecto
│   ├── open
│   │   └── Constants.ts                      # Constantes específicas para la configuración open
│   └── prod
│       ├── Constants.ts                      # Constantes específicas para la configuración de producción
│       └── sfai-platform-library-web-template_accessKeys.csv # Archivo CSV con claves de acceso para el entorno de producción
├── devops
│   ├── impl
│   │   └── precondition.sh                   # Script de precondiciones para el entorno de implementación
│   └── open
│       ├── 0-clean.sh                        # Script para limpiar el entorno de desarrollo
│       ├── 1.1-install.sh                    # Script para instalar dependencias
│       ├── 1.2-validate.sh                   # Script para validar la instalación
│       ├── 2-buildUsingApp.sh                # Script para construir la aplicación de demostración
│       ├── 3-startUsingApp.sh                # Script para iniciar la aplicación de demostración
│       ├── check_versions.sh                 # Script para comprobar las versiones de las dependencias
│       ├── debug
│       │   └── eslint-debug.sh               # Script de depuración para ESLint
│       ├── git-merge.sh                      # Script para manejar fusiones de git
│       ├── Library_Publush.md                # Documento con instrucciones para publicar la librería
│       ├── nvm
│       │   ├── nvm-change-version.sh         # Script para cambiar la versión de Node con NVM
│       │   └── nvm-load.sh                   # Script para cargar NVM
│       ├── setup.sh                          # Script de configuración inicial
│       └── test-deploy.sh                    # Script para probar despliegues
├── images.d.ts                               # Declaraciones de tipos para archivos de imagen
├── impl
│   ├── res
│   │   ├── images
│   │   │   ├── footer-montanias.png          # Imagen de pie de página
│   │   │   ├── images.d.ts                   # Declaraciones de tipos para las imágenes
│   │   │   ├── large
│   │   │   │   └── foobar.png                # Imagen grande de ejemplo
│   │   │   ├── logo-mindco.png               # Logotipo de Mindco
│   │   │   └── small
│   │   │       └── foobar.png                # Imagen pequeña de ejemplo
│   │   └── strings.ts                        # Archivo con cadenas de texto utilizadas en la implementación
│   └── src
│       └── main
│           ├── data
│           │   ├── model                     # Modelos de datos
│           │   └── repository                # Repositorios de datos
│           ├── infrastructure                # Código relacionado con la infraestructura
│           └── presentation
│               ├── FeatureFoobarImpl.css     # Estilos CSS para la implementación de la característica
│               └── FeatureFoobarImpl.tsx     # Implementación de la característica en TypeScript y JSX
├── LICENSE.md                                # Licencia del proyecto
├── open
│   ├── FeatureFoobar.tsx                     # Implementación de la característica accesible públicamente
│   └── src
│       ├── index.js                          # Punto de entrada de la aplicación pública
│       └── MyComponent.js                    # Componente de ejemplo
├── package.json                              # Scripts y dependencias del proyecto
├── package-lock.json                         # Archivo de bloqueo de dependencias
├── README.md                                 # Documento README con información general del proyecto
├── tsconfig.json                             # Configuración de TypeScript
├── using
│   ├── devops
│   │   └── Using.md                          # Documentación de DevOps específica para el uso de la aplicación
│   ├── package.json                          # Scripts y dependencias específicos para la aplicación de demostración
│   ├── package-lock.json                     # Archivo de bloqueo de dependencias para la aplicación de demostración
│   ├── public
│   │   └── index.html                        # Archivo HTML principal para la aplicación de demostración
│   ├── src
│   │   ├── App.js                            # Componente principal de la aplicación de demostración
│   │   ├── impl
│   │   │   └── UsingAppImpl.tsx              # Implementación específica de la aplicación de demostración
│   │   ├── index.js                          # Punto de entrada de la aplicación de demostración
│   │   └── open
│   │       └── UsingIndex.tsx                # Implementación accesible públicamente de la aplicación de demostración
│   ├── version.md                            # Documento de control de versiones
│   ├── webpack.config.js                     # Configuración de Webpack para la aplicación de demostración
│   └── wiki
│       └── Using.md                          # Documentación de uso de la aplicación de demostración
├── webpack.common.mjs                        # Configuración común de Webpack
├── webpack.config.js                         # Configuración principal de Webpack
├── webpack.dev.mjs                           # Configuración de desarrollo de Webpack
└── wiki
    ├── Architecture.md                       # Documentación sobre la arquitectura del proyecto
    ├── Backlog.md                            # Lista de tareas pendientes
    ├── CHANGELOG.md                          # Registro de cambios del proyecto
    ├── conventions.md                        # Convenciones y estándares del proyecto
    ├── GitStrategy.md                        # Estrategia de uso de Git
    ├── GoogleCloudPlatform.md                # Documentación relacionada con Google Cloud Platform
    ├── JavaScript.md                         # Estándares y convenciones para JavaScript
    ├── LookerStudio.md                       # Documentación sobre el uso de Looker Studio
    ├── preconditions.md                      # Precondiciones necesarias para el desarrollo y despliegue
    ├── troubleshooting.md                    # Guía de resolución de problemas
    └── versions.md                           # Información sobre versiones del proyecto
