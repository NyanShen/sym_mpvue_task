<template>
  <div class="popup-wrap">
    <div class="popup-mask"></div>
    <div class="popup-inner">
      <div class="popup-header">
        <span>预约日期选择</span>
        <i class="icon-close"></i>
      </div>
      <div class="popup-content">
        <div class="weeks">
          <ul>
            <li v-for="(item, index) in weekLabels" :key="index">
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
        <div class="calendar">
          <div class="months">
              <p>{{ monthData.showMonth }}</p>
          </div>
          <div class="days">
            <ul>
              <li v-for="(item, index) in monthData.remainDays" :key="index">
                <p class="day">{{ item.showDate }}</p>
              </li>
            </ul>
          </div>
          <div class="months">
              <p>{{ nextMonthData.showMonth }}</p>
          </div>
          <div class="days">
            <ul>
              <li
                v-for="(item, index) in nextMonthData.remainDays"
                :key="index"
              >
                <p class="day">{{ item.showDate }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    showDate: {
      type: Boolean,
      required: false,
      default: true,
    },
  },

  data() {
    return {
      weekLabels: ["日", "一", "二", "三", "四", "五", "六"],
      monthData: {
        fisrtIndex: 0,
        showMonth: "",
        remainDays: [],
      },
      nextMonthData: {
        fisrtIndex: 0,
        showMonth: "",
        remainDays: [],
      },
    };
  },
  created() {
    let self = this;
    self.buildCalendarData();
  },
  methods: {
    /**
     * 显示隐藏日期组件
     */
    toggle() {
      this.$emit("toggle", false);
    },
    buildCalendarData() {
      let self = this;
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let toDay = date.getDate();

      self.monthData = self.getMonthData(year, month, toDay);
      let nextMonth = 0;
      if (month === 12) {
        year = year + 1;
        nextMonth = 1;
      } else {
        nextMonth = month + 1;
      }
      self.nextMonthData = self.getMonthData(year, nextMonth, 1);
    },
    getMonthData(year, month, initShowDate) {
      let self = this;
      let remainDays = [];
      let monthLength = new Date(year, month, 0).getDate() - initShowDate;
      let dateString = `${year}-${month}-${initShowDate}`;
      let firstIndex = self.getWeekDay(dateString).day;
      for (let i = 0; i <= monthLength + firstIndex; i++) {
        if (firstIndex > i) {
          remainDays.push({});
        } else {
          remainDays.push({
            showDate: initShowDate,
          });
          initShowDate++;
        }
      }
      let showMonth = `${year}年${self.zeroPadding(month, 2)}月`;
      return {
        showMonth,
        firstIndex,
        remainDays,
      };
    },
    getWeekDay(date) {
      if (!date) {
        return;
      }
      let week = 0;
      let day = new Date(date).getDay();
      switch (day) {
        case 0:
          week = "星期日";
          break;
        case 1:
          week = "星期一";
          break;
        case 2:
          week = "星期二";
          break;
        case 3:
          week = "星期三";
          break;
        case 4:
          week = "星期四";
          break;
        case 5:
          week = "星期五";
          break;
        case 6:
          week = "星期六";
          break;
        default:
      }
      return {
        day,
        week,
      };
    },
    zeroPadding(num, digit) {
      let len = num.toString().length;
      while (len++ < digit) {
        num = "0" + num;
      }
      return num.toString();
    },
  },
};
</script>

<style scoped>
.popup-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translateY(100%);
  transition: all 0.2s;
  z-index: 998;
}
.show {
  transform: translateY(0);
}
.popup-mask {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
}

.popup-inner {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 961px;
  background-color: #ffffff;
  border-radius: 20px 20px 0 0;
}
.popup-header {
  position: relative;
  text-align: center;
  height: 51px;
  line-height: 51px;
  font-size: 18px;
}
.popup-content {
  padding: 15px 0;
}
.weeks {
  padding-bottom: 10px;
}
ul {
  font-size: 0;
}
ul li {
  display: inline-block;
  width: 14.2%;
  font-weight: 400;
  text-align: center;
}
.weeks li {
  color: #999999;
}
.days ul {
  padding-bottom: 28px;
}
.days li {
  padding-top: 26px;
}
.days li .day {
  font-size: 14px;
  color: #000033;
  margin-bottom: 2px;
}

.calendar {
  height: 380px;
  overflow: auto;
}
.months {
  padding: 0 10px;
}

.months>p {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 15px;
  background-color: rgba(34, 121, 234, 0.05);
}
</style>