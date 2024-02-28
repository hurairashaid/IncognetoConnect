import React from "react";
// import '../../App.css'
import issues from "../../Issues.json";
import axios from "axios";
import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";

export default function IssuePanel() {
  const role = sessionStorage.getItem("role");
  const duetId = sessionStorage.getItem("duetId");
  const [issues, setIssues] = useState([]);
  const [open, setOpen] = useState(false);
  const [resolveIssueValues, setResolveIssueValues] = useState([]);
  const [refresh, setRefresh] = useState(false);
  

  const getData = async () => {
    console.log("a");
    axios
      .post("http://localhost:2000/api/controller/unactiveIssues", {
        role: role,
      })
      .then((response) => {
        setIssues(response.data);
        setRefresh(true);
      });
  };

  const activeIssue = async (_id) => {
    axios.post("http://localhost:2000/api/controller/activateIssues" , {
        id: _id,
        duetId : duetId
    })
    .then((response) => {
      refresh ? setRefresh(false) : setRefresh(true);
    }); 
    
  }
  useEffect(() => {
    getData();
  }, [refresh]);
  return (
    <>
      <Box>
        {open && (
          <ResolveIssueModal
            data={resolveIssueValues}
            handleClose={handleClose}
          />
        )}
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
               
                <Button variant="contained" onClick={() => activeIssue(e?._id )}>
                  Active this issue
                </Button>
              </Box>
            </Box>
          );
        })}
      </Box>
    </>
  );
}
