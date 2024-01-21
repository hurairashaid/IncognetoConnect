import React from 'react'
import { Box, Typography } from '@mui/material';
import { useState, useEffect } from "react";
import axios from "axios"

const ResolveIssue = () => {
  const [issues, setIssues] = useState([]);
  const categoryRequired = sessionStorage.getItem("category");
  console.log(issues)
  const getData = async () => {
    axios
      .post("http://localhost:2000/api/issue/resolveIssueWindow", {
        category: categoryRequired,
      })
      .then((response) => {
        setIssues(response.data);
      });
  };
  useEffect(() => {
    getData();
  }, [issues]);
  return (
    <>
      <h1 className='text-2xl font-mono'>RESOLVED ISSUE</h1>
      <Box>
        {
          issues?.map((e, i) => {
            return (
              <Box key={i}>
               
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", border: "2px solid black", padding: 10, textAlign: "center", mt: 5 }}>
                    <Typography variant='h6'><strong>Title:</strong> {e?.title}</Typography>
                    <Typography ><strong>Description:</strong> {e?.description}</Typography >
                    <Typography ><strong>Upvotes:</strong> {e?.upvotes.length}</Typography>
                    <Typography ><strong>Category:</strong> {e?.category}</Typography>
                    <Typography ><strong>Resolve by:</strong> {e?.resolveby}</Typography>
                    <Typography ><strong>Resolve Description:</strong> {e?.resolveDescription}</Typography>

                  </Box>
                 
                
              </Box>
            )
          })
        }
      </Box>
    </>
  )
}

export default ResolveIssue