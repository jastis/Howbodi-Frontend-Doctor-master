export const getHourAndMinute = (time) => {
  // "4:30 PM" ====> {hour: 4, minute: 30}
  if (!time) return {};

  const removedPMOrAM = time?.split(" ")?.[0];
  const hour = removedPMOrAM?.split(":")?.[0];
  const minute = removedPMOrAM?.split(":")?.[1];
  return { hour, minute };
};
