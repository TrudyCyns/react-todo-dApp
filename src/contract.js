import Web3 from "web3";

const web3 = new Web3("http://127.0.0.1:7545");

const TaskContractAddress = "0x3E98eAd12Df4C5A18A82216D05877B64565F0Fb8";

const TaskContractABI = [
  {
    inputs: [],
    name: "clearTasks",
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

export { setTask, getTasks, clearTasks };
