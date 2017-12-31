



ExceptionFactory.$inject = ['$log'];
    
export function ExceptionFactory($log){
        return ErrorHandler;

        function ErrorHandler(exception, cause) {
           // logErrorsToBackend(exception, cause);
            $log.warn(exception, cause);
        };
        
    }
