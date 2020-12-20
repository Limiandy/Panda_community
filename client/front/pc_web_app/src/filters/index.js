import day from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
day.extend(relativeTime);
const moment = date => {
  if (day(date).isBefore(day().subtract(7, "days"))) {
    return day(date).format("YYYY-MM-DD");
  } else {
    return day(date)
      .locale("zh-cn")
      .from(day());
  }
};

const currentTime = date => {
  return day(date).format("YYYY-MM-DD HH:mm:ss");
};

export { moment, currentTime };
