import { Button, Center, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { formatMinutes, formatSeconds } from '../../lib/format-time';
import useAud from '../../utils/store/useAud';
import useUser from '../../utils/store/useUser';

export default function RecorderControls({ recorderState, handlers, newsid }) {
  const { recordingMinutes, recordingSeconds, initRecording } = recorderState;
  const { startRecording, saveRecording } = handlers;
  const { user } = useUser();
  const { aud, clearAud } = useAud();
  const [shown, setShown] = useState(false);

  const upload = async () => {
    setShown(true);
    const res = await fetch('https://talkbox.hasura.app/v1/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Hasura-Role': 'public',
      },
      body: JSON.stringify({
        query: `
        mutation MyMutation($userid:Int,$newsid:Int,$voice:String) {
          insert_voice_one(object: {userid:$userid , newsid: $newsid, voice: $voice}) {
            newsid
            userid
            id
            users {
              id
              img
            }
          }
        }

               `,
        variables: {
          userid: parseInt(user.id),
          voice: aud,
          newsid: newsid,
        },
      }),
    });
    const json = await res.json();
    clearAud();
    setShown(false);
    return json;
  };

  const play = () => {
    if (aud) {
      const pl = new Audio(aud);
      pl.play();
    }
  };
  return (
    <>
      <Center>
        {aud !== null && (
          <Button
            as={motion.button}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition="0.5s linear "
            transitionDelay={2}
            colorScheme="white"
            bg="rgba(186,0,191,0.7)"
            onClick={upload}
          >
            {!shown ? 'Upload' : 'Uploading...'}
          </Button>
        )}
      </Center>
      <HStack
        borderRadius={10}
        bg="purple.100"
        w="full"
        justifyContent="space-between"
        px="5"
      >
        <Center w="16">
          <Image alt="" src={user ? user.img : ''} width={60} height={60} />
        </Center>
        <HStack>
          <Center w="48" h="14" borderRadius={70} bg="gray.100">
            <Center
              as={motion.div}
              whileTap={{ scale: 0.7 }}
              onClick={play}
              bg="gray.100"
              borderRadius={100}
            >
              <Image alt="" src={'/image/play.svg'} width={40} height={40} />
            </Center>

            <div>
              <div>
                {initRecording && <div></div>}
                <span>{formatMinutes(recordingMinutes)}</span>
                <span>:</span>
                <span>{formatSeconds(recordingSeconds)}</span>
              </div>
            </div>
          </Center>

          <HStack w="16">
            <div
              title=""
              disabled={recordingSeconds === 0}
              onClick={initRecording ? saveRecording : startRecording}
            >
              <Center bg="gray.100" borderRadius={100}>
                <Image
                  alt=""
                  src={initRecording ? '/image/micoff.svg' : '/image/micon.svg'}
                  width={60}
                  height={60}
                />
              </Center>
            </div>
          </HStack>
        </HStack>
      </HStack>
    </>
  );
}
