const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://todo.production.url';

export default baseUrl;