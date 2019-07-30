export default function(target: Object,
    propertyName: string,
    propertyDesciptor: PropertyDescriptor) {
        const method = propertyDesciptor.value;
        propertyDesciptor.value = function (...args: any[]) {

            // convert list of greet arguments to string
            const params = args.map(a => JSON.stringify(a)).join();
    
            // invoke greet() and get its return value
            const result = method.apply(this, args);
    
            // convert result to string
            const r = JSON.stringify(result);
    
            // display in console the function call details
            console.log(`Call: ${propertyName}(${params}) => ${r}`);
    
            // return the result of invoking the method
            return result;
        }
        
        return propertyDesciptor;
}