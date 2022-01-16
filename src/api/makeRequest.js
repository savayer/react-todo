import axios from "axios";

export default ({
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
