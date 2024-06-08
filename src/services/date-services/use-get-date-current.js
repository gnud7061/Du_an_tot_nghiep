

export default function useDateCurrent(){

    const year = new Date().getFullYear();

    // console.log('year :' + year);

    let month = new Date().getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }

    // console.log('month :' + month);

    let date = new Date().getDate();

    if (date < 10) {
        date = '0' + date;
    }

    // console.log('date :' + date);

    const hour = new Date().getHours();

    // console.log('hour :' + hour);

    const minutes = new Date().getMinutes();

    const secounds = new Date().getSeconds();
    // console.log('mines :' + minutes);

    const formattedDate = `${year}-${month}-${date} ${hour}:${minutes}:${secounds}`;

    // console.log(formattedDate);

    return formattedDate;
}