import React, { useRef, useState, useEffect } from 'react';
import sectionApi from '../../api/sectionApi';

interface ListeningControllerProps {
  startTime?: number;
  volume?: number;
  audioSource: string;
  testId: any;
}

export default function ListeningController({
  startTime = 0,
  volume = 100,
  audioSource,
  testId,
}: ListeningControllerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(startTime);
  const [currentVolume, setCurrentVolume] = useState<number>(volume);
  const [sectionTimestamps, setSectionTimestamps] = useState<string[]>([]);
  const [currentPart, setCurrentPart] = useState<number>(0); // Phần hiện tại, bắt đầu từ 0

  const parsedTimestamps = sectionTimestamps.map((time) => {
    const parts = time.split(':').map(Number).reverse();
    return (parts[0] || 0) + (parts[1] || 0) * 60 + (parts[2] || 0) * 3600;
  });

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await sectionApi.getAll(testId);
        if (Array.isArray(response)) {
          setSectionTimestamps(response.map((section: any) => section.timeStamp));
        }
      } catch (error: any) {
        console.error('Error occurs: ' + error.message);
      }
    };
    fetchSections();
  }, [testId]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = startTime;
    }
  }, [startTime]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = currentVolume / 100;
    }
  }, [currentVolume]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current && !audioRef.current.paused) {
        const time = audioRef.current.currentTime;
        setCurrentTime(time);

        // Xác định phần hiện tại
        const currentIndex = parsedTimestamps.findIndex((timestamp, index) => {
          const nextTimestamp = parsedTimestamps[index + 1] || Infinity;
          return time >= timestamp && time < nextTimestamp;
        });

        if (currentIndex !== -1 && currentIndex !== currentPart) {
          setCurrentPart(currentIndex);
        }
      }
    }, 500);

    return () => clearInterval(interval);
  }, [parsedTimestamps, currentPart]);

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = Number(e.target.value);
    if (audioRef.current) {
      const duration = audioRef.current.duration;
      audioRef.current.currentTime = (newProgress / 100) * duration;
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const seekBackward = () => {
    if (audioRef.current) {
      const previousSection = parsedTimestamps
        .slice(0, currentPart)
        .reverse()
        .find((time) => time < currentTime);

      if (previousSection !== undefined) {
        audioRef.current.currentTime = previousSection;
        setCurrentTime(previousSection);
        setCurrentPart(parsedTimestamps.findIndex((time) => time === previousSection));
      }
    }
  };

  const seekForward = () => {
    if (audioRef.current) {
      const nextSection = parsedTimestamps
        .slice(currentPart + 1)
        .find((time) => time > currentTime);

      if (nextSection !== undefined) {
        audioRef.current.currentTime = nextSection;
        setCurrentTime(nextSection);
        setCurrentPart(parsedTimestamps.findIndex((time) => time === nextSection));
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setCurrentVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '40px',
        padding: '20px',
        width: '100%',
      }}
    >
      <audio ref={audioRef} controls hidden>
        <source src={audioSource} type="audio/mp3" />
        Your browser does not support the audio tag.
      </audio>

      <h1 style={{ fontSize: '32px', color: 'rgb(0, 31, 128)', margin: '0px' }}>PART {currentPart + 1}
      </h1>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
        <img src={require('../../assets/left.png')} alt="seek-backward" onClick={seekBackward} />
        {isPlaying ? (
          <img src={require('../../assets/pause.png')} alt="pause-icon" onClick={togglePlayPause} />
        ) : (
          <img src={require('../../assets/play.png')} alt="play-icon" onClick={togglePlayPause} />
        )}
        <img src={require('../../assets/right.png')} alt="seek-forward" onClick={seekForward} />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '5px',
          width: '50%',
        }}
      >
        <span>{formatTime(currentTime)}</span>
        <input
          id="progress"
          type="range"
          min="0"
          max="100"
          value={
            audioRef.current && audioRef.current.duration
              ? (currentTime / audioRef.current.duration) * 100
              : 0
          }
          onChange={handleProgressChange}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={require('../../assets/speaker.png')} alt="speaker-icon" />
        <input
          id="volume"
          type="range"
          min="0"
          max="100"
          value={currentVolume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
}
