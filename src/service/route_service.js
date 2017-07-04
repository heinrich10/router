
class HelloService {

	addJob(queue, id, path) {
		return queue.add({
			id: id,
			path: path
		});
	}

}

module.exports = HelloService;
