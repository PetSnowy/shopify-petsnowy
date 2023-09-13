$(function () {
	const visibleHeight = document.documentElement.clientHeight / 2;
	const title = document.querySelectorAll('.title');
	const select = document.querySelectorAll('select')[0];

	let value = '';
	$('.search input').on('input', function () {
		value = $(this).val().trim();
	});

	const descTitle = document.querySelectorAll('.ques_title');
	const descText = document.querySelectorAll('.answer_txt');
	const content = [];
	for (let i = 0; i < descTitle.length; i++) {
		content.push({ title: descTitle[i].innerText.trim(), text: descText[i].innerText.trim() });
	}
	let searchResult = [];

	$('.search button').click(debounce(seek, 500));

	$('.search input').on('keydown', function (event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			debounce(seek, 500)();
		}
	});

	function debounce(func, delay) {
		let timeoutId;
		return function () {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				func.apply(this, arguments);
			}, delay);
		};
	}

	let lastUserSearch = ''
	function seek() {
		if (value === lastUserSearch) return
		lastUserSearch = value

		searchResult = [];
		let left = 0,
			right = content.length - 1;
		const regex = new RegExp(value, 'gi');
		while (left < right) {
			if (content[left].title.match(regex) || content[left].text.match(regex)) {
				searchResult.push(content[left]);
			}
			if (content[right].title.match(regex) || content[right].text.match(regex)) {
				searchResult.push(content[right]);
			}
			left++;
			right--;
		}
		if (left === right && (content[left].title.match(regex) || content[left].text.match(regex))) {
			searchResult.push(content[left]);
		}
		createElementSearchResult();
	}

	function createElementSearchResult() {
		if (value === '') {
			$('.search-result').hide();
			$('.faq-wrapper').show();
			$('.faq-page').find('h1').show();
			$('.m-sidebar-wrapper').show();
			return;
		}
		const search_result = document.querySelector('.search-result');
		$('.faq-wrapper').hide();
		$('.search-result').empty();
		$('.search-result').show();
		$('.m-sidebar-wrapper').hide();
		$('.faq-page').find('h1').hide();

		if (!searchResult.length) {
			const q = document.createElement('p');
			q.innerHTML = 'No search results';
			search_result.appendChild(q);
			return;
		}

		for (let i = 0; i < searchResult.length; i++) {
			const faqItem = document.createElement('div');
			const q = document.createElement('p');
			q.innerHTML = searchResult[i].title.replace(new RegExp(value, 'gi'), (match) => `<mark>${match}</mark>`);
			const a = document.createElement('p');
			a.innerHTML = searchResult[i].text.replace(new RegExp(value, 'gi'), (match) => `<mark>${match}</mark>`);
			faqItem.appendChild(q);
			faqItem.appendChild(a);
			search_result.appendChild(faqItem);
		}
	}

	const asideItem = document.querySelectorAll('.aside-item');

	for (let i = 0; i < asideItem.length; i++) {
		asideItem[i].addEventListener('click', function () {
			title[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
		});
	}
	const pageSidebar = document.querySelectorAll('.page-sidebar');
	const faqWrapper = document.querySelectorAll('.faq-wrapper');
	const page = document.querySelectorAll('.faq_qa_main');

	function sidebarScroll() {
		const active = document.querySelector('.active');
		for (let i = 0; i < pageSidebar.length; i++) {
			active && (pageSidebar[i].scrollTop = active.offsetTop);
		}
	}

	const scroll = () => {
		const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
		for (let index = 0; index < title.length; index++) {
			if (scrollTop > title[index].offsetTop - visibleHeight) {
				$('.aside-item').removeClass('active');
				$('.aside-item').eq(index).addClass('active');
				select.value = title[index].innerText;
			}
		}
		sidebarScroll();
	};

	$('select').empty();

	for (let index = 0; index < title.length; index++) {
		const option = document.createElement('option');
		option.innerText = title[index].innerText;
		select.appendChild(option);
	}

	function resize() {
		const innerWidth = window.innerWidth;
		if (innerWidth <= 900) {
			window.addEventListener('scroll', mobileSelect, { passive: true });
			removeEventListener('scroll', debounce(scroll, 100), { passive: true });
		} else {
			window.addEventListener('scroll', debounce(scroll, 100), { passive: true });
			removeEventListener('scroll', mobileSelect, { passive: true });
		}
	}
	resize()
	window.addEventListener('resize', resize, { passive: true });


	const mSidebarWrapper = document.querySelector('.m-sidebar-wrapper')
	function mobileSelect() {
		const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
		const headerTop = document.querySelector('header').offsetHeight;
		mSidebarWrapper.style.top = `${headerTop}px`
	}

	$('select').change(function () {
		let selectedIndex = $(this).prop('selectedIndex');
		title[selectedIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
	});

	$('.faq_qa_main').each((index, item) => {
		if (index) {
			$(item).find('.page-sidebar').hide();
			$(item).find('.m-sidebar-wrapper').hide();
			$(item).find('.search').hide();
		}
	});

});