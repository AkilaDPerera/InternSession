if(!window.jQuery){
  var script_jquery = document.createElement('script');
  script_jquery.type = 'text/javascript';
  script_jquery.src = "https://code.jquery.com/jquery-3.3.1.min.js";
  script_jquery.onload = logic;
  document.head.appendChild(script_jquery);
}
if(!window.Vue){
  var script_jquery = document.createElement('script');
  script_jquery.type = 'text/javascript';
  script_jquery.src = "https://cdn.rawgit.com/vuejs/vue/v1.0.24/dist/vue.js";
  document.head.appendChild(script_jquery);
}
if(!window.moment){
  var script_jquery = document.createElement('script');
  script_jquery.type = 'text/javascript';
  script_jquery.src = 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.15.1/moment.min.js';
  document.head.appendChild(script_jquery);
}

var style = document.createElement('style');
style.innerHTML = `
  .flip-clock {
    text-align: center;
    -webkit-perspective: 600px;
            perspective: 600px;
    margin: 0 auto;
  }
  .flip-clock *,
  .flip-clock *:before,
  .flip-clock *:after {
    box-sizing: border-box;
  }
  .flip-clock__piece {
    display: inline-block;
    margin: 0 0.2vw;
  }
  @media (min-width: 1000px) {
    .flip-clock__piece {
      margin: 0 5px;
    }
  }
  .flip-clock__slot {
    font-size: 1rem;
    line-height: 1.5;
    display: block;
    /*
    //position: relative;
    //top: -1.6em;
    z-index: 10;
    //color: #FFF;
  */
  }
  .flip-card {
    display: block;
    position: relative;
    padding-bottom: 0.72em;
    font-size: 2.25rem;
    line-height: 0.95;
  }
  @media (min-width: 1000px) {
    .flip-clock__slot {
      font-size: 1.2rem;
    }
    .flip-card {
      font-size: 3rem;
    }
  }
  /*////////////////////////////////////////*/
  .flip-card__top,
  .flip-card__bottom,
  .flip-card__back-bottom,
  .flip-card__back::before,
  .flip-card__back::after {
    display: block;
    height: 0.72em;
    color: #ccc;
    background: #222;
    padding: 0.23em 0.25em 0.4em;
    border-radius: 0.15em 0.15em 0 0;
    backface-visiblity: hidden;
    -webkit-transform-style: preserve-3d;
            transform-style: preserve-3d;
    width: 1.8em;
  }
  .flip-card__bottom,
  .flip-card__back-bottom {
    color: #FFF;
    position: absolute;
    top: 50%;
    left: 0;
    border-top: solid 1px #000;
    background: #393939;
    border-radius: 0 0 0.15em 0.15em;
    pointer-events: none;
    overflow: hidden;
    z-index: 2;
  }
  .flip-card__back-bottom {
    z-index: 1;
  }
  .flip-card__bottom::after,
  .flip-card__back-bottom::after {
    display: block;
    margin-top: -0.72em;
  }
  .flip-card__back::before,
  .flip-card__bottom::after,
  .flip-card__back-bottom::after {
    content: attr(data-value);
  }
  .flip-card__back {
    position: absolute;
    top: 0;
    height: 100%;
    left: 0%;
    pointer-events: none;
  }
  .flip-card__back::before {
    position: relative;
    overflow: hidden;
    z-index: -1;
  }
  .flip .flip-card__back::before {
    z-index: 1;
    -webkit-animation: flipTop 0.3s cubic-bezier(0.37, 0.01, 0.94, 0.35);
            animation: flipTop 0.3s cubic-bezier(0.37, 0.01, 0.94, 0.35);
    -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
    -webkit-transform-origin: center bottom;
            transform-origin: center bottom;
  }
  .flip .flip-card__bottom {
    -webkit-transform-origin: center top;
            transform-origin: center top;
    -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
    -webkit-animation: flipBottom 0.6s cubic-bezier(0.15, 0.45, 0.28, 1);
            animation: flipBottom 0.6s cubic-bezier(0.15, 0.45, 0.28, 1);
  }
  .none {
    display: none;
  }
  @-webkit-keyframes flipTop {
    0% {
      -webkit-transform: rotateX(0deg);
              transform: rotateX(0deg);
      z-index: 2;
    }
    0%,
    99% {
      opacity: 1;
    }
    100% {
      -webkit-transform: rotateX(-90deg);
              transform: rotateX(-90deg);
      opacity: 0;
    }
  }
  @keyframes flipTop {
    0% {
      -webkit-transform: rotateX(0deg);
              transform: rotateX(0deg);
      z-index: 2;
    }
    0%,
    99% {
      opacity: 1;
    }
    100% {
      -webkit-transform: rotateX(-90deg);
              transform: rotateX(-90deg);
      opacity: 0;
    }
  }
  @-webkit-keyframes flipBottom {
    0%,
    50% {
      z-index: -1;
      -webkit-transform: rotateX(90deg);
              transform: rotateX(90deg);
      opacity: 0;
    }
    51% {
      opacity: 1;
    }
    100% {
      opacity: 1;
      -webkit-transform: rotateX(0deg);
              transform: rotateX(0deg);
      z-index: 5;
    }
  }
  @keyframes flipBottom {
    0%,
    50% {
      z-index: -1;
      -webkit-transform: rotateX(90deg);
              transform: rotateX(90deg);
      opacity: 0;
    }
    51% {
      opacity: 1;
    }
    100% {
      opacity: 1;
      -webkit-transform: rotateX(0deg);
              transform: rotateX(0deg);
      z-index: 5;
    }
  }
`;
document.head.appendChild(style);

