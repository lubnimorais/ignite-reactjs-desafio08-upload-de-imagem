import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="4xl">
      <ModalOverlay />
      <ModalContent
        marginX="auto"
        width="auto"
        height="auto"
        maxWidth={['300px', '500px', '900px']}
        maxHeight={['350px', '450px', '600px']}
      >
        <ModalBody padding="0">
          <Image
            src={imgUrl}
            maxWidth={['300px', '500px', '900px']}
            maxHeight={['350px', '450px', '600px']}
          />
          <ModalFooter
            height="2rem"
            background="pGray.800"
            paddingY="20px"
            borderBottomRadius="5px"
          >
            <Link href={imgUrl} isExternal fontSize="1rem" marginRight="auto">
              Abrir original
            </Link>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
