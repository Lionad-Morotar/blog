<template>
  <div class="latechart fullscreen">
    <div class="charts-con">

      <table id="chart-week-count" class="charts-css column show-labels show-data-axes">
        <tbody>
          <tr v-for="(rec, recIDX) in byDay" :key="String(rec.month)+rec.day">
            <th scope="row">
              <template v-if="recIDX % 7 < 5">
                {{ rec.month }} / {{ rec.day }}
              </template>
              <template v-else>
                * / *
              </template>
              <div v-if="rec.weather === 'sun'" class="sun" />
              <div v-else-if="rec.weather === 'cloud'" class="cloud" />
              <div v-else class="rain"><div class="dot" /></div>
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

      <table id="chart-money-count" class="charts-css line show-data-axes">
        <tbody>
          <tr>
            <td style="--start: 0.0; --size: 0.0"> <span class="data"> ￥0 </span> </td>
          </tr>
          <tr>
            <td style="--start: 0.0; --size: 0.0"> <span class="data"> ￥0 </span> </td>
          </tr>
          <tr>
            <td style="--start: 0.0; --size: 0.0"> <span class="data"> ￥0 </span> </td>
          </tr>
          <tr>
            <td style="--start: 0.0; --size: 0.0"> <span class="data"> ￥0 </span> </td>
          </tr>
          <tr>
            <td style="--start: 0.0; --size: 0.5"> <span class="data"> ￥50 </span> </td>
          </tr>
          <tr>
            <td style="--start: 0.5; --size: 0.5"> <span class="data"> ￥50 </span> </td>
          </tr>
          <tr>
            <td style="--start: 0.5; --size: 0.5"> <span class="data"> ￥50 </span> </td>
          </tr>
          <tr>
            <td style="--start: 0.5; --size: 0.7"> <span class="data"> ￥70 </span> </td>
          </tr>
          <tr>
            <td style="--start: 0.7; --size: 0.7"> <span class="data"> ￥70 </span> </td>
          </tr>
          <tr>
            <td style="--start: 0.7; --size: 0.7"> <span class="data"> ￥70 </span> </td>
          </tr>
          <tr>
            <td style="--start: 0.7; --size: 0.7"> <span class="data"> ￥70 </span> </td>
          </tr>
          <tr>
            <td style="--start: 0.7; --size: 0.7"> <span class="data"> ￥70 </span> </td>
          </tr>
          <tr>
            <td style="--start: 0.7; --size: 0.7"> <span class="data"> ￥70 </span> </td>
          </tr>
          <tr>
            <td style="--start: 0.7; --size: 0.7"> <span class="data"> ￥70 </span> </td>
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
      byDay: [
        {
          month: 3,
          day: 22,
          weather: 'sun',
          record: [
            {
              name: '方方'
            },
            {
              name: '一光'
            }
          ]
        },
        {
          month: 3,
          day: 23,
          weather: 'cloud',
        },
        {
          month: 3,
          day: 24,
          weather: 'rain',
          record: [
            {
              name: '一光'
            }
          ]
        },
        {
          month: 3,
          day: 25,
          weather: 'sun',
        },
        {
          month: 3,
          day: 26,
          weather: 'cloud',
          record: [
            {
              name: '一光'
            }
          ]
        },
        {
          month: 3,
          day: 27,
          weather: 'sun',
        },
        {
          month: 3,
          day: 28,
          weather: 'sun',
        },
        {
          month: 3,
          day: 29,
          weather: 'rain',
          record: [
            {
              name: '一光'
            }
          ]
        },
        {
          month: 3,
          day: 30,
          weather: 'rain',
        },
        {
          month: 3,
          day: 31,
          weather: 'rain',
        },
        {
          month: 4,
          day: 1,
          weather: 'rain',
        },
        {
          month: 4,
          day: 2,
          weather: 'cloud',
        },
        {
          month: 4,
          day: 3,
          weather: 'sun',
        },
        {
          month: 4,
          day: 4,
          weather: 'sun',
        },
      ]
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
  height: 250px;
  width: 100%;
  max-width: 1200px;
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

/************************* Chart */

#chart-week-count {
  --labels-size: 4.8rem;
  --labels-gap: 0.5rem;
}
#chart-money-count {
  top: -250px;
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