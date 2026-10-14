// Stop the browser from auto-restoring the previous scroll position on refresh
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);
window.addEventListener('load', () => window.scrollTo(0, 0));

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  menuToggle.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
});

// Close mobile menu when a link is clicked
document.querySelectorAll('nav ul a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    menuToggle.textContent = '☰';
  });
});

// Scroll reveal animations
const reveals = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  const elementVisible = 100;

  reveals.forEach(reveal => {
    const elementTop = reveal.getBoundingClientRect().top;
    if (elementTop < windowHeight - elementVisible) {
      reveal.classList.add('active');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Trigger once on load

/* ================= CURSOR FOLLOW ================= */

const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");

if (cursorDot && cursorRing) {

    let mouseX = 0;
    let mouseY = 0;

    let ringX = 0;
    let ringY = 0;


    document.addEventListener("mousemove", (e) => {

        mouseX = e.clientX;
        mouseY = e.clientY;

        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;

        cursorDot.style.opacity = "1";
        cursorRing.style.opacity = "1";

    });


    function animateCursor() {

        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;

        cursorRing.style.left = `${ringX}px`;
        cursorRing.style.top = `${ringY}px`;

        requestAnimationFrame(animateCursor);

    }

    animateCursor();


    /* Enlarge cursor over clickable elements */

    const clickableElements = document.querySelectorAll(
        "a, button, .project-box, .contact-card"
    );


    clickableElements.forEach((element) => {

        element.addEventListener("mouseenter", () => {

            cursorRing.style.width = "46px";
            cursorRing.style.height = "46px";

        });


        element.addEventListener("mouseleave", () => {

            cursorRing.style.width = "32px";
            cursorRing.style.height = "32px";

        });

    });

}
// ================= SCROLL PROGRESS =================

const scrollProgress = document.querySelector(".scroll-progress");
if (scrollProgress) {
    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const pageHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;
        const progress =
            pageHeight > 0
                ? (scrollTop / pageHeight) * 100
                : 0;
        scrollProgress.style.width = progress + "%";
    }
    window.addEventListener("scroll", updateScrollProgress);
    updateScrollProgress();

}
if (window.matchMedia("(hover: hover)").matches) {

    const magneticButtons =
        document.querySelectorAll(".btn");

    magneticButtons.forEach((button) => {

        button.addEventListener("mousemove", (e) => {

            const rect =
                button.getBoundingClientRect();

            const x =
                e.clientX -
                (rect.left + rect.width / 2);

            const y =
                e.clientY -
                (rect.top + rect.height / 2);

            button.style.transform =
                `translate(${x * 0.12}px, ${y * 0.12}px)`;
        });


        button.addEventListener("mouseleave", () => {

            button.style.transform =
                "translate(0, 0)";

        });

    });

}
const viewButton = document.querySelector('.js-view');

if (viewButton) {
  viewButton.addEventListener('click', () => {
    window.open('./img/resume103.pdf', '_blank');
  });
}



const outer = document.getElementById("dinoOuter");
const inner = document.getElementById("dinoInner");
const dino = document.getElementById("dino");

if (outer && inner && dino) {
  const frames = [
    "img/Dion/T1.png",
    "img/Dion/T2.png",
    "img/Dion/T1.png",
    "img/Dion/T2.png",
    "img/Dion/T1.png",
    "img/Dion/T2.png",
    "img/Dion/T1.png",
    "img/Dion/T2.png",
    "img/Dion/T1.png",
    "img/Dion/T2.png",
    "img/Dion/T1.png",
    "img/Dion/T2.png",
    "img/Dion/T1.png",
    "img/Dion/T2.png",
    "img/Dion/T1.png",
    "img/Dion/T4.png"
    
  ];

  // Preload both running images
  frames.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  let x = 0;
  let direction = 1;
  let frame = 0;
  let lastTime = 0;
  let lastFrame = 0;
  let jumping = false;
  let jumpTimer;

  const speed = 90;
  const frameDelay = 150;

  function animate(time) {
    const maxX = Math.max(
      0,
      inner.clientWidth - dino.offsetWidth
    );

    if (lastTime === 0) lastTime = time;

    const delta = Math.min((time - lastTime) / 1000, 0.05);
    lastTime = time;

    if (maxX > 0) {
      x += direction * speed * delta;

      if (x >= maxX) {
        x = maxX;
        direction = -1;
      } else if (x <= 0) {
        x = 0;
        direction = 1;
      }
    }

    dino.style.left = `${x}px`;

    inner.classList.toggle("facing-left", direction === -1);

    if (!jumping && time - lastFrame >= frameDelay) {
      frame = (frame+1)%frames.length;
      dino.src = frames[frame];
      lastFrame = time;
    }

    requestAnimationFrame(animate);
  }

  // Jump when clicking or touching anywhere in the outer area
  outer.addEventListener("pointerdown", () => {
    if (jumping) return;

    jumping = true;
    inner.classList.add("jumping");

    clearTimeout(jumpTimer);

    jumpTimer = setTimeout(() => {
      inner.classList.remove("jumping");
      jumping = false;
    }, 500);
  });

  window.addEventListener("resize", () => {
    const maxX = Math.max(
      0,
      inner.clientWidth - dino.offsetWidth
    );

    x = Math.min(x, maxX);
    dino.style.left = `${x}px`;
  });

  // Start exactly one animation loop
  requestAnimationFrame(animate);
}
