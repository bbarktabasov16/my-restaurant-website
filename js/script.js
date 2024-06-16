window.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items"),
		gender = document.getElementById('gender'),
		low = document.getElementById('low'),
		small = document.getElementById('small'),
		medium = document.getElementById('medium'),
		high = document.getElementById('high'),
		calcResult = document.getElementById('calcResult')

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add('hide')
			item.classList.remove('show', 'fade')
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContents(i = 0) {
    tabsContent[i].classList.add('show', 'fade')
    tabsContent[i].classList.remove('hide')
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContents();

  tabsParent.addEventListener('click', (event) => {
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


	function removeGenderClass () {
		gender.children[0].classList.remove('calculating__choose-item_active')
	}

	removeGenderClass()

	gender.addEventListener('click', (event) => {
		if (event.target == document.querySelector('.calculating__choose-item-one')) {
			document.querySelector('.calculating__choose-item-one').classList.add('calculating__choose-item_active')
			document.querySelector('.calculating__choose-item-two').classList.remove('calculating__choose-item_active')
		}
		if (event.target == document.querySelector('.calculating__choose-item-two')) {
			document.querySelector('.calculating__choose-item-two').classList.add('calculating__choose-item_active')
			document.querySelector('.calculating__choose-item-one').classList.remove('calculating__choose-item_active')
		}
	})

	low.addEventListener('click', () => {
		low.classList.add('calculating__choose-item_active')
		small.classList.remove('calculating__choose-item_active')
		medium.classList.remove('calculating__choose-item_active')
		high.classList.remove('calculating__choose-item_active')
		calcResult.innerHTML = 3200
	})
	small.addEventListener('click', () => {
		small.classList.add('calculating__choose-item_active')
		low.classList.remove('calculating__choose-item_active')
		medium.classList.remove('calculating__choose-item_active')
		high.classList.remove('calculating__choose-item_active')
		calcResult.innerHTML = 2900
	})
	medium.addEventListener('click', () => {
		medium.classList.add('calculating__choose-item_active')
		small.classList.remove('calculating__choose-item_active')
		low.classList.remove('calculating__choose-item_active')
		high.classList.remove('calculating__choose-item_active')
		calcResult.innerHTML = 2500
	})
	high.addEventListener('click', () => {
		high.classList.add('calculating__choose-item_active')
		small.classList.remove('calculating__choose-item_active')
		medium.classList.remove('calculating__choose-item_active')
		low.classList.remove('calculating__choose-item_active')
		calcResult.innerHTML = 2100
	})

});

