export  const calculateFormatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} minutes`;
    } else if (minutes < 1440) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      if (remainingMinutes === 0) {
        return `${hours} ${hours === 1 ? "hour" : "hours"}`;
      }
      return `${hours} ${
        hours === 1 ? "hour" : "hours"
      } ${remainingMinutes} minutes`;
    } else {
      return "1 day";
    }
  };