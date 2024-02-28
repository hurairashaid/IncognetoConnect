import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";

export default function ActivatedIssues() {
  const role = sessionStorage.getItem("role");
  const duetId = sessionStorage.getItem("duetId");
  const [issues, setIssues] = useState([]);
  const [open, setOpen] = useState(false);
  const [resolveIssueValues, setResolveIssueValues] = useState([]);
  const [refresh, setRefresh] = useState(false);
  

  const getData = async () => {
    console.log("a");
    axios
      .post("http://localhost:2000/api/controller/activatedIssues", {
        role: role,
      })
      .then((response) => {
        setIssues(response.data);
        setRefresh(true);
      });
  };

 
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
                <Typography>
                  <strong>upvotes:</strong> {e?.upvotes.length}
                </Typography>
                <Typography>
                  <strong>status:</strong> {e?.status}
                </Typography>
              
              </Box>
            </Box>
          );
        })}
      </Box>
    </>
  );
}
