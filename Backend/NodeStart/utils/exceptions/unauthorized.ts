export default function (message: string = 'Unauthorized access') {
    return {
        code: 403, message
    };
}