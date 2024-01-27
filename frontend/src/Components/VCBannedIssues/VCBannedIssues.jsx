import React from "react";
import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

const VCBannedIssues = () => {
  const [issues, setIssues] = useState([]);
  const categoryRequired = sessionStorage.getItem("category");
  console.log(issues);
  const getData = async () => {
    axios
      .get("http://localhost:2000/api/officeVC/bannedIssue")
      .then((response) => {
        setIssues(response.data);
      });
  };
  useEffect(() => {
    getData();
  },);
  return (
    <>
      <h1 className="text-2xl font-mono">VC RESOLVED ISSUE</h1>
      <Box>
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
              </Box>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default VCBannedIssues;
