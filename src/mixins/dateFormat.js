const formatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
});
export default {
  methods: {
    formatDateTime: function(date) {
      return formatter.format(new Date(date));
    },
  },
};
