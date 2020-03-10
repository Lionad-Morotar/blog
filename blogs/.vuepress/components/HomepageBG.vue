<template>
  <svg
    id="svg"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 1440 540"
  >
    <defs>
      <linearGradient
        id="linearGradient-1"
        x1="52.9%"
        x2="40.18%"
        y1="32.87%"
        y2="56.72%"
      >
        <stop stop-color="#09DFF3" offset="0%" />
        <stop stop-color="#44BEFF" offset="100%" />
      </linearGradient>

      <circle id="planet-shape" cx="31" cy="31" r="30" />
      <mask id="planet-mask" fill="#fff">
        <use xlink:href="#planet-shape" />
      </mask>
      <path id="planet-section-1" d="M0 1h62v12H0z" mask="url(#planet-mask)" />
      <path id="planet-section-2" d="M0 11h62v12H0z" mask="url(#planet-mask)" />
      <path id="planet-section-3" d="M0 21h62v12H0z" mask="url(#planet-mask)" />
      <path id="planet-section-4" d="M0 31h62v12H0z" mask="url(#planet-mask)" />
      <path id="planet-section-5" d="M0 41h62v12H0z" mask="url(#planet-mask)" />
      <path id="planet-section-6" d="M0 51h62v12H0z" mask="url(#planet-mask)" />

      <circle id="path-4" cx="159.05" cy="159.05" r="159.05" />

      <symbol id="planet-dark-grey">
        <use fill="#5E9CCC" xlink:href="#planet-shape" />
        <use fill="#8DCFDC" xlink:href="#planet-section-1" />
        <use fill="#7ABAD6" xlink:href="#planet-section-2" />
        <use fill="#72AFD3" xlink:href="#planet-section-3" />
        <use fill="#65A4CF" xlink:href="#planet-section-4" />
        <use fill="#5E9CCC" xlink:href="#planet-section-5" />
        <use fill="#5B94C8" xlink:href="#planet-section-6" />
      </symbol>
      <symbol id="planet-green">
        <use fill="#18D4D3" xlink:href="#planet-shape" />
        <use fill="#4DEBC3" xlink:href="#planet-section-1" />
        <use fill="#39E2C9" xlink:href="#planet-section-2" />
        <use fill="#29DBCD" xlink:href="#planet-section-3" />
        <use fill="#18CCD4" xlink:href="#planet-section-4" />
        <use fill="#0EC0D6" xlink:href="#planet-section-5" />
        <use fill="#03B2D9" xlink:href="#planet-section-6" />
      </symbol>
      <symbol id="planet-light-grey">
        <use fill="#E1EAF6" xlink:href="#planet-shape" />
        <use fill="#F5F9FD" xlink:href="#planet-section-1" />
        <use fill="#ECF2F9" xlink:href="#planet-section-2" />
        <use fill="#E1EAF6" xlink:href="#planet-section-3" />
        <use fill="#D7E3F2" xlink:href="#planet-section-4" />
        <use fill="#D0DDF0" xlink:href="#planet-section-5" />
        <use fill="#C4D5EC" xlink:href="#planet-section-6" />
      </symbol>
      <symbol id="planet-orange">
        <use fill="#F5A77C" xlink:href="#planet-shape" />
        <use fill="#FCD380" xlink:href="#planet-section-1" />
        <use fill="#F9C57E" xlink:href="#planet-section-2" />
        <use fill="#F5A77C" xlink:href="#planet-section-3" />
        <use fill="#F19179" xlink:href="#planet-section-4" />
        <use fill="#EC7376" xlink:href="#planet-section-5" />
        <use fill="#E75873" xlink:href="#planet-section-6" />
      </symbol>
      <symbol id="planet-blue">
        <use fill="#0196E2" xlink:href="#planet-shape" />
        <use fill="#0AE7F2" xlink:href="#planet-section-1" />
        <use fill="#08D2EF" xlink:href="#planet-section-2" />
        <use fill="#05C6EB" xlink:href="#planet-section-3" />
        <use fill="#04B5E9" xlink:href="#planet-section-4" />
        <use fill="#03A9E7" xlink:href="#planet-section-5" />
        <use fill="#0B9DE7" xlink:href="#planet-section-6" />
      </symbol>
    </defs>

    <g id="hero" fill="none" fill-rule="evenodd">
      <g id="lines">
        <rect class="Line" />
        <rect class="Line" />
        <rect class="Line" />
        <rect class="Line" />
        <rect class="Line" />
        <rect class="Line" />
        <rect class="Line" />
        <rect class="Line" />
        <rect class="Line" />
      </g>

      <g id="distance-1x">
        <g id="big-planet">
          <use
            id="planet-orange-4"
            xlink:href="#planet-orange"
            transform="translate(240.224 186.975) scale(2.85)"
          />
        </g>
        <g id="group-planets-4">
          <use
            id="planet-blue-5"
            xlink:href="#planet-blue"
            transform="translate(249.224 317.975)"
          />
          <g id="moon-5">
            <use
              id="planet-light-grey-7"
              xlink:href="#planet-light-grey"
              transform="translate(254.076 367.15) scale(0.27)"
            />
          </g>
          <use
            id="planet-light-grey-8"
            xlink:href="#planet-light-grey"
            transform="translate(386.063 277.15) scale(0.198)"
          />
          <use
            id="planet-dark-grey-5"
            xlink:href="#planet-dark-grey"
            transform="translate(298.148 215.675) scale(0.416)"
          />
        </g>

        <g id="planet-blue-with-ring">
          <use
            id="planet-blue-2"
            xlink:href="#planet-blue"
            transform="translate(1067.224 139.975) scale(1.94)"
          />
          <path
            stroke="#FFCD6F"
            stroke-width="2"
            d="M1048.9 199.05h155.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            stroke="#0B9DE7"
            stroke-width="2"
            d="M1070.5 201.05h114"
            stroke-linecap="square"
          />
        </g>
        <g id="moon-1">
          <use
            id="planet-light-grey-5"
            xlink:href="#planet-light-grey"
            transform="translate(1099.654 164.15) scale(0.198)"
          />
        </g>
        <g id="moon-2">
          <use
            id="planet-orange-7"
            xlink:href="#planet-orange"
            transform="translate(1163.398 183.15) scale(0.167)"
          />
        </g>
      </g>

      <g id="distance-2x">
        <use
          id="planet-dark-grey-1"
          xlink:href="#planet-dark-grey"
          transform="translate(1265 452)"
        />
        <use
          id="planet-light-grey-6"
          xlink:href="#planet-light-grey"
          transform="translate(1250.154 447.175) scale(0.198)"
        />
        <use
          id="planet-green-1"
          xlink:href="#planet-green"
          transform="translate(1023 354)"
        />
        <use
          id="planet-green-2"
          xlink:href="#planet-green"
          transform="translate(424 122) scale(0.8)"
        />
        <use
          id="planet-light-grey-1"
          xlink:href="#planet-light-grey"
          transform="translate(411.076 427.675) scale(0.885)"
        />
        <use
          id="planet-orange-2"
          xlink:href="#planet-orange"
          transform="translate(422.076 461.175) scale(0.133)"
        />
        <g id="planet-light-grey-with-ring">
          <use
            id="planet-light-grey-2"
            xlink:href="#planet-light-grey"
            transform="translate(57.063 49.15) scale(0.885)"
          />
          <path stroke="#F9C57E" d="M50.15 76.67h68" stroke-linecap="square" />
          <path stroke="#B9CDE7" d="M59.063 77.67h51" stroke-linecap="square" />
        </g>

        <g id="moon-3">
          <use
            id="planet-orange-1"
            xlink:href="#planet-orange"
            transform="translate(1119.654 340.15) scale(0.333)"
          />
        </g>

        <g id="moon-4">
          <use
            id="planet-light-grey-3"
            xlink:href="#planet-light-grey"
            transform="translate(1103.648 408.15) scale(0.297)"
          />
        </g>

        <g id="planet-orange-with-ring">
          <use
            id="planet-orange-3"
            xlink:href="#planet-orange"
            transform="translate(1301 42)"
          />
          <path
            stroke="#0ADCF2"
            d="M1287.65 71.67h87"
            stroke-linecap="square"
          />
          <path stroke="#EC7376" d="M1303 72.67h58" stroke-linecap="square" />
        </g>

        <g id="group-planets-2">
          <use
            id="planet-green-5"
            xlink:href="#planet-green"
            transform="translate(1341.654 441.15) scale(0.14)"
          />
          <use
            id="planet-blue-3"
            xlink:href="#planet-blue"
            transform="translate(462 493) scale(0.266)"
          />
          <use
            id="planet-blue-4"
            xlink:href="#planet-blue"
            transform="translate(419 121) scale(0.253)"
          />
          <use
            id="planet-green-3"
            xlink:href="#planet-green"
            transform="translate(1339.654 90.175) scale(0.34)"
          />
        </g>
      </g>

      <g id="distance-3x">
        <use
          id="planet-dark-grey-4"
          xlink:href="#planet-dark-grey"
          transform="translate(1264.654 277.15) scale(0.2)"
        />
        <use
          id="planet-green-4"
          xlink:href="#planet-green"
          transform="translate(151 135) scale(0.33)"
        />
        <g id="group-planets-1">
          <use
            id="planet-dark-grey-2"
            xlink:href="#planet-dark-grey"
            transform="translate(1008 83) scale(0.41)"
          />
          <use
            id="planet-orange-5"
            xlink:href="#planet-orange"
            transform="translate(985 108) scale(0.199)"
          />
          <use
            id="planet-light-grey-4"
            xlink:href="#planet-light-grey"
            transform="translate(1251.654 32.15) scale(0.198)"
          />
          <use
            id="planet-dark-grey-3"
            xlink:href="#planet-dark-grey"
            transform="translate(87.063 373.15) scale(0.34)"
          />
          <use
            id="planet-orange-6"
            xlink:href="#planet-orange"
            transform="translate(108.148 369.15) scale(0.133)"
          />
          <use
            id="planet-blue-1"
            xlink:href="#planet-blue"
            transform="translate(132.148 37.15) scale(0.133)"
          />
        </g>
      </g>

      <g id="we-are-sbvsl">
        <path
          id="we-are-sbvsl-stripe"
          fill="url(#linearGradient-1)"
          d="M922.4 595.26l-396.5-246V233.03l396.5 246v116.22z"
          transform="translate(0 -131)"
        />
        <g id="we-are-sbvsl-rings" transform="translate(494.103 43.607)">
          <ellipse
            cx="229.5"
            cy="229.5"
            fill="#FFF"
            opacity=".1"
            rx="229.5"
            ry="229.5"
          />
          <ellipse
            cx="229.42"
            cy="229.42"
            fill="#FFF"
            opacity=".2"
            rx="182.14"
            ry="182.14"
          />
          <ellipse
            cx="229.19"
            cy="229.19"
            fill="#FFF"
            opacity=".15"
            rx="207.37"
            ry="207.37"
          />
        </g>

        <g id="we-are-sbvsl-circle" transform="translate(565.012 115.425)">
          <mask id="mask-5" fill="#fff">
            <use xlink:href="#path-4" />
          </mask>
          <use xlink:href="#path-4" />
          <path
            fill="#FAFEFF"
            d="M-25.1 0h385.05v58.6H-25.1z"
            mask="url(#mask-5)"
          />
          <path
            fill="#F3FBFD"
            d="M-25.1 58.6h385.05v58.6H-25.1z"
            mask="url(#mask-5)"
          />
          <path
            fill="#EBF5FA"
            d="M-25.1 108.82h385.05v58.6H-25.1z"
            mask="url(#mask-5)"
          />
          <path
            fill="#DBEDF6"
            d="M-25.1 167.42h385.05v58.6H-25.1z"
            mask="url(#mask-5)"
          />
          <path
            fill="#CBE6F3"
            d="M-25.1 220.37h385.05v58.6H-25.1z"
            mask="url(#mask-5)"
          />
          <path
            fill="#C1E1F1"
            d="M-25.1 266.24h385.05v58.6H-25.1z"
            mask="url(#mask-5)"
          />
        </g>

        <path
          id="we-are"
          fill="#5889A2"
          d="M646 239l5 19h1l6-19h6l6 19 6-19h8l-10 30h-8l-5-17-6 17h-8l-9-30h8zm58 7h-9v5h9v6h-9v5h9v7h-17v-30h17v7zm40 18h-11l-2 5h-8l11-30h9l11 30h-8l-2-5zm-2-6l-3-10h-1l-3 10h7zm32-1l9 12h-10l-7-12v12h-8v-30h12c2.82 0 5.34.77 7 2 2.17 1.85 3.13 4.15 3 7 .13 2.38-.45 4.24-2 6-.76 1.37-2.38 2.33-4 3zm-8-12v7h1c3.25 0 5-1.17 5-3 0-2.83-1.75-4-5-4h-1zm38 1h-9v5h9v6h-9v5h9v7h-17v-30h17v7z"
        />

        <path
          id="subvisual"
          fill="#2CCCFA"
          d="M626.42 294.65l-3.08 6.12c-1.58-1.34-3.3-2-5.13-2-.8 0-1.56.22-2.26.67-.7.46-1.05 1.08-1.05 1.86 0 .54.2 1.02.64 1.45.44.43.85.72 1.23.9.38.15.9.34 1.56.55l1.97.6c2.32.7 4.12 1.7 5.4 2.97 1.3 1.27 1.95 3.05 1.95 5.34 0 3.7-1.03 6.42-3.08 8.2-2.2 1.9-5.03 2.85-8.45 2.85-3.74 0-7.23-1.16-10.47-3.47l3.32-6.36c2.34 2.1 4.63 3.14 6.87 3.14 1 0 1.87-.26 2.63-.8.75-.5 1.12-1.27 1.12-2.26 0-1.37-1.26-2.43-3.76-3.2-.08 0-.4-.1-.95-.27-1.43-.4-2.55-.78-3.37-1.13-.8-.35-1.63-.84-2.45-1.47-.8-.63-1.4-1.43-1.73-2.4-.35-.96-.52-2.16-.52-3.58 0-3.07.96-5.53 2.9-7.4 1.9-1.87 4.37-2.8 7.37-2.8 1.5 0 3.1.23 4.8.7 1.7.44 3.2 1.05 4.52 1.8zm24.48-1.5h7.75v16.98c0 2.46-.2 4.52-.57 6.2-.4 1.66-1.24 3.15-2.55 4.46-2.24 2.23-5.54 3.35-9.88 3.35-4.35 0-7.64-1.12-9.88-3.36-1.32-1.32-2.17-2.8-2.55-4.48-.38-1.67-.57-3.73-.57-6.2v-16.97h7.74v15.9c0 .96 0 1.76.05 2.4.04.64.16 1.37.36 2.17.2.8.48 1.44.84 1.92.35.48.87.9 1.56 1.22.68.33 1.5.5 2.45.5.95 0 1.76-.17 2.45-.5.68-.33 1.2-.74 1.56-1.22.35-.48.63-1.12.83-1.92.2-.8.3-1.53.34-2.17.04-.64.06-1.44.06-2.4v-15.9zm21.6 17.5v6.48h2.3c.24 0 .67-.03 1.3-.08.65-.06 1.13-.15 1.43-.3.3-.12.67-.3 1.08-.52.43-.23.72-.54.9-.93.17-.38.25-.84.25-1.38 0-.4-.04-.75-.12-1.07-.08-.33-.22-.6-.42-.8-.2-.22-.37-.4-.53-.6-.16-.16-.42-.3-.78-.38-.37-.1-.64-.18-.83-.25-.18-.06-.5-.1-.98-.13l-.93-.06H672.5zm4.23 12.5h-12.08v-30h11.2c5.97 0 8.96 2.6 8.96 7.8 0 2.97-1.1 5-3.3 6.13v.08c4.1.53 6.15 3.07 6.15 7.63 0 1.5-.3 2.82-.92 3.93-.6 1.12-1.45 2-2.5 2.6-1.05.63-2.2 1.1-3.44 1.38-1.25.3-2.6.45-4.07.45zm-4.22-24.2v5.86h.9c1.27 0 2.3-.2 3.07-.6.78-.4 1.16-1.17 1.16-2.3 0-.68-.12-1.22-.38-1.63-.25-.42-.63-.7-1.14-.88-.5-.2-.96-.3-1.4-.35-.4-.06-.96-.1-1.63-.1h-.56zm25.77-5.8l7.36 18.22 7.4-18.22h8.62l-13.03 30h-6.15l-12.82-30h8.62zm34.38 0v30h-8v-30h8zm24.77 1.5l-3.08 6.12c-1.58-1.34-3.3-2-5.13-2-.8 0-1.56.22-2.26.67-.7.46-1.05 1.08-1.05 1.86 0 .54.2 1.02.64 1.45.44.43.85.72 1.23.9.38.15.9.34 1.56.55l1.97.6c2.32.7 4.12 1.7 5.4 2.97 1.3 1.27 1.95 3.05 1.95 5.34 0 3.7-1.03 6.42-3.08 8.2-2.2 1.9-5.03 2.85-8.45 2.85-3.74 0-7.23-1.16-10.47-3.47l3.32-6.36c2.34 2.1 4.63 3.14 6.87 3.14 1 0 1.87-.26 2.63-.8.75-.5 1.12-1.27 1.12-2.26 0-1.37-1.26-2.43-3.76-3.2-.08 0-.4-.1-.95-.27-1.43-.4-2.55-.78-3.37-1.13-.8-.35-1.63-.84-2.45-1.47-.8-.63-1.4-1.43-1.73-2.4-.35-.96-.52-2.16-.52-3.58 0-3.07.96-5.53 2.9-7.4 1.9-1.87 4.37-2.8 7.37-2.8 1.5 0 3.1.23 4.8.7 1.7.44 3.2 1.05 4.52 1.8zm24.7-1.7h7.83v16.98c0 2.45-.2 4.5-.58 6.18-.38 1.67-1.24 3.16-2.58 4.46-2.27 2.25-5.6 3.37-10 3.37s-7.74-1.12-10-3.37c-1.34-1.3-2.2-2.8-2.6-4.45-.37-1.66-.57-3.72-.57-6.18v-16.96h7.84v15.9c0 .95.02 1.74.06 2.38.04.65.16 1.36.36 2.16.2.8.47 1.44.83 1.93.36.48.9.88 1.58 1.22.7.33 1.53.5 2.5.5.95 0 1.78-.17 2.47-.5.7-.34 1.22-.74 1.58-1.23.36-.48.64-1.1.84-1.92.2-.8.3-1.5.35-2.15.04-.65.06-1.44.06-2.4v-15.9zm33.05 25H804.2l-2.1 5.2h-8.45l11.78-30h8.7l11.52 30h-8.5l-1.98-5.2zm-2.9-6.06l-3.2-9.6H809l-3.25 9.58h6.52zm24.1-18.75v23.4h9.28v6.6h-17v-30h7.73z"
        />
      </g>

      <path id="orbit-group-planets-1" d="M0 0a2,1 0 1,0 4,0a2,1 0 1,0 -4,0" />
      <path id="orbit-group-planets-2" d="M0 0a2,5 0 1,0 4,0a2,5 0 1,0 -4,0" />
      <path id="orbit-big-planet" d="M0 0v5z" />
      <path id="orbit-moons-1" d="M0 0a4,4 0 1,0 8,0a4,4 0 1,0 -8,0" />
      <path
        id="orbit-moons-3"
        d="M0,0C-14.64,-31.39,-84.21,-22.84,-125.23,15.39C-144.26,33.14,-151.80,53.05,-145.01,67.62C-130.37,99.01,-60.79,90.46,-19.78,52.22C-0.75,34.48,6.79,14.57,0,0"
      />
      <path
        id="orbit-moons-4"
        d="M0,0C17.32,-30.00,-29.59,-82.08,-84.44,-93.75C-109.89,-99.16,-130.53,-93.92,-138.56,-80C-155.88,-49.99,-108.97,2.08,-54.13,13.75C-28.67,19.16,-8.04,13.92,0,0"
      />
      <path
        id="orbit-moons-5"
        d="M0,0C0,0,42.43,-42.43,42.43,-42.43C42.43,-42.43,-21.21,-49.49,-21.21,-49.49C-21.21,-49.49,0,0,0,0"
      />
    </g>
  </svg>
