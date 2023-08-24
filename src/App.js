import { gsap } from "gsap";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { Link } from "react-router-dom";

const Circle = forwardRef(({ size, delay }, ref) => {
  const el = useRef();

  useImperativeHandle(
    ref,
    () => {
      return {
        moveTo(x, y) {
          gsap.to(el.current, { x, y, delay });
        },
      };
    },
    [delay]
  );

  return <div className={`circle ${size}`} ref={el}></div>;
});

const App = () => {
  const circleRef = useRef([]);

  circleRef.current = [];

  useEffect(() => {
    const { innerWidth, innerHeight } = window;
    circleRef.current.forEach((ref) =>
      ref.moveTo(innerWidth / 2, innerHeight / 2)
    );

    const moveOn = ({ clientX, clientY }) => {
      circleRef.current.forEach((ref) => ref.moveTo(clientX, clientY));
    };

    window.addEventListener("pointermove", moveOn);

    return () => {
      window.removeEventListener("pointermove", moveOn);
    };
  }, []);

  const addCircleRef = (ref) => {
    if (ref) {
      circleRef.current.push(ref);
    }
  };

  useEffect(() => {
    const allClass = Array.from(document.querySelectorAll("a"));

    allClass?.forEach((elem) => {
      elem.addEventListener("mousemove  ", () => {
        gsap.to(elem, {
          y: 200,
        });
      });
    });
  }, []);

  return (
    <div id="App">
      <h1>Hello</h1>
      <Circle size="sm" ref={addCircleRef} delay={0} />
      <Circle size="md" ref={addCircleRef} delay={0.1} />
      <Circle size="lg" ref={addCircleRef} delay={0.2} />
    </div>
  );
};

export default App;
