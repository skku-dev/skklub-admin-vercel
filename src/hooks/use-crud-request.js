import axios from 'axios';
import { useState } from 'react';

const useCrudRequest = (baseUrl) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const create = async (payload) => {
		try {
			setLoading(true);
			const response = await axios.post(baseUrl, payload);
			setData(response.data);
			setLoading(false);
		} catch (error) {
			setError(error);
			setLoading(false);
		}
	};

	const read = async (query) => {
		try {
			setLoading(true);
			const response = await axios.get(baseUrl, { params: query });
			setData(response.data);
			setLoading(false);
		} catch (error) {
			setError(error);
			setLoading(false);
		}
	};

	const update = async (id, payload) => {
		try {
			setLoading(true);
			const response = await axios.put(`${baseUrl}/${id}`, payload);
			setData(response.data);
			setLoading(false);
		} catch (error) {
			setError(error);
			setLoading(false);
		}
	};

	const remove = async (id) => {
		try {
			setLoading(true);
			await axios.delete(`${baseUrl}/${id}`);
			setData(null);
			setLoading(false);
		} catch (error) {
			setError(error);
			setLoading(false);
		}
	};

	return { data, loading, error, create, read, update, remove };
};

export default useCrudRequest;
