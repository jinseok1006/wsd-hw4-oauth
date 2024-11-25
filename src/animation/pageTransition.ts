export const pageTransition = {
  initial: { opacity: 0, y: -50 }, // 초기 위치 (위로 50px 이동)
  animate: { opacity: 1, y: 0 }, // 애니메이션 중 위치 (원래 위치)
  exit: { opacity: 0, y: 50 }, // 종료 위치 (아래로 50px 이동)
  transition: { duration: 0.5 }, // 전환 시간 (0.5초)
};

export const fadeInAnimation = {
  initial: { opacity: 0, y: 40 }, // 시작 상태: 아래에서 투명
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }, // 애니메이션: 불투명 + 원위치
  exit: { opacity: 0, y: 25, transition: { duration: 0.3, ease: "easeOut" } }, // 종료 애니메이션: 다시 아래로 이동 + 투명
};
export const fadeInCommonOptions = {
  variants: fadeInAnimation,
  initial: "initial",
  whileInView: "animate",
  exit: "exit",
  viewport: { once: true },
};

// export const fadeInInfiniteScroll = {
//   initial: { opacity: 0, y: 20 }, // 시작 상태: 약간 아래에서 투명
//   animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }, // 애니메이션: 불투명 + 원위치
// };