function logic() {
  $(document).ready(function () {
    $('body').append(`
    <script>
      Vue.filter('zerofill', function (value) {
        //value = ( value < 0 ? 0 : value );
        return (value < 10 && value > -1 ? '0' : '') + value;
      });
      
      var Tracker = Vue.extend({
        template: \`
        <span v-show="show" class="flip-clock__piece">
          <span class="flip-clock__card flip-card">
            <b class="flip-card__top">{{current | zerofill}}</b>
            <b class="flip-card__bottom" data-value="{{current | zerofill}}"></b>
            <b class="flip-card__back" data-value="{{previous | zerofill}}"></b>
            <b class="flip-card__back-bottom" data-value="{{previous | zerofill}}"></b>
          </span>
          <span class="flip-clock__slot">{{property}}</span>
        </span>\`,
      
        props: ['property', 'time'],
      
        data: () => ({
          current: 0,
          previous: 0,
          show: false }),
      
        events: {
          time(newValue) {
      
            if (newValue[this.property] === undefined) {
              this.show = false;
              return;
            }
      
            var val = newValue[this.property];
            this.show = true;
      
            val = val < 0 ? 0 : val;
      
            if (val !== this.current) {
      
              this.previous = this.current;
              this.current = val;
      
              this.$el.classList.remove('flip');
              void this.$el.offsetWidth;
              this.$el.classList.add('flip');
            }
      
            } 
          } 
        });
      
      var el = document.createElement('div');
      document.body.appendChild(el);
      
      var Countdown = new Vue({
      
        el: el,
      
        template: \` 
        <div class="flip-clock" @click="update" v-bind:class="{ none: invisible}">
          <tracker 
            v-for="tracker in trackers"
            :property="tracker"
            :time="time"
            v-ref:trackers
          ></tracker>
        </div>
        \`,
      
        props: ['date', 'callback'],
      
        data: () => ({
          invisible: false,
          time: {},
          i: 0,
          trackers: ['Days', 'Hours', 'Minutes', 'Seconds'] //'Random', 
        }),
      
        components: { Tracker },
      
        ready() {
          if (window['requestAnimationFrame']) {
            this.setCountdown();
            this.update();
          }
        },
      
        methods: {
      
          setCountdown() {
            this.countdown = moment().add({days: 1, hours: 1, minutes: 1, seconds: 5}); // adjust time as you want - days, hours, minutes, seconds
          },
      
          update() {
            this.frame = requestAnimationFrame(this.update.bind(this));
      
            if (this.i++ % 10) {return;} // wait for real second
      
            var t = moment(new Date());
      
            // Calculation adapted from https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/
      
            t = this.countdown.diff(t);
      
            if (t>0){
              this.time.Days = Math.floor(t / (1000 * 60 * 60 * 24));
              this.time.Hours = Math.floor(t / (1000 * 60 * 60) % 24);
              this.time.Minutes = Math.floor(t / 1000 / 60 % 60);
              this.time.Seconds = Math.floor(t / 1000 % 60);
            } else {
              cancelAnimationFrame(this.frame);
              this.invisible = true;
            }
      
            this.time.Total = t;
      
            this.$broadcast('time', this.time);
            return this.time;
          } 
        } 
      });
      </script>
    `);
    });
  }

  