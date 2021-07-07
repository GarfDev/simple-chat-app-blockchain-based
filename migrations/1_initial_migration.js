const ChatApp = artifacts.require("./ChatApp.sol");

module.exports = function (deployer) {
  deployer.deploy(ChatApp);
};
