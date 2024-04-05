import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";

export default function App() {
  return (
    <Table className="" hideHeader aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>NAME</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>Tony Reichert</TableCell>
        </TableRow>
        <TableRow key="2">
          <TableCell>Zoey Lang</TableCell>
        </TableRow>
        <TableRow key="3">
          <TableCell>Jane Fisher</TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell>Texto?</TableCell>
          
        </TableRow>
      </TableBody>
    </Table>
  );
}
