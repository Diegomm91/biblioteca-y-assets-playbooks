### Promise

Es un objeto que representa la finalización o el fracaso de una operación asíncrona. Esencialmente, 
es una forma de manejar operaciones asíncronas sin bloquear la ejecución del resto del código.

    new Promise((resolve, reject) => {
       // Simular operación asíncrona
       let operationSuccessful = false;
     
       if (operationSuccessful) {
         resolve("Operación exitosa");
       } else {
         reject("Error durante la operación");
       }
    }).catch(error => {
       console.error(`Ha ocurrido un error: ${error}`);
    });

