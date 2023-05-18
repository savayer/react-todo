import makeRequest from "../makeRequest";

export const getTodos = () => {
	return makeRequest({
		url: '/api/todos',
		method: 'GET'
	})
}

export const createTodo = (data) => {
	return makeRequest({
		url: '/api/todos',
		method: 'POST',
		data
	})
}

export const updateTodo = (id, data) => {
	return makeRequest({
		url: `/api/todos/${id}`,
		method: 'PUT',
		data
	})
}

export const deleteTodos = (data) => {
	return makeRequest({
		url: '/api/todos/1',
		method: 'DELETE',
		data
	})
}

