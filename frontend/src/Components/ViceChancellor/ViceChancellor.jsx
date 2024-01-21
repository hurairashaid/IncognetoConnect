import React from 'react'
import issues from "../../Issues.json";
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import axios from "axios";
import { useEffect } from 'react';
const ViceChancellor = () => {
  const [issues, setIssues] = useState([]);
  const categoryRequired = sessionStorage.getItem("category");
  const getData = async () => {
    axios
      .post("http://localhost:2000/api/issue/forwardToVCWindow", {
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
      <h1 className='text-2xl font-mono'>ISSUE FORWARDED TO VC</h1>
      <Box>
        {
          issues?.map((e, i) => {
            return (
              <Box key={i}>
               
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", border: "2px solid black", padding: 10, textAlign: "center", mt: 5 }}>
                    <Typography variant='h6'><strong>Title:</strong> {e?.title}</Typography>
                    <Typography ><strong>Description:</strong> {e?.description}</Typography >
                    <Typography ><strong>Upvotes:</strong> {e?.upvotes.length}</Typography>
                  </Box>
                 
                
              </Box>
            )
          })
        }
      </Box>
    </>
  )
}

export default ViceChancellor