import { useCallback, useState } from 'react';

export const useRequest = (asyncFunction) => {
	const [isLoading, setLoading] = useState(false);
	const [result, setResult] = useState();
	const [error, setError] = useState(null);

	const handleResponse = useCallback(
		async (...args) => {
			try {
				setLoading(true);
				const data = await asyncFunction(...args);
				setResult(data);

				return data;
			} catch (err) {
				setError(err);
				throw err;
			} finally {
				setLoading(false);
			}
		},
		[asyncFunction],
	);

	return {
		isLoading,
		result,
		error,
		handleResponse,
	};
};
