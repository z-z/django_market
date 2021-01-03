/**
 * Объект для работы с попами
*/
const o2Popups = {
	init()
	{
		this.sidebarButtonsHide()
		this.showHideMoreBtn('.detail-description__info')
	},

	showHelpMobMenu: function(instance)
	{
		$('.help-page__wr').toggleClass('help-page__wr_open');
		$('.help-page__arrow-svg').toggleClass('help-page__arrow-svg_open');
		$(instance).toggleClass('help-page__item_mb');
		$('.help-menu').toggleClass('display_none');
	},
	showPopup: function(popup)
	{
		$('._overlay').addClass('show');
		$(popup).addClass('show');
		$('body').css('overflow', 'hidden');
	},

	closePopup: function(init)
	{
		$('._overlay').removeClass('show');
		$('._popup').removeClass('show');
		$('body').css('overflow', 'visible');
		if($('.popup-recovery').length > 0)
		{
			sendPasswordBitrix.close();
		}
		const url = new URL(window.location);
		url.hash = '';
		history.replaceState(null, document.title, url);
	},

	mobileMenuShow()
	{
		$('.header__mobile').hide();
		$('.header__wrapper').show();
	},

	mobileMenuHide()
	{
		$('.header__mobile').show();
		$('.header__wrapper').hide();
		$('.catalog-mobmenu').removeClass('catalog-mobmenu_active');
		$('.catalog-mobmenu_second-lvl').removeClass('catalog-mobmenu_active');

	},
	closeIconShow()
	{
		$('.search-input__close').show();
	},
	closeIconHide()
	{
		$('.search-input__close').hide();
	},
	/**
	 * Показываем и скрываем поиск на мобильнрй версии
	 */
	searchInputShow()
	{
		$('.search-input__block').addClass('search-input__block_active');
		$('.header__mobile-search').hide();
		$('.ic-search-active').show();
		$('.search-input').focus();
	},
	searchInputHide()
	{
		$('.search-input__block').removeClass('search-input__block_active');
		$('.header__mobile-search').show();
		$('.ic-search-active').hide();
	},
	/*
	 * Очищаем input
	*/
	clearInput()
	{
		$('.search-input').val('');
	},
	/**
	 * Открываем и закрываем каталог
	 */
	openCalalog()
	{
		$('.catalog-menu').slideToggle(200);
		$('.header__btn-icon').toggleClass('header__btn-icon_active');
	},
	/**
	 * Открываем мобильный каталог
	 */
	openMobCatalog()
	{
		$('.catalog-mobmenu').addClass('catalog-mobmenu_active');
	},
	/**
	 * Шаг назад в мобильной версии каталога
	 */
	returnCatalog()
	{
		$('.catalog-mobmenu_second-lvl').removeClass('catalog-mobmenu_active');
		$('.catalog-mobmenu').addClass('catalog-mobmenu_active');
	},
	returnMenu()
	{
		$('.catalog-mobmenu').removeClass('catalog-mobmenu_active');
	},
	/**
	 * Открываем след уровень мобильной версии каталога
	 */
	openCatalogLinks(instance)
	{
		var id = $(instance).attr("id")
		$('div[data-id="' + id + '"]').addClass('catalog-mobmenu_active');
		$('.catalog-mobmenu').removeClass('catalog-mobmenu_active');
		$('.top-menu__list').hide()
	},
	simpleSliderImages(instance)
	{
		$('.simple-slider__item-wr').removeClass('simple-slider_mobile');
		$(instance).hide()
	},
	/**
	 *  Кнопка показать еще на главной в моб версии
	 */
	showMoreDiscounts(instance)
	{
		$('.discounts-panel__card').addClass('active')
		$(instance).hide()
	},
	/**
	 * Добавляем в избранное (анимация)
	 */
	saveFavorites(instance)
	{
		$(instance).toggleClass('active')
	},
	/**
	 * Показать, остальные пункты в sidebar-menu
	 */
	sidebarMenuShowOther(instance)
	{
		let instanceParent = $(instance).parent().parent();

		(instanceParent.hasClass('sidebar-menu')) ?
		$(instance).parent().siblings('.catalog-menu__item').show() :
		$(instance).parent().siblings('.catalog-menu__item').css('display', 'flex');

		$(instance).removeClass('sidebar-menu--btn-active');
		$(instance).siblings('.sidebar-menu__hide').addClass('sidebar-menu--btn-active');
	},
	/**
	 * Скрыть, остальные пункты в sidebar-menu
	 */
	sidebarButtonsHide()
	{
		$('.sidebar-menu').each(function()
		{
			let menuItems = $(this).children('.catalog-menu__item');
			if(menuItems.length < 6)
			{
				$(this).children('.sidebar-menu__buttons').hide()
			}
		})
	},
	sidebarMenuHideOther(instance)
	{
		let instanceParent = $(instance).parent().parent();

		(instanceParent.hasClass('sidebar-menu')) ?
		$(instance).parent().siblings('.catalog-menu__item:nth-child(n+7)').hide() :
		$(instance).parent().siblings('.catalog-menu__item:nth-child(n+11)').hide();

		$(instance).removeClass('sidebar-menu--btn-active');
		$(instance).siblings('.sidebar-menu__show').addClass('sidebar-menu--btn-active');
	},
	/**
	 * Показать, скрыть список категорий в каталоге
	 */
	mainCatalogMenuShow()
	{
		$('.catalog__wr').addClass('catalog__wr--menu-active');
		$('html').scrollTop(0).css('overflow', 'hidden');
	},
	mainCatalogMenuHide()
	{
		$('.catalog__wr').removeClass('catalog__wr--menu-active');
		$('html').css('overflow', 'auto');
	},
	/**
	 * Показать, скрыть блоки фильтров
	 */
	filterBlockClose(instance)
	{
		$(instance).parent().toggleClass('catalog-filter__block--close');
	},
	/**
	 * Сортировка по цене
	 */
	filterSortpprice(instance)
	{
		$(instance).toggleClass('catalog-filter__sort-price--down');
	},
	detailInfo(instance)
	{
		$(instance).siblings('.detail-description__info').toggleClass('detail-description__info--shadow');
	},
	/**
	 * Показать, скрыть текст описания товара
	 */
	showHideMoreBtn(btn)
	{
		$(btn).each((i, elem) =>
		{
			if($(elem).height() > 287)
			{
				$('.detail-description__more-btn').removeClass('detail-description__more-btn--hide')
				$(elem).addClass('detail-description__info--shadow');
			}
		});

		$('b').each(function()
		{
			if($(this).text() === 'Фармакологическое действие')
			{
				$(this).addClass('detail-description--mb');
			}
		})
	},
	showItems(instance)
	{
		$(instance).hide().siblings().show();
	},
	hideItems(instance, quantity)
	{
		$(instance).hide().siblings(`:nth-child(n+${quantity})`).hide();
		$(instance).prev().show()
	},
	/**
	 * Показать, скрыть карту
	 */
	showHideMap()
	{
		$('.checkout-addresses__map').toggleClass('checkout-addresses__map--active');
		$('.checkout-addresses__show-map').toggleClass('checkout-addresses__show-map--active');
		$('.checkout-addresses__body').toggleClass('checkout-addresses__body--hide');
	},
	hideElem(instance, className)
	{
		$(instance).parents(`div.${className}`).hide();
	}
};