</template>

<script>
import { TweenLite, Linear } from 'gsap/all'

export default {
  /** @see https://codepen.io/azevedo-252/pen/RPQvmd */
  mounted() {
    ;(function() {
      function animateAlongPath(object, path, duration = 7.5, delay = 0) {
        let counter = { value: 0 }
        TweenLite.to(counter, duration, {
          value: path.getTotalLength(),
          repeat: -1,
          ease: Linear.easeNone,
          delay: delay,
          onUpdate: function() {
            let coords = path.getPointAtLength(counter.value)
            TweenLite.set(object, { x: coords.x, y: coords.y })
          },
          onComplete: animateAlongPath,
          onCompleteParams: [object, path, duration, delay]
        })
      }

      let svg = document.querySelector('#hero')

      // group-planets-1
      animateAlongPath(
        svg.querySelector('#group-planets-1'),
        svg.querySelector('#orbit-group-planets-1')
      )

      // group-planets-2
      animateAlongPath(
        svg.querySelector('#group-planets-2'),
        svg.querySelector('#orbit-group-planets-2'),
        10
      )

      // big-planet, group-planets-4
      let bigPlanetDuration = 7.5
      animateAlongPath(
        svg.querySelector('#big-planet'),
        svg.querySelector('#orbit-big-planet'),
        bigPlanetDuration
      )
      animateAlongPath(
        svg.querySelector('#group-planets-4'),
        svg.querySelector('#orbit-big-planet'),
        bigPlanetDuration,
        bigPlanetDuration / 2
      )

      // moon-5
      animateAlongPath(
        svg.querySelector('#moon-5'),
        svg.querySelector('#orbit-moons-5'),
        45
      )

      // moon-1, moon-2
      animateAlongPath(
        svg.querySelector('#moon-1'),
        svg.querySelector('#orbit-moons-1'),
        7.5
      )
      animateAlongPath(
        svg.querySelector('#moon-2'),
        svg.querySelector('#orbit-moons-1'),
        7.5,
        2.5
      )

      // moon-3, moon-4
      animateAlongPath(
        svg.querySelector('#moon-3'),
        svg.querySelector('#orbit-moons-3'),
        150
      )
      animateAlongPath(
        svg.querySelector('#moon-4'),
        svg.querySelector('#orbit-moons-4'),
        150
      )
    })()
    ;(function() {
      const viewportWidth = 1440
      const viewportHeight = 540
      const lineMinWidth = 100
      const lineMaxWidth = 500
      const colors = [
        '#0ADCF2',
        '#EC7376',
        '#FCD380',
        '#E1EAF6',
        '#8DC8DC',
        '#4DEBC3'
      ]
      let speedTable = {
        get 1() {
          return getRandomInt(65, 70)
        },
        get 2() {
          return getRandomInt(50, 55)
        },
        get 3() {
          return getRandomInt(45, 50)
        },
        get 4() {
          return getRandomInt(35, 40)
        },
        get 5() {
          return getRandomInt(30, 35)
        },
        get 6() {
          return getRandomInt(1, 2)
        }
      }

      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
      }

      function initialPosition(width, direction) {
        if (direction === 1) {
          return -width
        } else {
          return viewportWidth
        }
      }

      function lineHeight(width) {
        if (width < lineMaxWidth / 2) {
          return 1
        } else {
          return 2
        }
      }

      function resetLine(direction, width, i) {
        let color = randomColor()
        return {
          attr: {
            width: width,
            height: lineHeight(width)
          },
          stroke: color,
          fill: color,
          x: initialPosition(width, direction),
          y: getY(i)
        }
      }

      function getY(i) {
        let sectionHeight = viewportHeight / lines.length
        let vPadding = 20
        return getRandomInt(
          sectionHeight * i + vPadding,
          sectionHeight * i + sectionHeight - vPadding
        )
      }

      function randomDirection() {
        return Math.round(Math.random()) * 2 - 1
      }

      function randomColor() {
        return colors[Math.floor(Math.random() * colors.length)]
      }

      function getSpeed(width) {
        let scaleFactor = Math.floor(width / 75)
        return speedTable[scaleFactor]
      }

      function translateX(direction, elementWidth) {
        let sign = '+'
        if (direction < 0) sign = '-'
        return `${sign}=${viewportWidth + elementWidth}`
      }

      function animateLine(el, i) {
        let width = getRandomInt(lineMinWidth, lineMaxWidth)
        let direction = randomDirection()

        TweenLite.set(el, resetLine(direction, width, i))
        TweenLite.to(el, getSpeed(width), {
          x: translateX(direction, width),
          onComplete: animateLine,
          onCompleteParams: [el, i]
        })
      }

      let lines = document.querySelectorAll('#svg .Line')

      for (let i = 0; i < lines.length; i++) {
        setTimeout(function() {
          animateLine(lines[i], i)
        }, 800 * i)
      }
    })()
    ;(function() {
      var translations = {}
      var svg = document.getElementById('svg')

      function translateLayer(id, hDistance, vDistance, factor) {
        var hDistanceScaled = hDistance / factor
        var vDistanceScaled = vDistance / factor

        var counter = { value: 0 }
        var precision = 40.0
        TweenLite.killTweensOf(id)

        var thisTranslations = translations[id] || {}
        var x = thisTranslations.x || 0
        var y = thisTranslations.y || 0
        var finalX = hDistanceScaled
        var finalY = vDistanceScaled
        var stepX = (finalX - x) / precision
        var stepY = (finalY - y) / precision

        TweenLite.to(counter, 0.8, {
          value: precision,
          onUpdate: function() {
            var currentX = x + stepX * counter.value
            var currentY = y + stepY * counter.value
            svg
              .getElementById(id)
              .setAttribute(
                'transform',
                'translate(' + currentX + ', ' + currentY + ')'
              )
            translations[id] = { x: currentX, y: currentY }
          }
        })
      }

      function parallax(e) {
        var amountMovedX = e.pageX
        var amountMovedY = e.pageY
        var hDistance = window.innerWidth / 2 - amountMovedX
        var vDistance = window.innerHeight / 2 - amountMovedY

        translateLayer('lines', hDistance, vDistance, 85)
        translateLayer('distance-3x', hDistance, vDistance, 45)
        translateLayer('distance-2x', hDistance, vDistance, -65)
        translateLayer('distance-1x', hDistance, vDistance, 85)
      }

      if (svg) {
        svg.addEventListener('mousemove', parallax, false)
      }
    })()
  }
}
</script>

<style>
#svg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ebf5fa;
}
.Line {
  height: 1px;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>
