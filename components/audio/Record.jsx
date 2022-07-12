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
        mutation MyMutation($userid:Int,$newsString:String,$voice:String) {
          insert_voice_one(object: {userid:$userid , newsString: $newsString, voice: $voice}) {
            newsString
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
          newsString: newsid,
        },
      }),
    });
    const json = await res.json();
    console.log(json);
    clearAud();
    setShown(false);
    return json;
  };

  const play = () => {
    const pl = new Audio(aud);
    pl.play();
  };
  return (
    <>
      <Center display="flex" py="1" flexDirection="column" w="full">
        <Center my="3">
          {aud !== null && (
            <Button
              as={motion.button}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition="0.5s linear "
              transitionDelay={2}
              colorScheme="white"
              bg="rgba(186,0,191,1)"
              onClick={upload}
            >
              {!shown ? 'Upload' : 'Uploading...'}
            </Button>
          )}
        </Center>
        <HStack
          borderRadius={10}
          bg="purple.100"
          w="80"
          justifyContent="space-between"
        >
          <Center>
            <Image alt="" src={user ? user.img : ''} width={60} height={60} />
          </Center>
          <HStack>
            <Center w="44" borderRadius={70} bg="gray.100">
              <Center
                as={motion.div}
                whileTap={{ scale: 0.7 }}
                bg="gray.100"
                borderRadius={100}
              >
                {aud !== null && !initRecording && (
                  <audio controls style={{ width: 170 }}>
                    <source src={aud} type="audio/mpeg" />
                  </audio>
                )}
                {/* {aud !== null && (
                  <Image
                    alt=""
                    src={'/image/play.svg'}
                    width={37}
                    height={37}
                  />
                )} */}
              </Center>
              {initRecording && (
                <div>
                  <div>
                    <span>{formatMinutes(recordingMinutes)}</span>
                    <span>:</span>
                    <span>{formatSeconds(recordingSeconds)}</span>
                  </div>
                </div>
              )}
            </Center>

            <HStack w="16" py="1">
              <div
                title=""
                onClick={initRecording ? saveRecording : startRecording}
              >
                <Center userSelect="none" bg="gray.100" borderRadius={100}>
                  <Image
                    alt=""
                    userSelect="none"
                    src={
                      initRecording ? '/image/micoff.svg' : '/image/micon.svg'
                    }
                    width={55}
                    height={55}
                  />
                </Center>
              </div>
            </HStack>
          </HStack>
        </HStack>
      </Center>
    </>
  );
}
