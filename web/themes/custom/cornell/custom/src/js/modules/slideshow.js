CRN.slideShow = ((CRN, $) => {
  const slideTrack = document.getElementById('slideTrack');

  let appendNavDots = (numOfDots) => {
    const navDots = document.getElementById('navDots');

    for (let i = 0; i < numOfDots; i++) {
      let navDot = document.createElement('button');
      i == 0 ? (
        navDot.classList.add('nav-dot', 'active-dot'),
        navDot.id = `${i}`
      ) : (
        navDot.classList.add('nav-dot'),
        navDot.id = `-${i}`
      );
      navDots.appendChild(navDot);
    }
  }

  let toggleActiveDot = (current, target) => {
    let currentDot = document.getElementById(`${current}`);
    let targetDot = document.getElementById(`${target}`);
    currentDot.classList.remove('active-dot');
    targetDot.classList.add('active-dot');
  };

  let animateSlideTrack = (currentPos, targetPos) => {
    const slideIteration = document.querySelector('[data-interval]').getAttribute('data-interval');
    const iterationCount = isNaN(slideIteration) ? 1200 : slideIteration;
    
    slideTrack.animate([
      {
        transform: `translateX(calc(${currentPos} * 100%))`
      },
      {
        transform: `translateX(calc(${targetPos} * 100%))`
      }
    ], {
      duration: iterationCount,
      easing: 'ease-in-out',
      iterations: 1,
      fill: 'forwards'
    });
  };

  const init = () => {
    if (slideTrack) {
      let index = 0;
      let target;
      let touchSwipe = new Hammer(slideTrack);
      const slideshowNav = [...document.getElementsByClassName('js-slideshow-nav')];
      const slideCount = [...document.getElementsByClassName('slide')].length;
      const rangeMax = (slideCount * -1) + 1;
  
      slideshowNav.forEach(navSection => {
        navSection.addEventListener('click', (e) => {
          let element = e.target;
  
          if (element.nodeName != 'BUTTON' || element.id == index) return;
          if (element.id == 'next') {
            if (index == rangeMax) return;
            target = index - 1;
          } else if (element.id == 'prev') {
            if (index == 0) return;
            target = index + 1;
          } else {
            target = parseInt(element.id, 10);
          }
  
          animateSlideTrack(index, target);
          toggleActiveDot(index, target);
          index = target;
        });
      });
  
      touchSwipe.on('swipeleft swiperight', (ev) => {
        if (ev.type == 'swipeleft') {
          if (index == rangeMax) return;
          target = index - 1;
        } else {
          if (index == 0) return;
          target = index + 1;
        }
  
        animateSlideTrack(index, target);
        toggleActiveDot(index, target);
        index = target;
      });
  
      appendNavDots(slideCount);
    }
  };

  return {
    init
  }

})(CRN, jQuery);
