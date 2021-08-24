const TaskStore = artifacts.require("TaskStore");

module.exports = function (deployer) {
  deployer.deploy(TaskStore);
};
