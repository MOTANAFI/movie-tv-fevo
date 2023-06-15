import { Box, Container, InputBase, Pagination, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import axios from 'axios';
import React, { Suspense, useState } from 'react';
import { Link } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import apiConfig from '../api/apiConfig';
const DynamicTvHero = React.lazy(() => import('../components/TvHero'))

const TVSeriesList = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const { data: tvSeriesData } = useQuery(['tvSeries', page], () =>
    axios
      .get(`${apiConfig.baseUrl}/tv/popular/?api_key=${apiConfig.apiKey}&page=${page}`)
      .then((response) => response.data)
  );

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scroll(0, 450);
  };

  const searchTVSeries = () => {
    if (!tvSeriesData) return [];
    return tvSeriesData.results.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <Box>
      <Box sx={{ backgroundColor: 'black', paddingBottom: '1.4rem', paddingTop: '1.4rem' }}>
        <Suspense fallback={<div>loading...</div>}>
        <DynamicTvHero />
        </Suspense>
        <Container>
          <Box sx={{ backgroundColor: 'white', borderRadius: 1.3, marging:'2.2rem' }}>
            <InputBase
              placeholder="search TV series"
              sx={{
                color: 'black',
                paddingLeft: '.51rem',
                '&::placeholder': {
                  color: 'black',
                },
              }}
              value={query}
              onChange={handleChange}
            />
          </Box>
        </Container>
        <Box>
          <Container sx={{ display: 'flex', flexWrap: 'wrap', gap: '1.2rem', justifyContent: 'center' }}>
            {searchTVSeries().map((item) => {
              const firstAirDate = new Date(item?.first_air_date);
              const year = firstAirDate.getFullYear();

              return (
                <Link to={`/tv-sserie/${item.id}`} key={item.id}>
                  <Box
                    sx={{
                      position: 'relative',
                      backgroundImage: `url(${apiConfig.originalImage(item?.poster_path)})`,
                      height: '350px',
                      width: '250px',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                      marginTop: '1.2rem',
                      borderRadius: '.5rem',
                      cursor: 'pointer',
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Typography
                        sx={{
                          position: 'absolute',
                          padding: '.125rem',
                          borderRadius: '.14rem',
                          fontWeight: 'bold',
                          top: '.6rem',
                          left: '.6rem',
                          color: 'black',
                          backgroundColor: 'gold',
                        }}
                      >
                        Featured
                      </Typography>
                      <Typography
                        sx={{
                          position: 'absolute',
                          padding: '.125rem',
                          borderRadius: '.14rem',
                          fontWeight: 'bold',
                          bottom: '.6rem',
                          left: '.6rem',
                          color: 'black',
                          backgroundColor: 'gold',
                        }}
                      >
                        {year}
                      </Typography>
                      <Typography
                        sx={{
                          position: 'absolute',
                          display: 'flex',
                          alignItems: 'center',
                          padding: '.125rem',
                          borderRadius: '.14rem',
                          fontWeight: 'bold',
                          bottom: '.6rem',
                          right: '.6rem',
                          color: 'black',
                          backgroundColor: 'gold',
                          }}
                          >
                          <StarIcon sx={{ marginRight: '0.2rem' }} />
                          {item?.vote_average}
                          </Typography>
                          </Box>
                          </Box>
                          </Link>
                          );
                          })}
                          {tvSeriesData && (
                          <Pagination
                          onChange={handlePageChange}
                          count={tvSeriesData.total_pages}
                          sx={{
                          '& .MuiPaginationItem-root': {
                          color: 'gold',
                          },
                          '& .Mui-selected': {
                          backgroundColor: 'red',
                          color: 'white',
                          },
                          }}
                          />
                          )}
                          </Container>
                          </Box>
                          </Box>
                          </Box>
                          );
                          };
                          
                          export default TVSeriesList;
                          
                         