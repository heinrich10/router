
class HelloService {

	log(key, value) {
		console.log(key, value);
	}

	addJob(queue, data) {
		return queue.add(data);
	}

}

module.exports = HelloService;
