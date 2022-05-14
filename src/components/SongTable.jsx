import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { SET_PLAY_NOW } from "../actions";
import SongRow from "./SongRow";

const SongTable = ({ songList, album = false }) => {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);

    console.log("store", store);
  //   console.log("songlist", songList);
  return (
    <TableContainer component={Paper} sx={{ mb: 10 }}>
      <Table
        sx={{
          minWidth: 650,
          "& td, & th": {
            border: "none !important",
          },
        }}
        aria-label="simple table"
      >
        <TableBody>
          {songList.map((song, ind) => {
            return <SongRow song={song} ind={ind} album={album} key = {ind}/>;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SongTable;
