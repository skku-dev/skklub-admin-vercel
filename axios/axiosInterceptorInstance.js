import axios from 'axios';

const axiosInterceptorInstance = axios.create({
	baseURL: '/', // Replace with your API base URL
});

// Request interceptor
axiosInterceptorInstance.interceptors.request.use(
	(config) => {
		// Modify the request config here (add headers, authentication tokens)
		const accessToken = window.localStorage.getItem('key');

		// If token is present, add it to request's Authorization Header
		if (accessToken) {
			if (config.headers) config.headers.Authorization = accessToken;
		}

		config.headers['Access-Control-Allow-Origin'] = '*';
		config.headers['Access-Control-Allow-Headers'] =
			'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version';
		config.headers['Access-Control-Allow-Credentials'] = 'true';
		config.headers['Access-Control-Allow-Methods'] =
			'GET,OPTIONS,PATCH,DELETE,POST,PUT';

		return config;
	},
	(error) => {
		// Handle request errors here
		return Promise.reject(error);
	}
);

// Response interceptor
axiosInterceptorInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		// Handle response errors here
		if (error.response.status === 401) {
			// redirect to index page
			window.location.href = '/';
		}
		return Promise.reject(error);
	}
);

export default axiosInterceptorInstance;
