import { useState, useCallback } from 'react';
import { SimpleGrid, useDisclosure } from '@chakra-ui/react';

import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE
  const { isOpen, onClose, onOpen } = useDisclosure();

  // TODO SELECTED IMAGE URL STATE
  const [selectedImageUrl, setSelectedImageUrl] = useState('');

  // TODO FUNCTION HANDLE VIEW IMAGE
  const handleImageView = useCallback(
    (imageUrl: string) => {
      onOpen();
      setSelectedImageUrl(imageUrl);
    },
    [onOpen]
  );

  return (
    <>
      {/* TODO CARD GRID */}
      <SimpleGrid column={[1, 2, 3]} spacing="40px">
        {cards.map(card => (
          <Card key={card.id} data={card} viewImage={handleImageView} />
        ))}
      </SimpleGrid>

      {/* TODO MODALVIEWIMAGE */}
      <ModalViewImage
        imgUrl={selectedImageUrl}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}
