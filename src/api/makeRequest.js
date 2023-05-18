import axios from 'axios';

const $axios = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
});

const makeRequest = ({
	url = '/',
	method = 'get',
	params = {},
	data = {},
	headers = {},
}) => {
	return $axios({
		url,
		method,
		params,
		data,
		headers,
	});
};

export default makeRequest;
