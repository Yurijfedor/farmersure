import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-family: Arial, sans-serif;
`;

export const TableHeader = styled.th`
  background-color: #f4f4f4;
  font-weight: bold;
  border: 2px solid #ddd;
  padding: 10px;
  text-align: center;
`;

export const TableCell = styled.td`
  border: 2px solid #ddd;
  padding: 10px;
  text-align: center;

  img {
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: #f1f1f1;
  }
`;
