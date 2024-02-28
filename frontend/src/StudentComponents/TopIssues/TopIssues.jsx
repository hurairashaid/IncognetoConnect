import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import DiamondIcon from "@mui/icons-material/Diamond";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import IssueDetailModal from "./IssueDetailModel";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

export default function TopIssues() {
  const categoryRequired = sessionStorage.getItem("category");
  const [issues, setIssues] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [detailIssueValues, setDetailIssueValues] = useState([]);
  const [open, setOpen] = useState(false);

  const duetId = sessionStorage.getItem("duetId");
  const handleOpen = (title, description, category) => {
    setOpen(true);
    setDetailIssueValues([title, description, category]);
  };
  const handleClose = () => setOpen(false);
  const getData = async () => {
    axios
      .get(`http://${import.meta.env.VITE_REACT_APP_URL}:2000/api/students/topIssues`)
      .then((response) => {
        setIssues(response.data);
      });
  };
  console.log(issues);
  const issueUpvote = (_id, studentId) => {
    axios
      .post(`http://${import.meta.env.VITE_REACT_APP_URL}:2000/api/students/issueUpvote`, {
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
  const issueUnvote = (_id, studentId) => {
    axios
      .post(`http://${import.meta.env.VITE_REACT_APP_URL}:2000/api/students/issueUnvote`, {
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
        {open && (
          <IssueDetailModal
            data={detailIssueValues}
            handleClose={handleClose}
          />
        )}
        {console.log(issues)}
        <h1 style={{fontSize:"1.1rem" , textAlign:"Center"}}className="text-2xl font-mono">Issue Around Univeristy</h1>
        {issues
          .sort((a, b) => b.upvotes.length - a.upvotes.length)
          ?.map((e, i) => {
            return (
              <Box key={i}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    textAlign: "center",
                    padding: "20px",
                    borderRadius: "30px",
                    backgroundColor: "#1e1d1d",
                    color: "white",
                    mt: 5,
                  }}
                >
                  {e?.forwardVC === true ? (
                    <DiamondIcon
                      style={{
                        position: "relative",
                        bottom: "35px",
                        right: "140px",
                        color: "#cd3333",
                        fontSize: "50px",
                      }}
                    />
                  ) : null}
                  <AssuredWorkloadIcon style={{ fontSize: "5rem" }} />
                  <Typography
                    style={{
                      fontWeight: "400",
                      fontSize: "1rem",
                      lineHeight: "1.45",
                      letterSpacing: "0.008em",
                      textAlign: "center",
                      marginBottom: "20px",
                    }}
                    variant="h6"
                  >
                    {e?.category}
                  </Typography>
                  <Typography
                    style={{
                      fontWeight: "400",
                      fontSize: "1rem",
                      lineHeight: "1.45",
                      letterSpacing: "0.008em",
                      textAlign: "center",
                    }}
                    variant="h6"
                  >
                    {e?.title}
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      marginTop: "20px",
                    }}
                  >
                    {e?.upvotes.includes(duetId) === true ? (
                      <Button
                        onClick={() => issueUnvote(e?._id, duetId)}
                        style={{
                          backgroundColor: "#931e1e",
                          borderColor: "#931e1e",
                          color: "white",
                          fontSize: "14px",
                          width: "30%",
                          borderRadius: "20px",
                          fontWeight: "800",
                        }}
                        variant="outlined"
                        startIcon={<ThumbDownIcon />}
                      >
                        {e?.upvotes.length}
                      </Button>
                    ) : (
                      <Button
                        onClick={() => issueUpvote(e?._id, duetId)}
                        style={{
                          backgroundColor: "white",
                          borderColor: "white",
                          color: "#312e2e",
                          fontSize: "14px",
                          width: "30%",
                          borderRadius: "20px",
                          fontWeight: "800",
                        }}
                        variant="outlined"
                        startIcon={<ThumbUpIcon />}
                      >
                        {e?.upvotes.length}
                      </Button>
                    )}
                    <Button
                      onClick={() =>
                        handleOpen(e?.title, e?.description, e?.category)
                      }
                      style={{
                        backgroundColor: "white",
                        borderColor: "white",
                        color: "#312e2e",
                        fontSize: "14px",
                        width: "60%",
                        borderRadius: "20px",
                        fontWeight: "800",
                      }}
                      variant="outlined"
                      startIcon={<DisplaySettingsIcon />}
                    >
                      Details
                    </Button>
                  </div>
                </Box>
              </Box>
            );
          })}
      </Box>
    </>
  );
}
