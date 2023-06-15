import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CircularProgress, Container, Grid, Box, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import apiConfig from '../api/apiConfig';

const MovieDetails = () => {
  const { movieId } = useParams();

  const fetchMovieDetails = async () => {
    const response = await axios.get(`${apiConfig.baseUrl}/movie/${movieId}?api_key=${apiConfig.apiKey}`);
    return response.data;
  };

  const fetchCast = async () => {
    const response = await axios.get(`${apiConfig.baseUrl}/movie/${movieId}/credits?api_key=${apiConfig.apiKey}`);
    return response.data.cast.slice(0, 5);
  };

  const movieDetailsQuery = useQuery(['movieDetails', movieId], fetchMovieDetails);
  const castQuery = useQuery(['cast', movieId], fetchCast);

  const movie = movieDetailsQuery.data;
  const cast = castQuery.data?.slice(0,6);

  if (movieDetailsQuery.isLoading || castQuery.isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress style={{ color: 'gold' }} />
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.46), rgba(0, 0, 0, .96)), url(${apiConfig.originalImage(
          movie.backdrop_path
        )})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        paddingTop: '2.725rem',
        width: '100%',
      }}
    >
      <Container sx={{ padding: '2.4rem' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <img
              src={apiConfig.w500Image(movie.poster_path)}
              alt={movie.title}
              style={{ height: '500px', width: '100%', borderRadius: '.51rem', marginTop: '2.1rem' }}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h4" sx={{ color: 'gold' }}>
              {movie.title}
            </Typography>
            <Typography variant="subtitle1" gutterBottom sx={{ color: 'gold' }}>
              Release Date: {movie.release_date}
            </Typography>
            <Typography sx={{ color: '#ffff', fontWeight: 'semi-bold' }}>{movie.overview}</Typography>
            {/* cast crew */}
            <Grid container spacing={2} style={{ marginTop: '1.6rem' }}>
              {cast.map((actor) => (
                <Grid
                  item
                  key={actor.id}
                  xs={6}
                  sm={4}
                  md={2}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                    style={{ borderRadius: '.51rem', height: '200px', width: '100%', paddingTop: '1.2rem' }}
                  />
                  <Typography style={{ color: 'gold' }}>{actor.name}</Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
       
          </Grid>
      </Container>
    </div>
  );
};
export default MovieDetails;