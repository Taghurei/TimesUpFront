<template>
  <div class="base-timer">
    <svg
      class="base-timer__svg"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g class="base-timer__circle">
        <circle
          class="base-timer__path-elapsed"
          cx="50"
          cy="50"
          r="45"
        />
        <path
            :stroke-dasharray="circleDasharray"
            :class="remainingPathColor"
            class="base-timer__path-remaining"
            d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
            "
        ></path>
      </g>
    </svg>
    <span class="base-timer__label">
      {{ formattedTimeLeft }}
    </span>
  </div>
</template>

<script>


export default {
  props: {
    timeLeft: {
      type: Number,
      required: true,
    },
    timeLimit: {
      type: Number,
      required: true,
    },
    alertThreshold: {
      type: Number,
      default: 5,
    },
    warningThreshold: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    // Update the dasharray value as time passes, starting with 283
    circleDasharray() {
      return `${(this.timeFraction * 283).toFixed(0)} 283`;
    },
    timeFraction() {
      const rawTimeFraction = this.timeLeft / this.timeLimit;
      return rawTimeFraction
        - (1 / this.timeLimit) * (1 - rawTimeFraction);
    },
    formattedTimeLeft() {
      const { timeLeft } = this;
      const minutes = Math.floor(timeLeft / 60);
      let seconds = timeLeft % 60;
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }
      // The output in MM:SS format
      return `${minutes}:${seconds}`;
    },
    colorCodes() {
      return {
        info: {
          color: 'green',
        },
        warning: {
          color: 'orange',
          threshold: this.warningThreshold,
        },
        alert: {
          color: 'red',
          threshold: this.alertThreshold,
        },
      };
    },
    remainingPathColor() {
      const { alert, warning, info } = this.colorCodes;
      if (this.timeLeft <= alert.threshold) {
        return alert.color;
      } if (this.timeLeft <= warning.threshold) {
        return warning.color;
      }
      return info.color;
    },
  },
};
</script>
<style scoped lang="scss">
.base-timer {
  position: relative;
  width: 300px;
  height: 300px;
/* Removes SVG styling that would hide the time label */
  &__circle {
    fill: none;
    stroke: none;
  }
/* The SVG path that displays the timer's progress */
  &__path-elapsed {
    stroke-width: 7px;
    stroke:grey;
  }
  &__label {
    position: absolute;

    /* Size should match the parent container */
    width: 300px;
    height: 300px;
    /* Keep the label aligned to the top */
    top: 0;
    /* Create a flexible box that centers content vertically and horizontally */
    display: flex;
    align-items: center;
    justify-content: center;
    /* Sort of an arbitrary number; adjust to your liking */
    font-size: 48px;
  }
  &__path-remaining {
    stroke-width: 7px;
    stroke-linecap: round;
    transform: rotate(90deg);
    transform-origin: center;
    transition: 1s linear all;
    fill-rule: nonzero;
    stroke: currentColor;
    &.green {
      color: rgb(65, 184, 131);
    }
    &.orange {
      color: orange;
    }
    &.red {
      color: red;
    }
  }
  &__svg {
    // Flips the svg and makes the animation to move left-to-right
    transform: scaleX(-1);
  }
}
</style>
