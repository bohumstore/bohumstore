import React, { useEffect, useState } from 'react';
import { Fireworks } from 'fireworks/lib/react';

interface FireworksEffectProps {
  show: boolean;
  duration?: number; // milliseconds, default 2000
}

const FireworksEffect: React.FC<FireworksEffectProps> = ({ show, duration = 2000 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), duration);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [show, duration]);

  const fxProps = {
    count: 1,
    interval: 400,
    bubbleSizeMinimum: 4,
    bubbleSizeMaximum: 8,
    bubbleSpeedMinimum: 2,
    bubbleSpeedMaximum: 4,
    colors: [
      '#ff3b30', // red
      '#ff9500', // orange
      '#ffcc00', // yellow
      '#4cd964', // green
      '#5ac8fa', // sky blue
      '#007aff', // blue
      '#5856d6', // purple
      '#ff2d55', // pink
      '#fff',    // white
      '#34c759', // lime
      '#af52de', // violet
      '#ffd60a', // gold
      '#00c7be', // teal
      '#ff375f', // magenta
    ],
    calc: (props: any, i: number) => ({
      ...props,
      x: window.innerWidth / 2,
      y: 180
    })
  };

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      width: '100vw',
      height: '100vh',
      top: 0,
      left: 0,
      pointerEvents: 'none',
      zIndex: 9999
    }}>
      <Fireworks
        {...fxProps}
      />
    </div>
  );
};

export default FireworksEffect; 