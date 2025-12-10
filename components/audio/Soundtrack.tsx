import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';

export default function Soundtrack() {

    const [sound, setSound] = useState<Audio.Sound>();

    useEffect(() => {
    async function playSound() {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: true,
        });

        const { sound: newSound } = await Audio.Sound.createAsync(
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          require('../../assets/music/bgm.m4a'),
          { 
            shouldPlay: true, 
            isLooping: true,
            volume: 0.5,
          }
        );
        
        setSound(newSound);
      } catch (error) {
        console.error("Error loading soundtrack:", error);
      }
    }

    playSound();

    return () => {
      if (sound) {
        sound.unloadAsync(); 
      }
    };
  }, []);

  return null;

}