import { useState } from 'react';
import { useMutation } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import { IoMdSearch } from 'react-icons/io';
import PropTypes from 'prop-types';

import ModalCommon from 'src/components/modals/Common';
import InputCommon from 'src/components/inputs/Common';
import IconButton from 'src/components/buttons/IconButton';
import SearchedTechStacksModal from 'src/components/modals/SearchedTechStacksModal';
import { Row, Col } from 'src/components/Grid';

import userAtom from 'src/recoil/user';
import dashboardUserInfoAtom from 'src/recoil/dashboardUserInfo';

import { StackType } from 'src/types';

import { Fetcher } from 'src/utils';

import { Title, Label, Content } from './style';

interface Props {
  onClose: () => void;
}

function DashboardTechStacksSettingModal({ onClose }: Props) {
  const user = useRecoilValue(userAtom);
  const [dashboardUserInfo, setDashboardUserInfo] = useRecoilState(dashboardUserInfoAtom);
  const [techStacks, setTechStacks] = useState<{ [field: string]: StackType[] }>(
    dashboardUserInfo.techStacks ?? {},
  );
  const [newField, setNewField] = useState('');
  const [techStack, setTechStack] = useState('');
  const [isModalShow, setIsModalShow] = useState(false);
  const fields = Object.keys(techStacks);
  const { mutate } = useMutation(
    () => Fetcher.putDashboardUserInfo(user, { ...dashboardUserInfo, techStacks }),
    {
      onSuccess: (dashboard) => {
        setDashboardUserInfo(dashboard);
        onClose();
      },
    },
  );

  const handleConfirm = () => {
    mutate();
  };

  const switchIsModalShow = () => {
    setIsModalShow((prevState) => !prevState);
  };

  const handleSelect = (newTechStack: StackType) => {
    const newTechStacks = { ...techStacks };
    if (newTechStacks[newField]) {
      newTechStacks[newField] = [...newTechStacks[newField], newTechStack];
    } else {
      newTechStacks[newField] = [newTechStack];
    }
    setTechStack(newTechStack.techStack!);
    setTechStacks(newTechStacks);
  };

  return (
    <ModalCommon
      width={800}
      onConfirm={handleConfirm}
      onClose={onClose}
      confirm='저장'
      close='취소'
    >
      <Row>
        <Col>
          <Row alignItems='center'>
            <Label>field</Label>
            <InputCommon bind={[newField, setNewField]} placeholder='' width={150} />
          </Row>
          <Row alignItems='center'>
            <Label>tech stack</Label>
            <InputCommon bind={[techStack, setTechStack]} placeholder='' width={150} />
            <IconButton onClick={switchIsModalShow}>
              <IoMdSearch />
            </IconButton>
            {isModalShow && (
              <SearchedTechStacksModal
                techStack={techStack}
                onClose={switchIsModalShow}
                onSelect={handleSelect}
              />
            )}
          </Row>
        </Col>
        <Col>
          <Title>Tech Stacks</Title>
          <Col>
            {fields.map((field) => (
              <Col key={field} alignItems='center'>
                <p>{field}</p>
                <Row>
                  {techStacks[field].map((stack) => (
                    <Content color={stack.color!} key={stack.techStack}>
                      {stack.techStack}
                    </Content>
                  ))}
                </Row>
              </Col>
            ))}
          </Col>
        </Col>
      </Row>
    </ModalCommon>
  );
}

DashboardTechStacksSettingModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default DashboardTechStacksSettingModal;
