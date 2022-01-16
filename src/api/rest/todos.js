import makeRequest from "../makeRequest";

export const getTodos = () => {
	return makeRequest({
		url: 'https://my-json-server.typicode.com/savayer/demo/todos',
		method: 'GET'
	})
}

export const createTodo = (data) => {
	return makeRequest({
		url: 'https://my-json-server.typicode.com/savayer/demo/todos',
		method: 'POST',
		data
	})
}

export const updateTodo = (id, data) => {
	return makeRequest({
		url: `https://my-json-server.typicode.com/savayer/demo/todos/${id}`,
		method: 'PUT',
		data
	})
}

export const deleteTodos = (data) => {
	return makeRequest({
		url: 'https://my-json-server.typicode.com/savayer/demo/todos/1',
		method: 'DELETE',
		data
	})
}

