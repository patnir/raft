import express from "express";

const app = express();
const port = 3001; // Set the port to listen on, you can customize this for each node

// Store the addresses of other Raft nodes in the cluster
const raftNodes = [
  "http://raft_node_1:3001", // Replace with the address of the first Raft node
  "http://raft_node_2:3001", // Replace with the address of the second Raft node
  "http://raft_node_3:3001", // Replace with the address of the third Raft node
];

// API endpoint to handle incoming pings
app.get("/ping", (req, res) => {
  console.log(`Received a ping from ${req.query.sender}`);
  res.send("Pong!");
});

// Function to send a ping to another Raft node
const sendPing = async (recipient: string) => {
  try {
    const response = await fetch(`${recipient}/ping?sender=${port}`);
    const data = await response.text();
    console.log(`Received response from ${recipient}: ${data}`);
  } catch (error) {
    console.error(`Error pinging ${recipient}: ${error}`);
  }
};

// Periodically send pings to other Raft nodes (e.g., every 5 seconds)
setInterval(() => {
  raftNodes.forEach((node) => sendPing(node));
}, 5000);

// Start the Raft node server
app.listen(port, () => {
  console.log(`Raft node running on port ${port}`);
});
