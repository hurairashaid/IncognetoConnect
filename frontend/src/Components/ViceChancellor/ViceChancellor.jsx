import React from 'react'
import issues from "../../Issues.json";
import { Box, Typography } from '@mui/material';
const ViceChancellor = () => {
  return (
    <>
      <h1 className='text-2xl font-mono'>VICE CHANCELLOR</h1>
      <Box>
        {
          issues?.map((e, i) => {
            return (
              <Box key={i}>
                {(e?.resolve === "null" && e?.VC === true) ?
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", border: "2px solid black", padding: 10, textAlign: "center", mt: 5 }}>
                    <Typography variant='h6'><strong>Title:</strong> {e?.title}</Typography>
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

export default ViceChancellor