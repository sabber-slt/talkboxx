import useRecorder from '../../lib/useRecorder';
import RecorderControls from './Record';

const AudioScreen = ({ newsid }) => {
  const { recorderState, ...handlers } = useRecorder();
  const { audio } = recorderState;
  console.log(audio);

  return (
    <div>
      {/* <button onClick={playA}>dddddddddd</button> */}
      {/* <RecordingsList audio={audio} /> */}
      <audio controls>
        <source src={audio} type="audio/mp3" />
      </audio>
      <div>
        <RecorderControls
          newsid={newsid}
          recorderState={recorderState}
          handlers={handlers}
        />
      </div>
    </div>
  );
};

export default AudioScreen;
