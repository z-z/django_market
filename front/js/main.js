"use strict"
/**
 * инициализация всех инициализаций
 */
$(document).ready(function()
{
	o2.init();
});

/**
 * основной объект
 * @type {object}
 */
var o2 =
{
	/**
	 * вызов функций, которые должны запускаться при загрузке страницы
	 */
	init()
	{
		this.sliders = o2Sliders;
		this.o2Anim = o2Anim;
		this.productItem = o2ProductItem;
		this.popups = o2Popups;

		this.lazyLoad.init();
		this.spoiler.init();
		this.sliders.init();
		this.popups.init()
		this.productItem.init();
		this.o2Anim.init();
		this.productItem.init();
		this.rangeSlider.init();
		this.setVh();
		this.cartItemQuantity();
		this.footerDown();
		this.search.initEvents();
	},
	lazyLoad:
	{
		lazy: null,
		init()
		{
			this.lazy = new LazyLoad({
				elements_selector: ".lazy-image",
				threshold: 100,
			});
		}
	},
	tabs:
	{
		open(instance, tabId)
		{
			const tabsContainer = $(instance).parents('._tabs-container');
			const openedTab = $(tabsContainer).find('.tab[data-tab-id="' + tabId + '"]');
			const offer = $('.order-register__bottom-offer');

			if ($(openedTab).hasClass('tab_open'))
				return false;

			$(tabsContainer).find('.tab.tab_open').fadeOut(200, () =>
			{
				$('.tab').removeClass('tab_open')
				$(openedTab).fadeIn(200).addClass('tab_open');
			});

			this.markActiveTab(instance);

			if(tabId == 2)
			{
				offer.addClass('order-register__bottom-offer--active');
				$('.checkout-summary__line--delivery').addClass('checkout-summary__line--hide');
			}else
			{
				offer.removeClass('order-register__bottom-offer--active');
				$('.checkout-summary__line--delivery').removeClass('checkout-summary__line--hide');
			}
		},
		markActiveTab(activeItem)
		{
			$('.detail-description__item').each((index, item) =>
			{
				if ($(item).hasClass('detail-description__item_active'))
					$(item).removeClass('detail-description__item_active');
				$(activeItem).addClass('detail-description__item_active');
			})
		}
	},
	rangeSlider:
	{
		init()
		{
			$('.price-range').each((index, element) =>
			{
				const dataParams = $(element).data();
				const minName = $(element).attr('data-field-min-name');
				const maxName = $(element).attr('data-field-max-name');
				const type = $(element).attr('data-type');

				const slider = noUiSlider.create(element, {
					start: [dataParams.from, dataParams.to],
					connect: true,
					step: 1,
					range:
					{
						'min': dataParams.min,
						'max': dataParams.max
					},
				});
				if (type == 'single')
					$(element).find('.noUi-origin').first().attr('disabled', true);
				const moneyFormat = (number) =>
				{
					return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
				};
				// настраиваем лэйблы для слайдера
				const sliderLabels = $(element).siblings('.price-slider-labels');
				if (sliderLabels.length)
				{
					const labelFrom = sliderLabels.find('.price-slider-labels_from');
					const labelTo = sliderLabels.find('.price-slider-labels_to');
					slider.on('update', function (values)
					{
						labelFrom.html(moneyFormat(Number(values[0])));
						labelTo.html(moneyFormat(Number(values[1])));
					});
				};
				slider.on('set', function (values, handle)
				{
					if (handle == 0)
						$(this.target).siblings('input[name="' + minName + '"]').trigger('change')
					else
						$(this.target).siblings('input[name="' + maxName + '"]').trigger('change')
				});
				slider.on('update', function (values)
				{
					$(this.target).siblings('input[name="' + minName + '"]').val(values[0]);
					$(this.target).siblings('input[name="' + maxName + '"]').val(values[1]);
				});
			})
		}
	},
	/**
	 * добавляем в css переменную --vh
	 */
	setVh()
	{
		var vh = window.innerHeight * 0.01;

		document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
		window.addEventListener('resize', function ()
		{
			var vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
		});
	},
	/*
	* отслеживание клика вне блока
	*/
	clickOutside(element, callback)
	{
		var outsideChecker = (event) =>
		{
			var container = $(element);

			if (!container.is(event.target) && container.has(event.target).length === 0)
				{
					document.removeEventListener('click', outsideChecker);
					callback(container);
				}
		};

		document.addEventListener('click', outsideChecker);
		return outsideChecker;
	},
	scrollTo(elementClass)
	{
		$('body, html').animate({
			scrollTop: $(elementClass).offset().top
		}, 200);
	},
	spoiler:
	{
		init()
		{
			const promoState = o2Cookie.get('promo_visibility');

			if (typeof promoState === 'undefined')
			{
				let date = new Date(Date.now() + 86400e3);
				date = date.toUTCString();

				o2Cookie.set(
					'promo_visibility',
					true,
					{
						path: '/',
						expires: date
					});
				$('.promo-top').addClass('promo-top_show');
			}
			else if (JSON.parse(promoState))
				$('.promo-top').addClass('promo-top_show');
			else if (!JSON.parse(promoState))
				$('.promo-top').removeClass('promo-top_show');
		},
		/**
		 * Выпадающее меню
		 */
		toggle(instance)
		{
			const clickOutsideListener = o2.clickOutside($('.auth-line, .auth-line__item'), (element) =>
			{
				$('.auth-line__reg-dropdown').removeClass('active')
				$('.auth-line__item_user').removeClass('active')
			});

			$(instance).toggleClass('active');
			$(instance).next().toggleClass('active');
		},
		hide(instance, myclass)
		{
			o2Cookie.set('promo_visibility', false, { path: '/' })
			$(instance).parents(myclass).removeClass('promo-top_show');
		}
	},

	select:
	{
		/**
		* открыт ли список
		*/
		isOpen: false,

		curSelect: null,
		/**
		* ссылка на обработчик клика вне блока
		*/
		clickOutsideListener: null,

		/**
		* открытие/закрытие списка
		*/
		selectDropdownToggle(instance)
		{
			$('.g-select').removeClass('g-select_opened');

			const openSelect = instance =>
			{
				this.clickOutsideListener = o2.clickOutside($(instance).parents('.g-select'), () =>
				{
					o2.select.selectDropdownToggle(instance)
				});

				$(instance).parent('.g-select').addClass('g-select_opened');
				this.curSelect = $(instance).data('id');
				this.isOpen = true;
			};

			const closeSelect = instance =>
			{
				$(instance).parent('.g-select').removeClass('g-select_opened');
				document.removeEventListener('click', this.clickOutsideListener);
				this.isOpen = false;
			};

			if (!this.isOpen)
			{
				openSelect(instance);
			}
			else if (this.curSelect != $(instance).data('id'))
			{
				closeSelect(instance);
				openSelect(instance);
			}
			else
			{
				closeSelect(instance)
			}
		},

		/**
		* устанавливаем название выбранного города
		*/
		setSelectedItemName(instance)
		{
			$(instance).parents('.g-select').find('._selected-item-name').html($(instance).html());
			$(instance).parents('.g-select')[0].dataset.value = $(instance).html();
		},

		/**
		* выбор города в шапке
		*/
		markSelectedItem(instance)
		{
			$(instance).parent('.g-select-list__items').children().each((index, element) =>
			{
				if ($(element).hasClass('g-select-list__item_active'))
					$(element).removeClass('g-select-list__item_active');
			})
			$(instance).addClass('g-select-list__item_active');
			this.setSelectedItemName(instance);
			this.selectDropdownToggle($(instance).parents('.g-select').find('.g-select__selected'));
		}
	},
	footerDown ()
	{
		const windowHeight = $(window).height();
		const contentHeight = $('html').height();

		if (windowHeight >= contentHeight)
			{
				$('footer').addClass('footer--down');
			}
	},
	cartItemQuantity()
	{
		if ($('.cart__detail-item').length > 1)
		{
			$('.cart__detail-item:last-child').addClass('cart__detail-item--last');
		}
	},
	questionOpen(instance)
	{
		$(instance).find('.faq__icon').toggleClass('faq__icon--active');
		$(instance).siblings('.faq__answer').toggleClass('faq__answer--active');
	},
	search:
	{
		timeOut: null,
		searchAjax(searchValue)
		{
			if(this.timeOut)
				clearTimeout(this.timeOut);
			this.timeOut = setTimeout(()=>{
				$.ajax({
					type: 'POST',
					url: '/local/templates/gelios/components/odva/products/search-preview/ajax.php',
					data: {search: searchValue},
					dataType: 'json',
					success: function(data){
						if(!data.success)
							return;

						$('.search-input__items-wr').empty();
						$('.search-input__items-wr').append(data.productHtml);
						$('.search-input__items-wr').css('display', 'block');
					}
				});
			}, 500);
		},
		initEvents()
		{
			$(document).mouseup(function (e) {
				let container = $('.search-input__items-wr');
				let search = $('.search-input__block');
				if (container.has(e.target).length === 0 && $(container).css('display') === 'block' && search.has(e.target).length === 0)
				{
					container.hide();
				}
			});
		}
	},
	notificationPopap(content, color = '#01a54e')
	{
		$('.notification__popap').css('display', 'flex');
		$('.notification__popap_content').text(content);
		$('.notification__popap_content').css('border-bottom', `3px solid ${color}`);
		setTimeout(() => {
			$('.notification__popap').css('display', 'none');
		}, 3000);
	}
}