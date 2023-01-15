import { useMemo, useCallback } from 'react';
import { Button, Box } from '@chakra-ui/react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

type Image = {
  id: string;
  title: string;
  description: string;
  url: string;
  ts: number;
};

type IImagesResponse = {
  after: string;
  data: Array<Image>;
};

export default function Home(): JSX.Element {
  // async function loadImages({ pageParam = null }): Promise<IImagesResponse> {
  //   const response = await api('/api/images', {
  //     params: {
  //       after: pageParam,
  //     },
  //   });

  //   return response.data;
  // }

  const loadImages = useCallback(async ({ pageParam = null }) => {
    const response = await api.get('/api/images', {
      params: { after: pageParam },
    });

    return response.data as IImagesResponse;
  }, []);

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', loadImages, {
    getNextPageParam: lastPage => lastPage.after || null,
  });

  const formattedData = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY
    const formattedImages = data?.pages.flatMap(imageData => {
      return imageData.data.flat();
    });

    return formattedImages;
  }, [data]);

  // TODO RENDER LOADING SCREEN
  if (isLoading && !isError) {
    return <Loading />;
  }

  // TODO RENDER ERROR SCREEN
  if (!isLoading && isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
        {hasNextPage && (
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            marginTop="6"
          >
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
