import PropTypes from 'prop-types';

import ContentCommon from 'src/components/contents/Common';

import { DEFAULT_POST_CONTENT_WIDTH } from 'src/globals/constants';

interface Props {
  content: string;
  width?: number;
  expanded?: boolean;
}

function GitHubContent({ content, width, expanded }: Props) {
  return <ContentCommon content={content} width={width} expanded={expanded} />;
}

GitHubContent.propTypes = {
  content: PropTypes.string.isRequired,
  width: PropTypes.number,
  expanded: PropTypes.bool,
};

GitHubContent.defaultProps = {
  width: DEFAULT_POST_CONTENT_WIDTH,
  expanded: false,
};

export default GitHubContent;
