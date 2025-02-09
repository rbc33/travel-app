const checkForDate = (date: string) => {
  console.log('::: Running checkForUrl :::', date);
  const today = new Date();

  if (date > (today as unknown as string)) {
    return true;
  } else {
    alert('Enter a valid date');
  }
};

export {checkForDate};
