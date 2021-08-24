const TaskStore = artifacts.require("TaskStore");

contract("TaskStore", accounts => {
    it("...should store the string 'Hi there!'.", async () => {
        //Get the instance of the contract
        const taskStoreInstance = await TaskStore.deployed();

        //Store the string via set function
        await taskStoreInstance.updateTask("Hi there!", { from: accounts[0] });

        //get the stored string and save it in a const variable
        const storedTask = await taskStoreInstance.readTask.call();

        //Assert the result
        assert.equal(storedTask, 'Hi there!', "The string 'Hi there! was not stored");
    });
});