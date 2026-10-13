import { v4 as uuidv4 } from 'uuid';

export function LogMethod() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    // On remplace la méthode par notre wrapper
    descriptor.value = async function (...args: any[]) {
      const now = Date.now();
      const className = target.constructor.name;
      const methodName = propertyKey;
      
      // ⚠️ Note : Voir l'astuce plus bas pour le correlationId
      const correlationId = uuidv4(); 

      console.log({
        event: 'SERVICE_METHOD_IN',
        date: new Date().toISOString(),
        correlationId,
        className,
        methodName,
        // args: args, // Décommentez si vous voulez voir les arguments (attention aux données sensibles)
      });

      try {
        // Exécution de la méthode originale du Service
        const result = await originalMethod.apply(this, args);
        
        const executionTime = Date.now() - now;
        console.log({
          event: 'SERVICE_METHOD_OUT',
          correlationId,
          className,
          methodName,
          executionTimeMs: executionTime,
        });

        return result;
      } catch (error) {
        const executionTime = Date.now() - now;
         // ✅ Correction : Extraction sûre du message d'erreur
        const errorMessage = error instanceof Error ? error.message : String(error);

        console.log({
          event: 'SERVICE_METHOD_ERROR',
          correlationId,
          className,
          methodName,
          executionTimeMs: executionTime,
          errorMessage: errorMessage,
        });
        throw error; // On relance l'erreur pour ne pas casser le flux
      }
    };

    return descriptor;
  };
}