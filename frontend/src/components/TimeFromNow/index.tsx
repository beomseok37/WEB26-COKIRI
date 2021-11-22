import PropTypes from 'prop-types';

import { moment } from 'src/utils';

import { Time } from './style';

interface Props {
  time: string | Date;
}

function TimeFromNow({ time }: Props) {
  const ago = moment.getFromNow(time);
  return <Time>{ago}</Time>;
}

TimeFromNow.propTypes = {
  time: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
};

TimeFromNow.defaultProps = {
  time: new Date().toString(),
};

export default TimeFromNow;
