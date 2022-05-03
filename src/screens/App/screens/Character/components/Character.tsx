import { useState, useEffect } from 'react';
import { fetchCharactersById, ICharacter } from 'api';
import { useLocation } from 'react-router-dom'

interface LocationState {
  id: number,
}

export const Character = () => {
  const [id, setId] = useState<number>()
  const [charInfo, setCharInfo] = useState<ICharacter>();
  const location = useLocation();
  const state = location.state as LocationState
  setId(state.id)

  const test = async () => {
    const char = await fetchCharactersById(state.id)
    console.log(char)
  }

  useEffect(() => {
    if (!id) return
    //fetchCharactersById(state.id)
    test();
  }, [])
  console.log(state)
  return (
    <div>hello</div>
  )
}