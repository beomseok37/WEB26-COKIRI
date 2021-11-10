import React, { useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useMutation } from 'react-query';
import PropTypes from 'prop-types';

import Modal from 'src/components/modals/Common';
import ImageUploadButton from 'src/components/buttons/ImageUploadButton';
import ImageForm from 'src/components/forms/ImageForm';

import { Fetcher } from 'src/utils';

import userAtom from 'src/recoil/user';

import { Textarea, Wrapper } from './style';

interface Props {
  onClose: () => void;
}

function PostModal({ onClose }: Props) {
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const user = useRecoilValue(userAtom);
  const mutation = useMutation(() => Fetcher.postPost(user, content), {
    onSuccess: () => onClose(),
  });

  const handleConfirm = () => {
    mutation.mutate();
  };

  const handleTextareaChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  }, []);

  const handleImageUpload = useCallback((image: string) => {
    setImages((prevState) => {
      if (prevState.length < 3) {
        return [...prevState, image];
      }
      return prevState;
    });
  }, []);

  const handleImageDelete = useCallback((index) => {
    setImages((prevState) => prevState.filter((image, i) => i !== index));
  }, []);

  return (
    <Wrapper>
      <Modal close='취소' confirm='확인' onConfirm={handleConfirm} onClose={onClose}>
        <ImageUploadButton onImageUpload={handleImageUpload} />
        <Textarea autoFocus value={content} onChange={handleTextareaChange} />
        <ImageForm images={images} onDelete={handleImageDelete} />
      </Modal>
    </Wrapper>
  );
}

PostModal.propTypes = {
  onClose: PropTypes.func,
};

PostModal.defaultProps = {
  onClose: () => {},
};

export default PostModal;
