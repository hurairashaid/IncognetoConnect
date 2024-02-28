import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import DiamondIcon from "@mui/icons-material/Diamond";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import IssueDetailModal from "./IssueDetailModel";
import ResolvedIssueDetailModel from "./ResolvedIssueDetailModel";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import duetlogo from "../duetlogo.png";
export default function IssueUpvote() {
  const categoryRequired = sessionStorage.getItem("category");
  const [issues, setIssues] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [status, setStatus] = useState("UNRESOLVED");
  const [open, setOpen] = useState(false);
  console.log(issues);
  const [viewResolvedIssue, setViewResolvedIssue] = useState(false);
  const [detailIssueValues, setDetailIssueValues] = useState([]);
  const duetId = sessionStorage.getItem("duetId");
  const handleOpen = (title, description, category) => {
    setOpen(true);
    setDetailIssueValues([title, description, category]);
  };
  const handleClose = () => setOpen(false);
  const handleOpenResolved = (resolveDescription, category) => {
    console.log("a");
    setViewResolvedIssue(true);
    setDetailIssueValues([resolveDescription, category]);
  };
  const handleCloseResolved = () => {
    console.log("b");
    setViewResolvedIssue(false);
  };
  const getData = async () => {
    axios
      .post(
        `http://${
          import.meta.env.VITE_REACT_APP_URL
        }:2000/api/students//issueUpvotedWindow`,
        {
          userId: duetId,
        }
      )
      .then((response) => {
        setIssues(response.data);
      });
  };
  console.log(issues);
  const getResolvedIssues = () => {
    setStatus("RESOLVED");
  };
  const getUnresolvedIssue = () => {
    setStatus("UNRESOLVED");
  };
  const issueUnvote = (_id, studentId) => {
    axios
      .post(
        `http://${
          import.meta.env.VITE_REACT_APP_URL
        }:2000/api/students/issueUnvote`,
        {
          id: _id,
          studentId: studentId,
        }
      )
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
  }, [refresh, status]);
  return (
    <>
      <Box>
        {open && (
          <IssueDetailModal
            data={detailIssueValues}
            handleClose={handleClose}
          />
        )}
        {viewResolvedIssue && (
          <ResolvedIssueDetailModel
            data={detailIssueValues}
            handleCloseResolved={handleCloseResolved}
          />
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid grey",
            paddingBottom: "25px"
          }}
        >
          {console.log(issues)}
          <h1
            style={{
              fontSize: "1.1rem",
              borderBottom: "1px solid grey",
              paddingBottom: "1px",
            }}
            className="text-2xl font-mono"
          >
            Issue Upvoted
          </h1>
          <FormControl variant="standard">
            <Select
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              IconComponent={FilterAltIcon}
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
                getContentAnchorEl: null,
              }}
              style={{ fontSize: "1.1rem", letterSpacing: "1px" }}
            >
              <MenuItem value={10}>
                <button onClick={() => getUnresolvedIssue()}>Unresolved</button>
              </MenuItem>
              <MenuItem value={20}>
                <button onClick={() => getResolvedIssues()}>Resolved</button>
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        {issues
          .sort((a, b) => b.upvotes.length - a.upvotes.length)
          ?.filter((issues) => issues.status === status)
          .map((e, i) => {
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
                    {e?.status === "UNRESOLVED" ? (
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
                  {e?.status === "RESOLVED" ? (
                    <Button
                      style={{
                        borderColor: "white",
                        color: "rgb(255, 40, 40)",
                        marginTop: "25px",
                        backgroundColor: "white",
                        fontWeight: "800",
                        borderRadius: "30px",
                        width: "100%",
                      }}
                      variant="outlined"
                      onClick={() =>
                        handleOpenResolved(e?.resolveDescription, e?.category)
                      }
                    >
                      RESOLVED BY {e?.resolveby}
                    </Button>
                  ) : null}
                </Box>
              </Box>
            );
          })}
      </Box>
    </>
  );
}
