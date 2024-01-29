import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";

export default function IssueUpvote() {
  const categoryRequired = sessionStorage.getItem("category");
  const [issues, setIssues] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const duetId = sessionStorage.getItem("duetId");

  const getData = async () => {
    axios
      .post("http://localhost:2000/api/students//issueUpvotedWindow", {
        userId: duetId,
      })
      .then((response) => {
        setIssues(response.data);
      });
  };
  console.log(issues);

  const issueUnvote = (_id, studentId) => {
    axios
      .post("http://localhost:2000/api/students/issueUnvote", {
        id: _id,
        studentId: studentId,
      })
      .then((response) => {
        if (refresh === true) {
          setRefresh(false);
        } else {
          setRefresh(true);
        }
      });
  };
  useEffect(() => {
    getData();
  }, [refresh]);
  return (
    <>
      <Box>
        {console.log(issues)}
        <h1 className="text-2xl font-mono">Issue Created</h1>
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
                <Typography>
                  {e?.forwardVC === true ? (
                    <strong>Forwarded To Vice Chancellor</strong>
                  ) : null}
                </Typography>
                {e?.upvotes.includes(duetId) === false ? (
                  <Button
                    variant="contained"
                    onClick={() => issueUpvote(e?._id, duetId)}
                  >
                    Upvotes
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => issueUnvote(e?._id, duetId)}
                  >
                    Unvotes
                  </Button>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </>
  );
}
