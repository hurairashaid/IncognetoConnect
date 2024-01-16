import React from "react";
// import '../../App.css'
import issues from "../../Issues.json";
import axios from "axios";
import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
const TopIssues = () => {
  const categoryRequired = sessionStorage.getItem("category");
  const [issues, setIssues] = useState([]);

  const getData = async () => {
    axios
      .post("http://localhost:2000/api/issue/topIssuesWindow", {
        category: categoryRequired,
      })
      .then((response) => {
        setIssues(response.data);
      });
  };

  const forwardVC = (_id) => {
    axios.get(`http://localhost:2000/api/issue/forwardVC?id=${_id}`)
  };
  
  const resolveIssue = (_id) => {
    axios.get(`http://localhost:2000/api/issue/forwardVC?id=${_id}`)
  };
  

  useEffect(() => {
    getData();
  }, [issues]);
  return (
    <>
      <Box>
        <h1 className="text-2xl font-mono">TOP 10 ISSUES</h1>
        {issues?.map((e, i) => {
          return (
            <Box key={i}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  border: "2px solid black",
                  padding: 10,
                  textAlign: "center",
                  mt: 5,
                }}
              >
                <Typography variant="h6">
                  <strong>Title:</strong> {e?.title}
                </Typography>
                <Typography>
                  <strong>Description:</strong> {e?.description}
                </Typography>
                <Typography>
                  <strong>Upvotes:</strong> {e?.upvotes.length}
                </Typography>
                <Typography>
                  <strong>Category:</strong> {e?.category}
                </Typography>
                <Button variant="contained" onClick={() => forwardVC(e?._id)}>Forward to VC</Button>
                <Button variant="contained" onClick={() => resolveIssue(e?._id)}>Resolve Issue</Button>
              </Box>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default TopIssues;
