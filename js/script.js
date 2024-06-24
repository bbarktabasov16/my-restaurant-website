window.addEventListener("DOMContentLoaded", () => {
  // tabs

  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items"),
    gender = document.getElementById("gender"),
    low = document.getElementById("low"),
    small = document.getElementById("small"),
    medium = document.getElementById("medium"),
    high = document.getElementById("high"),
    calcResult = document.getElementById("calcResult");

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContents(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContents();

  tabsParent.addEventListener("click", (event) => {
    const target = event.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContents(i);
        }
      });
    }
  });

  function removeGenderClass() {
    gender.children[0].classList.remove("calculating__choose-item_active");
  }

  removeGenderClass();

  gender.addEventListener("click", (event) => {
    if (
      event.target == document.querySelector(".calculating__choose-item-one")
    ) {
      document
        .querySelector(".calculating__choose-item-one")
        .classList.add("calculating__choose-item_active");
      document
        .querySelector(".calculating__choose-item-two")
        .classList.remove("calculating__choose-item_active");
    }
    if (
      event.target == document.querySelector(".calculating__choose-item-two")
    ) {
      document
        .querySelector(".calculating__choose-item-two")
        .classList.add("calculating__choose-item_active");
      document
        .querySelector(".calculating__choose-item-one")
        .classList.remove("calculating__choose-item_active");
    }
  });

  low.addEventListener("click", () => {
    low.classList.add("calculating__choose-item_active");
    small.classList.remove("calculating__choose-item_active");
    medium.classList.remove("calculating__choose-item_active");
    high.classList.remove("calculating__choose-item_active");
    calcResult.innerHTML = 2100;
  });
  small.addEventListener("click", () => {
    small.classList.add("calculating__choose-item_active");
    low.classList.remove("calculating__choose-item_active");
    medium.classList.remove("calculating__choose-item_active");
    high.classList.remove("calculating__choose-item_active");
    calcResult.innerHTML = 2500;
  });
  medium.addEventListener("click", () => {
    medium.classList.add("calculating__choose-item_active");
    small.classList.remove("calculating__choose-item_active");
    low.classList.remove("calculating__choose-item_active");
    high.classList.remove("calculating__choose-item_active");
    calcResult.innerHTML = 2900;
  });
  high.addEventListener("click", () => {
    high.classList.add("calculating__choose-item_active");
    small.classList.remove("calculating__choose-item_active");
    medium.classList.remove("calculating__choose-item_active");
    low.classList.remove("calculating__choose-item_active");
    calcResult.innerHTML = 3200;
  });

  // timer

  const deadline = "2024-07-15";

  function getTimeRemaining(endTime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endTime) - Date.parse(new Date());

    if (t <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24));
      hours = Math.floor((t / (100 * 60 * 60)) % 24);
      minutes = Math.floor((t / 1000 / 60) % 60);
      seconds = Math.floor((t / 1000) % 60);
    }

    return {
      t,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endTime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endTime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".timer", deadline);

  // Modal

  const modalTrigger = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal"),
    modalCloseBtn = document.querySelector("[data-close]");

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    // clearInterval(modalTimerId)
  }

  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  modalCloseBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  // const modalTimerId = setTimeout(openModal, 3000);

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);

  // Используем классы для карточек

  class MenuCard {
    constructor(src, alt, title, description, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.description = description;
      this.price = price;
			this.classes = classes
      this.parent = document.querySelector(parentSelector);
      this.transfer = 87;
      this.changeToKGS();
    }

    changeToKGS() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement("div");

			if (this.classes.length === 0) {
				this.element = 'menu__item'
				element.classList.add(this.element)
			} else {
				this.classes.forEach(className => element.classList.add(className))
			}

      element.innerHTML = `
				<img src=${this.src} alt=${this.alt} />
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.description}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> сом</div>
				</div>
			`;
      this.parent.append(element);
    }
  }

  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    4,
    ".menu .container",
		// "menu__item"
  ).render();

  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    "Меню “Премиум”",
		"В меню “Премиум” мы используем не только красивый дизайн упаковки,но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
		6,
    ".menu .container",
		"menu__item"
  ).render();

  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    5,
    ".menu .container",
		"menu__item"
  ).render();
});
