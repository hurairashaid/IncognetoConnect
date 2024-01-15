import React from 'react'
// import '../../App.css'
import issues from "../../Issues.json";
import axios from 'axios';
import { useState ,useEffect } from 'react';
import { Box, Typography } from '@mui/material';
const TopIssues = () => {
const categoryRequired = sessionStorage.getItem("category");
const [issues,setIssues] = useState([])

const getData = async () => {
  axios.post('http://localhost:2000/api/issue/topIssuesWindow' , {category : categoryRequired })
  .then((response) => {
    setIssues(response.data)
  });
}

useEffect(() => {
   getData();
}, []);
  return (
    <>
      <Box>
        <h1 className='text-2xl font-mono'>TOP 10 ISSUES</h1>
        {
          issues?.map((e, i) => {
            return (
              <Box key={i}>
               
                <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",border:"2px solid black",padding:10,textAlign:"center",mt:5}}>
                  <Typography  variant='h6'><strong>Title:</strong> {e?.title}</Typography>
                  <Typography ><strong>Description:</strong> {e?.description}</Typography >
                  <Typography ><strong>Upvotes:</strong> {e?.upvotes.length}</Typography>
                  <Typography ><strong>Category:</strong> {e?.category}</Typography>
                  <button onClick={() => forwardVC(e?._id)}>Forward to VC</button>
                </Box>
                
              </Box>
            )
          })
        }
      </Box>
    </>
  )
}

export default TopIssues