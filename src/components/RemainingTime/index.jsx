import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { Colors } from '../../constants/theme';

const RemainingTime = ({ durationInDays }) => {
  const calculateRemainingTime = (durationInDays) => {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + durationInDays);

    let remainingTime = endDate - new Date();

    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    remainingTime -= days * (1000 * 60 * 60 * 24);

    const hours = Math.floor(remainingTime / (1000 * 60 * 60));
    remainingTime -= hours * (1000 * 60 * 60);

    const minutes = Math.floor(remainingTime / (1000 * 60));

    return { days, hours, minutes };
  };

  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime(durationInDays));

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(prevTime => {
        const newTime = calculateRemainingTime(durationInDays);
        
        return newTime;
      });
    }, 60000); // Update every minute

    return () => {
      clearInterval(interval);
    };
  }, [durationInDays]);

  return (
    <Text style={{color: Colors.primary.darkgray, fontWeight: '500'}}>

      {remainingTime.days === 0 && remainingTime.hours === 0 && remainingTime.minutes === 0
        ? 'Time expired'
        : `Time left: ${remainingTime.days} day${remainingTime.days !== 1 ? 's' : ''}, ${remainingTime.hours} hour${remainingTime.hours !== 1 ? 's' : ''}, ${remainingTime.minutes} minute${remainingTime.minutes !== 1 ? 's' : ''}`}
    </Text>
  );
};

export default RemainingTime;
