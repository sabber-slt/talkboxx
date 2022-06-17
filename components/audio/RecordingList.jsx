import useRecordingsList from '../../record/use-recordings-list';

export default function RecordingsList({ audio }) {
  const { recordings, deleteAudio } = useRecordingsList(audio);

  return (
    <div className="">
      {recordings.length > 0 ? (
        <>
          <h1>Your recordings</h1>
          <div className="">
            {recordings.map((record) => (
              <div className="" key={record.key}>
                <audio controls src={record.audio} />
                <div className="">
                  <button
                    className=""
                    title=""
                    onClick={() => deleteAudio(record.key)}
                  >
                    deleteee
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="">
          noreee
          <span>You do have records</span>
        </div>
      )}
    </div>
  );
}
