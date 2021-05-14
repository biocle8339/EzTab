function taskQueue() {
  "use strict";

  const _taskQueue = [];

  const enqueue = function (task) {
    _taskQueue.push(task);
  };

  const dequeue = function () {
    return _taskQueue.shift();
  };

  return Object.freeze({
    enqueue,
    dequeue,
  });
}

export default taskQueue;
