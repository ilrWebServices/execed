CRN.tabToggle = ((CRN, $) => {

  let toggleTabs = (active, target) => {
    active.classList.remove('active');
    active.setAttribute('area-selected', 'false');
    target.classList.add('active');
    target.setAttribute('area-selected', 'true');
  };

  let toggleTabContent = (active, target) => {
    let activeContent = document.getElementById(active);
    let targetContent = document.getElementById(target);
    activeContent.classList.remove('active');
    activeContent.setAttribute('area-hidden', 'true');
    targetContent.classList.add('active');
    activeContent.setAttribute('area-hidden', 'false');
  };

  const init = () => {
    const tabs = [...document.querySelectorAll('.tab')];

    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        let targetTab = e.target;
        let targetHref = e.target.getAttribute('data-for');
        let activeTab = document.getElementsByClassName('tab active')[0];
        let activeHref = activeTab.getAttribute('data-for');

        if (targetHref === activeHref) return;
        toggleTabs(activeTab, targetTab);
        toggleTabContent(activeHref, targetHref);
      });
    });
  };

  return {
    init
  }

})(CRN, jQuery);