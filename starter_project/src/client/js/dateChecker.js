function checkForDate(date) {
    console.log("::: Running checkForUrl :::", date);
    const today = new Date();

    if(date > today) {
        return true;
    }
    else {
        alert("Enter a valid date");
    }
}

export { checkForDate };