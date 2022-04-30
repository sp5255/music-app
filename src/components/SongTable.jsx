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

const SongTable = ({ songList }) => {
    const dispatch = useDispatch();
    const store = useSelector((store) => store);

    console.log("store", store);
    console.log("songlist", songList);
    return (
        <TableContainer component={Paper} sx={{ background: "initial" }}>
            <Table
                sx={{
                    minWidth: 650,
                    "& *": {
                        color: "white !important",
                    },
                    "& td, & th": {
                        border: "none !important",
                    },
                }}
                aria-label="simple table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell>S.No.</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell align="right">Artists</TableCell>
                        <TableCell align="right">Duration</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {songList.map((song, ind) => (
                        <TableRow
                            key={song.id}
                            hover={true}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                                "&:hover": {
                                    background:
                                        "rgb(189 189 189 / 15%) !important",
                                },
                            }}
                        >
                            <TableCell>{ind + 1}</TableCell>
                            <TableCell>{song.name}</TableCell>
                            <TableCell align="right">
                                {song.artistName}
                            </TableCell>
                            <TableCell align="right">
                                <button
                                    style={{ background: "black" }}
                                    onClick={() => {
                                        console.log(song);
                                        dispatch(SET_PLAY_NOW(song));
                                    }}
                                >
                                    Play
                                </button>
                            </TableCell>
                            {/* <TableCell align="right">{row.calories}</TableCell> */}
                            {/* <TableCell align="right">{row.fat}</TableCell> 
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SongTable;
