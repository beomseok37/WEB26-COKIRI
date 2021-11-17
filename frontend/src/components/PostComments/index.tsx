import { useState } from 'react';
import PropTypes from 'prop-types';

import Comment from 'src/components/Comment';
import ButtonCommon from 'src/components/buttons/Common';

import { CommentType } from 'src/types';

import { Wrapper } from './style';

interface Props {
  postID: string;
  comments: CommentType[];
  detail: boolean;
}

function PostComments({ postID, comments, detail }: Props) {
  const [isExpand, setIsExpand] = useState(detail);
  const isLong = comments.length > 2;
  const handleClick = () => {
    setIsExpand(true);
  };
  return (
    <Wrapper>
      {isExpand
        ? comments.map((comment) => <Comment key={comment._id} postID={postID} comment={comment} />)
        : comments
            .slice(0, 2)
            .map((comment) => <Comment key={comment._id} postID={postID} comment={comment} />)}
      {!isExpand && isLong && <ButtonCommon onClick={handleClick}>댓글 더보기</ButtonCommon>}
    </Wrapper>
  );
}

PostComments.propTypes = {
  postID: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.any).isRequired,
  detail: PropTypes.bool,
};

PostComments.defaultProps = {
  detail: false,
};

export default PostComments;
