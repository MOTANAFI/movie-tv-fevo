import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import apiConfig from '../api/apiConfig';
import axios from 'axios';

SwiperCore.use([Autoplay]);

const TvHero = () => {
  const fetchTVSeries = async () => {
    const { data } = await axios.get(
      `${apiConfig.baseUrl}/tv/popular/?api_key=${apiConfig.apiKey}`
    );
    return data.results;
  };

  const { data: items = [] } = useQuery('tvSeries', fetchTVSeries);

  return (
    <Swiper
      modules={[Autoplay]}
      grabCursor={true}
      spaceBetween={0}
      slidesPerView={1}
    >
      {items.map((item) => (
        <SwiperSlide key={item.id}>
          <Box
            sx={{
              backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.46), rgba(0, 0, 0, 0.46)), url(${apiConfig.originalImage(
                item.backdrop_path
              )})`,
              backgroundRepeat: 'no-repeat',
              position: 'relative',
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
              color: 'white',
              height: '80vh',
              display: 'flex',
              justifyContent: 'left',
              alignItems: 'center',
            }}
          >
            <Container>
              <Box >
                <Container sx={{ display: 'flex', flexDirection: 'column' }}>
                  <motion.h1
                    style={{
                      fontSize: '2.4rem',
                      lineHeight: '1.1',
                      fontWeight: '700',
                      color: 'gold',
                    }}
                    initial={{
                      y: -50,
                      opacity: 0
                    }}
                    animate={{
                      y: 0,
                      opacity: 1
                    }}
                    transition={{ delay: 2 }}
                  >
                    {item.name}
                  </motion.h1>
                  <motion.p
                    style={{
                      paddingTop: '.4em',
                      maxWidth: '600px',
                      lineHeight: '1.2',
                      fontWeight: '500',
                    }}
                    animate={{
                      y: 0,
                    }}
                    initial={{
                      y: 50,
                    }}
                    transition={{
                      delay: 2,
                    }}
                  >
                    {item.overview}
                  </motion.p>
                </Container>
              </Box>
            </Container>
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TvHero;
