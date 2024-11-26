export const fadeInSlideUpAnimation = {
  initial: { opacity: 0, y: 40 }, // 시작 상태: 아래에서 투명
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }, // 애니메이션: 불투명 + 원위치
  exit: { opacity: 0, y: 25, transition: { duration: 0.3, ease: "easeOut" } }, // 종료 애니메이션: 다시 아래로 이동 + 투명
};
export const fadeInCommonOption = {
  variants: fadeInSlideUpAnimation,
  initial: "initial",
  whileInView: "animate",
  exit: "exit",
  viewport: { once: true },
};

const fadeInAnimation = {
  initial: { opacity: 0 }, // 시작 상태: 투명
  animate: { opacity: 1, transition: { duration: 1, ease: "easeOut" } }, // 애니메이션: 불투명
  exit: { opacity: 0, y: 20, transition: { duration: 0.3, ease: "easeOut" } }, // 종료 애니메이션: 다시 아래로 이동 + 투명
}

export const fadeInInfiniteScrollOption = {
  variants: fadeInAnimation,
  initial: "initial",
  whileInView: "animate",
  exit: "exit",
  viewport: { once: true },
};
