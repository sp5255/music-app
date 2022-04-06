import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const SongTable = ({songList}) => {

    console.log(songList)

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
                            <TableCell align="right">{song.artistName}</TableCell>
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
