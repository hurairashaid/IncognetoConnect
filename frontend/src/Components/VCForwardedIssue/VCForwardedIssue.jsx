import React from "react";
import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import ResolveIssueModal from "./ResolveIssueModel";

const ResolveIssue = () => {
  const [issues, setIssues] = useState([]);
  const [open, setOpen] = useState(false);
  const [resolveIssueValues, setResolveIssueValues] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const handleOpen = (id, title, description) => {
    setOpen(true);
    setResolveIssueValues([id, title, description]);
  };
  const handleClose = () => setOpen(false);

  const categoryRequired = sessionStorage.getItem("category");
  console.log(issues);
  const getData = async () => {
    axios
      .get("http://localhost:2000/api/officeVC/forwardedIssue")
      .then((response) => {
        setIssues(response.data);
      });
  };
  useEffect(() => {
    getData();
  }, [refresh]);
  return (
    <>
      {open && (
        <ResolveIssueModal
          data={resolveIssueValues}
          handleClose={handleClose}
        />
      )}
      <h1 className="text-2xl font-mono">
        Issues Forwarded To Vice Chancellor Samreen Ali
      </h1>
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
                <Typography>
                  <strong>Creator:</strong> {e?.creator}
                </Typography>
                <Typography>
                  <strong>permitted by:</strong> {e?.permittedBy}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => handleOpen(e?._id, e?.title, e?.description)}
                >
                  Resolve Issue
                </Button>
              </Box>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default ResolveIssue;
