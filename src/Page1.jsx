import React from "react";
import "./Page1.css";

export default function Page1() {
  return (
    <div className="page1" id="home">
      <div className="fisheye-grid">

        {/* Column 1 */}
         <div className="fisheye">
          <div className="glow-effect"></div>
          <video
            className="fisheye-video"
            src="./videos/FishEyeRova.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        <div className="fisheye">
          <div className="glow-effect"></div>
          <video
            className="fisheye-video"
            src="./videos/BloomCatsFishEye.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

          <div className="fisheye">
          <div className="glow-effect"></div>
          <video
            className="fisheye-video"
            src="./videos/FishEyeFlora.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        {/* Column 2 */}
        <div className="fisheye">
          <div className="glow-effect"></div>
          <video
            className="fisheye-video"
            src="./videos/FishEyeGlobe.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        <div className="fisheye">
          <div className="glow-effect"></div>
          <video
            className="fisheye-video"
            src="./videos/FishEyeChampagne2.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

         <div className="fisheye fisheye">
          <div className="glow-effect"></div>
          <video
            className="fisheye-video"
            src="./videos/FishEyeCreativeMinds.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        {/* Column 3 - Center */}
          <div className="fisheye fisheye">
          <div className="glow-effect"></div>
          <video
            className="fisheye-video"
            src="./videos/FlowerTwistFishEye.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        <div className="fisheye center-fisheye">
          <div className="glow-effect"></div>
          <video
            className="fisheye-video"
            src="./videos/BluePoolName.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        <div className="fisheye">
          <div className="glow-effect"></div>
          <video
            className="fisheye-video"
            src="./videos/FisheyeBeach.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        {/* Column 4 */}
       <div className="fisheye">
          <div className="glow-effect"></div>
          <video
            className="fisheye-video"
            src="./videos/FishEyeTrain.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

         <div className="fisheye">
          <div className="glow-effect"></div>
          <video
            className="fisheye-video"
            src="./videos/BlowUpFishEye.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
          
          <div className="fisheye">
          <div className="glow-effect"></div>
          <video
            className="fisheye-video"
            src="./videos/LadyBugFishEye.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>


        {/* Column 5 */}
            <div className="fisheye">
          <div className="glow-effect"></div>
          <video
            className="fisheye-video"
            src="./videos/LadyBugFishEye.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

              <div className="fisheye">
          <div className="glow-effect"></div>
          <video
            className="fisheye-video"
            src="./videos/RingTwistFishEye.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

                      <div className="fisheye">
          <div className="glow-effect"></div>
          <video
            className="fisheye-video"
            src="./videos/RingTwistFishEye.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

      </div>
    </div>
  );
}
