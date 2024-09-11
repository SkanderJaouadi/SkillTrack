import React from 'react';
import { LinearProgress, Typography, Box } from '@mui/material';

const ProgressBar = ({ dataKpi,nameKpi }) => {
    return (
        <Box sx={{ width: '100%', padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
                {nameKpi}
            </Typography>
            <LinearProgress variant="determinate" value={dataKpi} />
            <Typography variant="caption" color="textSecondary" align="center">
                {dataKpi}%
            </Typography>
        </Box>
    );
};

export default ProgressBar;
