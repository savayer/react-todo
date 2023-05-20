import makeRequest from '../makeRequest';

export const getTodos = async () => {
	const { data: todos } = await makeRequest({
		url: '/api/todos',
		method: 'GET',
	});

	return todos.map((todo) => {
		todo.id = todo._id;

		return todo;
	});
};

export const createTodo = (data) => {
	return makeRequest({
		url: '/api/todos',
		method: 'POST',
		data,
	});
};

export const updateTodo = (id, data) => {
	return makeRequest({
		url: `/api/todos/${id}`,
		method: 'PUT',
		data,
	});
};

export const completeTodo = (id, data) => {
	return makeRequest({
		url: `/api/todos/${id}`,
		method: 'PATCH',
		data,
	});
};

export const deleteTodo = (id) => {
	return makeRequest({
		url: `/api/todos/${id}`,
		method: 'DELETE',
	});
};
