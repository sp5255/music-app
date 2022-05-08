import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { SET_PLAY_NOW } from "../actions";
import SongRow from "./SongRow";

const SongTable = ({ songList }) => {
    const dispatch = useDispatch();
    const store = useSelector((store) => store);

    console.log("store", store);
    console.log("songlist", songList);
    return (
        <TableContainer component={Paper}>
            <Table
                sx={{
                    minWidth: 650,
                    /* "& *": {
                        color: "white !important",
                    }, */
                    "& td, & th": {
                        border: "none !important",
                    },
                }}
                aria-label="simple table"
            >
                {/* <TableHead>
                    <TableRow>
                        <TableCell>S.No.</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell align="right">Artists</TableCell>
                        <TableCell align="right">Duration</TableCell>
                    </TableRow>
                </TableHead> */}
                <TableBody>
                    {songList.map((song, ind) => {                        
                      
                        return (
                            <SongRow song = {song} ind = {ind} />
                           
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SongTable;
