import axios from "axios";

const makeRequest = ({
	url = '/',
	method = 'get',
	params = {},
	data = {},
	headers = {}
}) => {
	return axios({
		url,
		method,
		params,
		data,
		headers
	})
}

export default makeRequest;
