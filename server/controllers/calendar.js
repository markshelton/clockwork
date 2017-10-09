const moment = require("moment");
const Task = require("../models/task");

exports.fetch_tasks = function(req, res, next) {
  Task.find({ owner: req.user._id }, function(err, tasks) {
    if (err) return res.status(422).send({ error: "Tasks couldn't be found" });
    return res.status(200).json({ tasks: tasks });
  });
};

exports.fetch_task = function(req, res, next) {
  Task.findById(req.params.id, function(err, task) {
    if (err) return res.status(422).send({ error: "Task couldn't be found" });
    else return res.status(200).json({ task: task });
  });
};

exports.delete_task = function(req, res, next) {
  Task.findByIdAndRemove(req.params.id, function(err, task) {
    if (err) return res.status(422).send({ error: "Task couldn't be deleted" });
    else return res.status(200).json({ task: task });
  });
};

exports.create_task = function(req, res, next) {
  var newTask = new Task(Object.assign({}, req.body, { owner: req.user._id }));
  newTask.save(function(err) {
    if (err) return res.status(422).send({ error: "Task couldn't be created" });
    else res.sendStatus(200);
  });
};

exports.update_task = function(req, res, next) {
  Task.findByIdAndUpdate(req.body.id, req.body, function(err, task) {
    if (err) return res.status(422).send({ error: "Task couldn't be updated" });
    res.sendStatus(200);
  });
};
