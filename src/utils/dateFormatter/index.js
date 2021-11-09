const formatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
});
export default {
  convertDate: function(date) {
    console.log("Hi", date);
    // const date = new Date(date)
    const parts = date.split("T");

    return formatter.format(new Date(date));
  },
};
