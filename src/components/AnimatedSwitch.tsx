import { AnimatedSwitch, spring } from "react-router-transition";
import styled from "styled-components";

const SwitchComponent = AnimatedSwitch;

const glide = (val: number) => spring(val, { stiffness: 250, damping: 20 });

const mapStyles = (styles: any) => ({
  transform: `translate(${styles.offset}%)`,
});

const MyAnimatedSwitch = styled(SwitchComponent).attrs(() => ({
  atEnter: { offset: 100 },
  atLeave: { offset: glide(-100) },
  atActive: { offset: glide(0) },
  mapStyles,
}))`
  position: relative;
  overflow: hidden;
  height: 100vh;
  width: 100vw;

  > div {
    postion: absolute;
    overflow: hidden;
    height: 100vh;
    width: 100vw;
  }
`;

export default MyAnimatedSwitch;
