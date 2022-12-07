import { applyContent } from "./apply-content-ui.js";
import { attractView } from "./attract-view.js";
import { mainVideoView } from "./main-video-view.js";

function callFetchCreateUI() {
  fetch("./common/content.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //console.log(data);

      // Populate innerHTML for all content + all languages
      applyContent(data);

      // Create the attract video loop
      attractView.createAttractLoop(data.attract_video_path);

      // Pass the data to main-video-view.js so it can set en/es main video paths
      mainVideoView.storeVideoPaths(data);
    });
}

export { callFetchCreateUI };
