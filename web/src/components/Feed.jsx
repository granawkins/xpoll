import {useState, useEffect} from 'react'
import axios from 'axios'
import FeedCard from './FeedCard'
import { Container, Box, Typography, Button } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const Feed = ({username}) => {

  const theme = useTheme()

  // GET Feed
  const [feed, setFeed] = useState(null)
  const [sortBy, setSortBy] = useState('top')
  const refreshFeed = () => {
    axios.post('/api/feed', {username: username, sort_by: sortBy})
    .then((res) => {
      setFeed(res.data.data)
    })
  }
  useEffect(() => {
    if (username !== null) {
      refreshFeed()
    }
  }, [username, sortBy])

  return (
    <Container maxWidth='xs'>
      <Box alignItems='center' display='flex' justifyContent='center'>
        <Button
          sx={{color: 'black', fontWeight: sortBy === 'top' ? 800 : 400}}
          onClick={() => setSortBy('top')}
        >Top</Button>
        &nbsp;/&nbsp;
        <Button
          sx={{color: 'black', fontWeight: sortBy === 'new' ? 800 : 400}}
          onClick={() => setSortBy('new')}
        >New</Button>
      </Box>
      {feed && feed.map(p => <FeedCard
        poll={p}
        username={username}
        key={`feed-card-${p.poll_id}`}
      />)}
    </Container>
  )
}

export default Feed
