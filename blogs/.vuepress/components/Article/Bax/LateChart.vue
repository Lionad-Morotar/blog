<template>
  <div class="latechart fullscreen">
    <div class="charts-con">

      <table id="chart-week-count" class="charts-css column show-labels show-data-axes">
        <tbody>
          <tr v-for="rec in byDay" :key="String(rec.month)+rec.day">
            <th scope="row">
              <template v-if="isWorkday(rec)">
                {{ rec.month }} / {{ rec.day }}
                <div v-if="rec.weather === 'sun'" class="sun" />
                <div v-else-if="rec.weather === 'cloud'" class="cloud" />
                <div v-else class="rain"><div class="dot" /></div>
              </template>
            </th>
            <td :style="`--size: calc(${15 + (rec.record||[]).length * 15} / 120)`">
              <span class="data">
                <template v-if="rec.record">
                  <template v-for="r in rec.record">
                    {{ r.name }} <br :key="r.name" />
                  </template>
                </template>
                <template v-else>
                  -
                </template>
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- <table id="chart-money-count-day" class="charts-css line show-data-axes" style="--color: #ffe583;">
        <tbody>
          <tr v-for="(rec, recIDX) in byDay" :key="String(rec.month)+rec.day">
            <td :style='`
              --start: ${calcCapitalPercent(byDay[recIDX - 1], "start")};
              --size: ${calcCapitalPercent(rec, "end")}
            `'> <span class="data"> ￥{{rec.capital}} </span> </td>
          </tr>
        </tbody>
      </table> -->

      <table id="chart-money-count-all" class="charts-css line show-data-axes show-heading" style="--color: #f46565;">
        <caption style="height: 3em;"> <b>迟到概览</b>（基金总计 / 日统计详情） </caption>
        <tbody>
          <tr v-for="(rec, recIDX) in byDayOffset" :key="String(rec.month)+rec.day">
            <td :style='`
              --start: ${calcCapitalAllPercent(byDayOffset[recIDX - 1], "start")};
              --size: ${calcCapitalAllPercent(rec, "end")}
            `'> <span class="data"> ￥{{rec.capitalACC}} </span> </td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      raw: require('./late').default
    }
  },
  computed: {
    // 进行基本的数据清洗
    data () {
      const ensureX = x => {
        x.record = x.record || []
        x.weather = x.weather || 'sun'
        x.costs = (x.cost || []).reduce((h, c) => h + c.value, 0)
        return x
      }
      return this.raw.reduce((h, c) => {
        const last = h[h.length - 1]
        if (last) {
          c.weekday = last.weekday + 1
          if (c.weekday === 8) {
            c.weekday = 1
          }
        }
        h.push(ensureX(c))
        return h
      }, [])
    },
    // 按月维度划分数组
    splitByMonth () {
      return this.data.reduceRight((h, c) => {
        let lastMonth = h[h.length - 1]
        if (!lastMonth) {
          lastMonth = []
          h.push(lastMonth)
        }
        const lastDay = lastMonth[lastMonth.length - 1] || {}
        if (lastDay.day !== 1) {
          lastMonth.push(c)
        } else {
          h.push([c])
        }
        return h
      }, []).map(x => x.reverse()).reverse()
    },
    // 计算迟到基金情况
    withCapital () {
      return this.splitByMonth.reduce((h, month) => {
        const lateNameInMonthMap = {}
        const monthWithCapital = month.reduce((newMonth, day) => {
          const lastDay = newMonth[newMonth.length - 1]
          const lastCapital = lastDay?.capital || 0

          let dayCapital = day.record.reduce((h, rec) => {
            const name = rec.name
            const lastLateTime = lateNameInMonthMap[name]
            const curLateTime = lateNameInMonthMap[name] = lastLateTime
              ? lastLateTime + 1
              : 1
            switch (curLateTime) {
              case 1:
                return h
              case 2:
              case 3:
                return h + 20
              default:
                return h + 20
            }
          }, 0)

          // 如果一周都没迟到记录则二军出￥50
          // FIXME
          if (day.weekday === 5) {
            const lastWeekdays = newMonth.slice(-4)
            lastWeekdays.push(day)
            const workdays = lastWeekdays.filter(x => this.isWorkday(x))
            if (workdays.length >= 5) {
              if (!workdays.find(x => x.record.length > 0)) {
                dayCapital = 50
              }
            }
          }

          const dayWithCapital = {
            ...day,
            dayCapital: dayCapital - day.costs,
            capital: lastCapital + dayCapital
          }
          newMonth.push(dayWithCapital)
          return newMonth
        }, [])

        h.push(monthWithCapital)
        return h
      }, [])
    },
    withCapitalACC () {
      const flattend = this.withCapital.flat(1)
      return flattend.reduce((h, c) => {
        const lastDay = h[h.length - 1]
        const lastDayCapital = lastDay?.dayCapital || 0
        const lastCapitalACC = lastDay?.capitalACC || 0
        h.push({
          ...c,
          capitalACC: lastCapitalACC + lastDayCapital
        })
        return h
      }, [])
    },
    displayDays () {
      return this.withCapitalACC
    },
    curMonth () {
      return this.displayDays.filter(x => {
        // return x.month === 5 || (x.month === 4 && x.day > 18)
        return x.month === 5
      })
    },
    byDay () {
      return this.curMonth
    },
    byDayOffset () {
      const res = this.byDay.slice(1)
      res.push(this.byDay[this.byDay.length - 1])
      return res
    }
  },
  methods: {
    offsetDay (dayOrIDX, offset) {
      let idx
      if (dayOrIDX instanceof Object) {
        idx = this.byDay.findIndex(x => x === dayOrIDX)
      }
      return this.byDay[idx + offset] || null
    },
    lastDay (dayOrIDX) {
      return this.offsetDay(dayOrIDX, -1)
    },
    nextDay (dayOrIDX) {
      return this.offsetDay(dayOrIDX, +1)
    },
    calcCapitalPercent (day, type, options) {
      const { base: baseVal, max: maxVal } = options || {}

      const nextDay = this.nextDay(day)
      if (nextDay?.day === 1 && type === 'start') {
        return '0.0'
      }

      const max = maxVal || Math.floor(
        Math.max.apply(null, this.byDay.map(x => x.capital)) * 
        1.2
      )
      const base = baseVal || (day?.capital || 0)
      if (!base) {
        return '0.0'
      } else {
        return String((base / max).toFixed(1))
      }
    },
    calcCapitalAllPercent (day) {
      const max = Math.floor(
        this.byDay[this.byDay.length - 1]?.capitalACC * 1.5
      )
      const base = day?.capitalACC || 0
      return this.calcCapitalPercent(day, 'all', { base, max })
    },
    isWorkday (day) {
      return day.workday != null
        ? day.workday
        : day.weekday <= 5
    }
  }
}
</script>

<style scoped>

/************************* Container */

.latechart {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}
.charts-con {
  position: relative;
  top: 100px;
  height: 250px;
  width: 100%;
  max-width: 1700px;
  margin: 0 auto;
}
.charts-con > table {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0 auto;
  height: 250px;
}
.charts-con > table.column th {
  background-color: #f6f6f6;
}
/* .charts-con > table span.data {
  text-indent: -2.7em;
} */

/************************* Chart */

#chart-week-count {
  --labels-size: 4.8rem;
  --labels-gap: 0.5rem;
}
#chart-money-count-day {
  top: -100px;
  height: 100px;
}
#chart-money-count-all {
  top: -193px;
  height: 170px;
}

.sun {
  box-sizing: border-box;
  position: relative;
  display: block;
  width: 24px;
  height: 24px;
  background:
    linear-gradient(to bottom, currentColor 4px,transparent 0) no-repeat 5px -6px/2px 6px,
    linear-gradient(to bottom, currentColor 4px,transparent 0) no-repeat 5px 14px/2px 6px,
    linear-gradient(to bottom, currentColor 4px,transparent 0) no-repeat -8px 5px/6px 2px,
    linear-gradient(to bottom, currentColor 4px,transparent 0) no-repeat 14px 5px/6px 2px;
  border-radius: 100px;
  box-shadow: inset 0 0 0 2px;
  border: 6px solid transparent;
}
.sun::after,
.sun::before {
  content: "";
  display: block;
  box-sizing: border-box;
  position: absolute;
  width: 24px;
  height: 2px;
  border-right: 4px solid;
  border-left: 4px solid;
  left: -6px;
  top: 5px;
}
.sun::before {
  transform: rotate(-45deg);
}
.sun::after {
  transform: rotate(45deg);
}
.cloud {
  box-sizing: border-box;
  position: relative;
  display: block;
  width: 8px;
  height: 2px;
  background: currentColor;
  margin-bottom: 4px;
  margin-top: 20px;
}
.cloud::after,
.cloud::before {
  content: "";
  display: block;
  position: absolute;
  border: 2px solid;
  box-sizing: border-box;
  bottom: 0;
}
.cloud::before {
  border-top-left-radius: 100px;
  border-bottom-left-radius: 100px;
  border-right: 0;
  left: -6px;
  width: 7px;
  height: 12px;
}
.cloud::after {
  width: 16px;
  height: 16px;
  border-radius: 100px;
  border-left-color: transparent;
  right: -8px;
  transform: rotate(-45deg);
}
.rain {
  box-sizing: border-box;
  position: relative;
  display: block;
  width: 8px;
  height: 2px;
  background: currentColor;
  margin-top: 16px;
  margin-bottom: 8px;
}
.rain::after,
.rain::before {
  content: "";
  display: block;
  position: absolute;
  border: 2px solid;
  box-sizing: border-box;
  bottom: 0;
}
.rain::before {
  border-top-left-radius: 100px;
  border-bottom-left-radius: 100px;
  border-right: 0;
  left: -6px;
  width: 7px;
  height: 12px;
}
.rain::after {
  width: 16px;
  height: 16px;
  border-radius: 100px;
  border-left-color: transparent;
  right: -8px;
  transform: rotate(-45deg);
}
.rain .dot {
  position: absolute;
  width: 2px;
  height: 4px;
  left: 40%;
  bottom: -6px;
  background: currentColor;
  transform: skewX(-25deg);
}
.rain .dot::before {
  content: '';
  left: -5px;
  background: inherit;
  position: absolute;
  width: 100%;
  height: 100%;
}
.rain .dot::after {
  content: '';
  left: 5px;
  background: inherit;
  position: absolute;
  width: 100%;
  height: 100%;
}

</style>

<style>
.charts-css.column:not(.reverse) tbody tr th {
  gap: var(--labels-gap);
}
</style>