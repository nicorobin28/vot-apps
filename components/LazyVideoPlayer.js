// LazyVideoPlayer.js
import React, {useEffect, useRef, useState} from 'react';
import {View, Dimensions, StyleSheet, ActivityIndicator} from 'react-native';
import VideoPlayer from 'react-native-video-controls';

const screenHeight = Dimensions.get('window').height;

const LazyVideoPlayer = ({source, scrollY}) => {
  const viewRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [layoutReady, setLayoutReady] = useState(false);

  const checkIfInView = () => {
    if (viewRef.current) {
      viewRef.current.measure((x, y, width, height, pageX, pageY) => {
        const buffer = 100;
        const visibleTop = pageY >= -buffer && pageY <= screenHeight + buffer;
        const visibleBottom =
          pageY + height >= -buffer && pageY + height <= screenHeight + buffer;
        setIsInView(visibleTop || visibleBottom);
      });
    }
  };

  useEffect(() => {
    if (layoutReady) {
      checkIfInView();
    }
  }, [scrollY, layoutReady]);

  const handleLayout = () => {
    // Tunggu sejenak agar layout benar-benar siap sebelum ukur posisi
    setTimeout(() => {
      setLayoutReady(true);
    }, 50); // bisa dituning sesuai device
  };

  return (
    <View ref={viewRef} style={styles.videoWrapper} onLayout={handleLayout}>
      {isInView ? (
        <VideoPlayer
          source={source}
          style={styles.video}
          paused={true}
          muted={true}
          repeat={true}
          tapAnywhereToPause={true}
          disableFullscreen={true}
          disableVolume={true}
          disableBack={true}
          controlTimeout={1500}
          seekColor="#eef4ff"
        />
      ) : (
        <View style={styles.skeleton}>
          <ActivityIndicator size="large" color="#CDE1FF" />
        </View>
      )}
    </View>
  );
};

export default LazyVideoPlayer;

const styles = StyleSheet.create({
  videoWrapper: {
    marginVertical: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: 300,
    backgroundColor: '#e4ecf8ff',
  },
  skeleton: {
    height: 300,
    width: '100%',
    backgroundColor: '#e2e2e2',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
