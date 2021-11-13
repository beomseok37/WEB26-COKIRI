import { useState } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { useMutation } from 'react-query';

import Card from 'src/components/cards/Common';
import Input from 'src/components/inputs/Common';
import ImageInput from 'src/components/inputs/ImageInput';
import { Row, Col } from 'src/components/Grid';

import { UserType } from 'src/types';

import { DEFAULT_PROFILE_IMAGE } from 'src/globals/constants';

import { Fetcher } from 'src/utils';

import { Wrapper, ImageHolder, ImageCover, SaveButton } from './style';

interface Props {
  user: UserType;
}

function UserSettingsCard({ user }: Props) {
  const [profileImage, setProfileImage] = useState(user.profileImage ?? DEFAULT_PROFILE_IMAGE);
  const [username, setUsername] = useState(user.username ?? '');
  const [name, setName] = useState(user.name ?? '');
  const [bio, setBio] = useState(user.bio ?? '');
  const mutation = useMutation(() =>
    Fetcher.putUserSettings(user, { profileImage, username, name, bio }),
  );

  const handleClick = () => {
    mutation.mutate();
  };

  const handleImageUpload = (url: string) => {
    setProfileImage(url);
  };

  return (
    <Wrapper>
      <Card width={812}>
        <Col justifyContent='start'>
          <ImageHolder>
            <ImageInput onImageUpload={handleImageUpload}>
              <ImageCover>변경</ImageCover>
            </ImageInput>
            <Image width={168} height={168} src={profileImage} />
          </ImageHolder>
          <Row>
            <p>username</p>
            <Input bind={[username, setUsername]} placeholder={user.username} />
          </Row>
          <Row>
            <p>name</p>
            <Input bind={[name, setName]} placeholder={user.name} />
          </Row>
          <Row>
            <p>bio</p>
            <Input bind={[bio, setBio]} placeholder={user.bio} />
          </Row>
          <SaveButton onClick={handleClick}>저장</SaveButton>
        </Col>
      </Card>
    </Wrapper>
  );
}

UserSettingsCard.prototype = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default UserSettingsCard;
