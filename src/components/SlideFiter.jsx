import React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Filter from './Filter';


function SlideFiter(props) {
    const {open,setOpen}=props
    
      const toggleDrawer = (Open) => (event) => {
        setOpen(Open);
      };
    
      const list = () => (
        <Box
          sx={{ width: 'auto' }}
          role="presentation"
        >

          <Filter/>
        </Box>
      );
    
      return (
        <>
              <SwipeableDrawer
                anchor={"left"}
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}

              >
                {list()}
              </SwipeableDrawer>
        </>
      );
}

export default SlideFiter
