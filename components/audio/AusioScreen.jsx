import useRecorder from '../../lib/useRecorder';
import RecorderControls from './Record';

const AudioScreen = ({ newsid }) => {
  const { recorderState, ...handlers } = useRecorder();
  const { audio } = recorderState;
  console.log(audio);

  return (
    <RecorderControls
      newsid={newsid}
      recorderState={recorderState}
      handlers={handlers}
    />
  );
};

export default AudioScreen;
