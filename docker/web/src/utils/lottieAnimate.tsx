import React from 'react';
import Lottie from 'react-lottie';

interface LottieAnimateProps {
  fileAnimate: unknown;
  width?: number;
  height?: number;
}

const LottieAnimate: React.FC<LottieAnimateProps> = ({
  fileAnimate,
  width = 200,
  height = 200,
}) => {
  return (
    <Lottie
      options={{
        loop: true,
        autoplay: true,
        animationData: fileAnimate,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        },
      }}
      isPaused={false}
      isStopped={false}
      width={width}
      height={height}
    />
  );
};

export default LottieAnimate;
