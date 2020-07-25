/** @file 在导航栏上给正文加一层白色渐变遮罩 */

const utils = require('../utils')

module.exports = {
    mounted() {
        if (!utils.isMobile) {
            this.addNavMask()
        }
    },
    methods: {
        addNavMask() {
            const $nav = document.querySelector('.navbar')
            const $mask = document.createElement('div')
            $mask.setAttribute(
                'style',
                `
                position: absolute;
                bottom: calc(-4.5rem + 3px);
                left: 0;
                width: 100%;
                height: 4.5rem;
                pointer-events: none;
                `
            )
            $mask.innerHTML = `<svg preserveAspectRatio="none" viewBox="0 0 10 30" width="100%" height="100%"><defs><linearGradient id="eased-gradient-gradient-ersd" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color: white; stop-opacity: 1;"></stop><stop offset="8.1%" style="stop-color: white; stop-opacity: 0.987;"></stop><stop offset="15.5%" style="stop-color: white; stop-opacity: 0.951;"></stop><stop offset="22.5%" style="stop-color: white; stop-opacity: 0.896;"></stop><stop offset="29%" style="stop-color: white; stop-opacity: 0.825;"></stop><stop offset="35.3%" style="stop-color: white; stop-opacity: 0.741;"></stop><stop offset="47.1%" style="stop-color: white; stop-opacity: 0.55;"></stop><stop offset="52.9%" style="stop-color: white; stop-opacity: 0.45;"></stop><stop offset="58.8%" style="stop-color: white; stop-opacity: 0.352;"></stop><stop offset="64.7%" style="stop-color: white; stop-opacity: 0.259;"></stop><stop offset="71%" style="stop-color: white; stop-opacity: 0.175;"></stop><stop offset="77.5%" style="stop-color: white; stop-opacity: 0.104;"></stop><stop offset="84.5%" style="stop-color: white; stop-opacity: 0.05;"></stop><stop offset="91.9%" style="stop-color: white; stop-opacity: 0.013;"></stop><stop offset="100%" style="stop-color: white; stop-opacity: 0;"></stop></linearGradient></defs><mask id="eased-gradient-mask-ersd"><rect x="0" y="0" width="100%" height="100%" fill="url(#eased-gradient-gradient-ersd)"></rect></mask><rect x="0" y="0" width="100%" height="100%" mask="url(#eased-gradient-mask-ersd)" fill="var(--color-background)"></rect></svg>`
            $nav.appendChild($mask)
        }
    }
}
