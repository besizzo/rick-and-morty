import { ICharacter } from 'api';
import { useLocation } from 'react-router-dom'
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableRow, IconButton } from '@mui/material';
import SentimentVeryDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentVeryDissatisfiedOutlined';
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';
import { containerStyles } from '../../Main/components/Main'
import { ChartActionsType, ChartActions } from 'screens/App/reducer';

type CharProps = {
  dispatch: React.Dispatch<ChartActions>,
  favCharIds: number[],
}

const getDateCreated = (info: ICharacter) => {
  const date = new Date(info.created).toDateString().split(' ');
  date.shift();
  return date.join('-')
};

export const Character: React.FC<CharProps> = ({ dispatch, favCharIds }) => {
  const location = useLocation();
  const charInfo = location.state as ICharacter
  const dateCreated = getDateCreated(charInfo)

  const rows = [
    {
      title: 'Species:',
      value: charInfo.species,
    },
    {
      title: 'Gender:',
      value: charInfo.gender,
    },
    {
      title: 'Location:',
      value: charInfo.location.name,
    },
    {
      title: 'Status:',
      value: charInfo.status,
    },
    {
      title: 'Created:',
      value: dateCreated,
    },
    {
      title: 'Episodes:',
      value: charInfo.episode.length.toString(),
    },
  ]

  const handleAddToFavList = () => {
    dispatch({
      type: ChartActionsType.ADD_FAV,
      payload: charInfo.id,
    })
  }
  const handleRemoveFromFavList = () => {
    dispatch({
      type: ChartActionsType.REMOVE_FAV,
      payload: charInfo.id,
    })
  }


  return (
    <Box sx={containerStyles}>
      <Typography variant='h4' py={2}>
        {charInfo.name}
      </Typography>
      <Box>
        <img src={charInfo.image} alt='avatar' style={{ maxWidth: 600, border: '1px solid black' }} />
      </Box>
      <Box sx={{ display: 'flex' }}>
        <IconButton sx={{ marginX: 5 }} onClick={handleAddToFavList}>
          <InsertEmoticonOutlinedIcon sx={{ fontSize: '40px', color: '#76c893' }} />
        </IconButton>
        <IconButton sx={{ marginX: 5 }} onClick={handleRemoveFromFavList}>
          <SentimentVeryDissatisfiedOutlinedIcon sx={{ fontSize: '40px', color: '#f9844a' }} />
        </IconButton>
      </Box>
      <TableContainer sx={{ maxWidth: 500 }}>
        <Table aria-label="simple table" >
          <TableBody>
            {rows.map(row => {
              return (
                <TableRow style={{ padding: '10px' }} key={row.value}>
                  <TableCell align="left"><Typography variant='subtitle1' component='p'>{row.title}</Typography></TableCell>
                  <TableCell align="center"><Typography variant='subtitle1' component='p'>{row.value}</Typography></TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box >
  );
};
