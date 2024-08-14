function ActiveSpeakerAnimation() {
  let waveStyle = `
@keyframes quiet {
  25%{
    transform: scaleY(.6);
  }
  50%{
    transform: scaleY(.4);
  }
  75%{
    transform: scaleY(.8);
  }
}

@keyframes normal {
  25%{
    transform: scaleY(1);
  }
  50%{
    transform: scaleY(.4);
  }
  75%{
    transform: scaleY(.6);
  }
}
@keyframes loud {
  25%{
    transform: scaleY(1);
  }
  50%{
    transform: scaleY(.4);
  }
  75%{
    transform: scaleY(1.2);
  }
}

.boxContainer{
      bottom: 0;
    transform: translate(-30%, -10%);
    left: 50%;
      position: absolute;
    z-index: 888;
    background: #5c2ba8;
    padding: 5px 5px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    height: 20px;
    --boxSize: 8px;
    --gutter: 4px;
    width: calc((var(--boxSize) + var(--gutter)) * 1.8);
}
.box{
     transform: scaleY(.4);
    height: 100%;
    width: 2px;
    background: #fff;
    animation-duration: 1.2s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    border-radius: 8px;
}
.box1{
  animation-name: quiet;
}
.box2{
  animation-name: normal;
}
.box3{
  animation-name: quiet;
}
.box4{
  animation-name: loud;
}
.box5{
  animation-name: quiet;
}
`;

  return (
    <>
      <style>{waveStyle}</style>
      <div class="boxContainer">
        {/* <div class="box box1"></div> */}
        {/* <div class="box box2"></div> */}
        <div class="box box3"></div>
        <div class="box box4"></div>
        <div class="box box5"></div>
      </div>
    </>
  );
}

export default ActiveSpeakerAnimation;
