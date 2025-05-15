// useEffect(() => {
//   let hasFocus = true;
//   let lastX = null;
//   let lastY = null;
//   let timer = null;

//   function handleFocus() {
//     hasFocus = true;
//   }

//   window.addEventListener("focus", handleFocus);
//   window.addEventListener("blur", () =>
//     handleBlur(hasFocus, startTimeRef, hasTriggeredRef, timer, setScreenSaver)
//   );
//   window.addEventListener("mousemove", (e) =>
//     handleMouse(
//       e,
//       timer,
//       setScreenSaver,
//       hasFocus,
//       startTimeRef,
//       hasTriggeredRef,
//       screenSaver,
//       lastX,
//       lastY
//     )
//   );

//   return () => {
//     window.removeEventListener("focus", handleFocus);
//     window.removeEventListener("blur", () =>
//       handleBlur(
//         hasFocus,
//         startTimeRef,
//         hasTriggeredRef,
//         timer,
//         setScreenSaver
//       )
//     );
//     window.removeEventListener("mousemove", (e) =>
//       handleMouse(
//         e,
//         timer,
//         setScreenSaver,
//         hasFocus,
//         startTimeRef,
//         hasTriggeredRef,
//         screenSaver,
//         lastX,
//         lastY
//       )
//     );
//     clearTimeout(timer);
//   };
// }, [screenSaver]);

export function handleBlur(
  hasFocus,
  startTimeRef,
  hasTriggeredRef,
  timer,
  setScreenSaver
) {
  hasFocus = false;
  startTimeRef.current = Date.now();
  hasTriggeredRef.current = false;

  timer = setTimeout(() => {
    if (!hasFocus) {
      setScreenSaver(true);
    }
  }, 120000);
}

export function handleMouse(
  e,
  timer,
  setScreenSaver,
  hasFocus,
  startTimeRef,
  hasTriggeredRef,
  screenSaver,
  lastX,
  lastY
) {
  const { clientX, clientY } = e;

  if (clientX === lastX && clientY === lastY) return;
  lastX = clientX;
  lastY = clientY;

  clearTimeout(timer);

  timer = setTimeout(() => {
    setScreenSaver(true);
    hasFocus = false;
    startTimeRef.current = Date.now();
    hasTriggeredRef.current = false;
  }, 12000);

  if (screenSaver) {
    setScreenSaver(false);

    if (!hasTriggeredRef.current && startTimeRef.current) {
      // handleRequest(startTimeRef.current);
      hasTriggeredRef.current = true;
    }
  }
}
