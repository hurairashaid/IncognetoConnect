import React from 'react'
// import '../../App.css'
import issues from "../../Issues.json";
import axios from 'axios';

axios.get('http://localhost:2000/api/issue/topIssuesWindow')
  .then((response) => {
    console.log(response);
  });

import { Box, Typography } from '@mui/material';
const TopIssues = () => {
  return (
    <>
      <Box>
        <h1 className='text-2xl font-mono'>TOP 10 ISSUES</h1>
        {
          issues?.map((e, i) => {
            return (
              <Box key={i}>
                {(e?.resolve === "null" && e?.VC === false) ? 
                <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",border:"2px solid black",padding:10,textAlign:"center",mt:5}}>
                  <Typography  variant='h6'><strong>Title:</strong> {e?.title}</Typography>
                  <Typography ><strong>Description:</strong> {e?.description}</Typography >
                  <Typography ><strong>Upvotes:</strong> {e?.upvotes}</Typography>
                  <Typography ><strong>Category:</strong> {e?.category}</Typography>
                </Box>
                  : "Not Found"
                }
              </Box>
            )
          })
        }
      </Box>
    </>
  )
}

export default TopIssues