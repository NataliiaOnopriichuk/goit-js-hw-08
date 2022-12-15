import throttle from "lodash.throttle";

const iframe = document.querySelector("iframe");
const player = new Vimeo.Player(iframe);

const KEY_CURRENT_TIME = "videoplayer-current-time";

player.on("timeupdate", throttle(valueTime, 1000));

function valueTime({ seconds }) {
  const valueJSON = JSON.stringify(seconds);
  localStorage.setItem(KEY_CURRENT_TIME, valueJSON);
}

function getCurrentTime() {
  const onTime = +localStorage.getItem(KEY_CURRENT_TIME);
  return onTime || 0;
}

const currentTime = getCurrentTime();

player
  .setCurrentTime(currentTime)
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case "RangeError":
        break;

      default:
        break;
    }
  });
