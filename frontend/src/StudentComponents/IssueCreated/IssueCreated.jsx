import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function IssueCreated() {
  const categoryRequired = sessionStorage.getItem("category");
  const [issues, setIssues] = useState([]);
  const duetId = sessionStorage.getItem("duetId");

  const getData = async () => {
    axios
      .get(
        `http://localhost:2000/api/students/issueCreated?creatorid=${duetId}`
      )
      .then((response) => {
        setIssues(response.data);
      });
  };
  console.log(issues);
  const getUnactiveData = () => {
    axios
      .get(
        `http://localhost:2000/api/students/issueUnactive?creatorid=${duetId}`
      )
      .then((response) => {
        setIssues(response.data);
      });
  };
  const getBannedData = () => {
    axios
      .get(
        `http://localhost:2000/api/students/issueBanned?creatorid=${duetId}`
      )
      .then((response) => {
        setIssues(response.data);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Box>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 className="text-2xl font-mono">Issue Created</h1>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select displayEmpty inputProps={{ "aria-label": "Without label" }}>
              <MenuItem value={10}>
                <button onClick={() => getData()}>Issue Active</button>
              </MenuItem>
              <MenuItem value={20}>
                <button onClick={() => getUnactiveData()}>
                  Issue Unactive
                </button>
              </MenuItem>
              <MenuItem value={30}>
                <button onClick={() => getBannedData()}>Issue Banned</button>
              </MenuItem>
            </Select>
          </FormControl>
        </div>
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
                {e?.upvotes !== undefined ? (
                  <Typography>
                    <strong>Upvotes:</strong> {e?.upvotes.length}
                  </Typography>
                ) : null}

                <Typography>
                  <strong>Category:</strong> {e?.category}
                </Typography>
                {e?.status !== undefined ? (
                  <Typography>
                    <strong>Status:</strong> {e?.status}
                  </Typography>
                ) : null}
                {e?.resolveby !== undefined ? (
                  <Typography>
                    <strong>Resolved By:</strong> {e?.resolveby}
                  </Typography>
                ) : null}
                {e?.resolveDescription !== undefined  ? (
                  <Typography>
                    <strong>Resolved Description:</strong>{" "}
                    {e?.resolveDescription}
                  </Typography>
                ) : null}
              </Box>
            </Box>
          );
        })}
      </Box>
    </>
  );
}
