import { ICharacter } from 'api';
import { useLocation } from 'react-router-dom'
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableRow, IconButton } from '@mui/material';
import { containerStyles } from '../../Main/components/Main'
import { ChartActionsType, ChartActions } from 'screens/App/reducer';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';

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
  ];

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

  const reactionButtons = () => {
    return (
      favCharIds.includes(charInfo.id) ?
        <>
          <IconButton sx={{ marginX: 5 }} onClick={handleAddToFavList}>
            <ThumbUpIcon sx={{ color: '#76c893', fontSize: '40px' }} />
          </IconButton>
          <IconButton sx={{ marginX: 5 }} onClick={handleRemoveFromFavList}>
            <ThumbDownOffAltOutlinedIcon sx={{ color: '#f08080', fontSize: '40px' }} />
          </IconButton>
        </>
        :
        <>
          <IconButton sx={{ marginX: 5 }} onClick={handleAddToFavList}>
            <ThumbUpOutlinedIcon sx={{ color: '#76c893', fontSize: '40px' }} />
          </IconButton>
          <IconButton sx={{ marginX: 5 }} onClick={handleRemoveFromFavList}>
            <ThumbDownIcon sx={{ color: '#f08080', fontSize: '40px' }} />
          </IconButton></>
    );
  };

  return (
    <Box sx={containerStyles}>
      <Typography variant='h4' py={2}>
        {charInfo.name}
      </Typography>
      <Box>
        <img src={charInfo.image} alt='avatar' style={{ maxWidth: 600, border: '1px solid black' }} />
      </Box>
      <Box sx={{ display: 'flex' }}>
        {reactionButtons()}
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
