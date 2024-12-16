export let is_mobile: boolean = window.innerWidth <= 675;

const updateMobileStatus = () => {
  is_mobile = window.innerWidth <= 675;
};

window.addEventListener('resize', updateMobileStatus);
