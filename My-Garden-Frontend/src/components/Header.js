import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'




const useStyles = makeStyles((theme) => ({
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    menuButton: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(3),
    },
    title: {
        flexGrow: 1,
    },
    linkButton: {
        marginLeft: theme.spacing(3)
    },
    logoLink: {
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'none',
        },
    },

}));

function Header() {
    const classes = useStyles();
    return (
        <>
            <AppBar
                position='static'
                color='inherit'
                elevation={0}
                className={classes.appBar}
            >
                <ToolBar>
                    <Typography variant="h6" noWrap className={classes.title}>
                        <Link to="/" className={classes.logoLink} color="inherit">My Garden</Link>
                    </Typography>
                </ToolBar>
            </AppBar>
        </>
    );
}

export default Header;