import Web3 from "web3";

const web3 = new Web3("http://127.0.0.1:7545");

const TaskContractAddress = "0x051F52d098a8cbBc381eaF45B6357d7E3b77772F";

const TaskContractABI = [
  {
    inputs: [],
    name: "clearTasks",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_task",
        type: "string",
      },
    ],
    name: "deleteTask",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_task",
        type: "string",
      },
    ],
    name: "setTasks",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getTasks",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const TaskContract = new web3.eth.Contract(
  TaskContractABI,
  TaskContractAddress
);

const getAccounts = async () => {
  const accounts = await web3.eth.getAccounts();
  return accounts[0];
};

const account = await getAccounts();

const setTask = async (task) => {
  await TaskContract.methods.setTasks(task).send({ from: account });
  alert("Successfully Added Task!");
};

const getTasks = async () => {
  const tasks = await TaskContract.methods.getTasks().call();

  if (tasks.length > 0) {
    return tasks;
  }
};

const clearTasks = async () => {
  await TaskContract.methods.clearTasks().send({ from: account });
};

const deleteTask = async (task) => {
  await TaskContract.methods.deleteTask(task).send({ from: account });
  await getTasks();
};

export { setTask, getTasks, clearTasks, deleteTask };
