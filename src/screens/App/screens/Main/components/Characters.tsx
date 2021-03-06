import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ICharacter } from 'api';
import FavoriteIcon from '@mui/icons-material/Favorite';

type CharTableProps = {
  characters: ICharacter[],
  favCharIds: number[],
  handleOnCharClick: (id: number) => void,
}

export const Characters: React.FC<CharTableProps> = ({ characters, favCharIds, handleOnCharClick }) => {
  return (
    <>
      <TableContainer sx={{ maxWidth: 600 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left"></TableCell>
              <TableCell align="left">Full Name</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {characters.map((char: ICharacter) => (
              <TableRow onClick={() => handleOnCharClick(char.id)}
                key={char.id}
                sx={{ cursor: 'pointer', '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" sx={{ width: 65 }}>
                  <img src={char.image} alt='avatar' style={{ height: '65px', borderRadius: '50%' }} />
                  {favCharIds.includes(char.id) &&
                    <FavoriteIcon sx={{ position: 'absolute', height: 15, marginLeft: -1, color: "#f08080" }} />}
                </TableCell>
                <TableCell align="left">{char.name}</TableCell>
                <TableCell align="right">{char.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
