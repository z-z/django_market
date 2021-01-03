var o2Anim =
{
	/**
	* контроллер scrollMagic, следит за скроллом на странице и тригерит сцены
	*/
	scrollMagicController: null,

	/**
	* инициализация объект, проходимся по массиву со сценами и регистрируем их в scrollMagicController
	*/
	init()
	{
		this.scrollMagicController = new ScrollMagic.Controller();

		for (var i = 0; i < this.scenesList.length; i++)
		{
			const scene = this.scenesList[i];
			if(!$(scene.element).length)
				continue;

			if(typeof scene.type != 'undefined' && scene.type == 'list')
			{
				const scenes = $(scene.element);
				for (var j = 0; j < scenes.length; j++)
				{
					this.createScene(scenes[j], scene);
				}
			}
			else
			{
				this.createScene($(scene.element)[0], scene);
			}
		}
	},

	/**
	* последняя запущенная анимация
	*/
	lastAnimation: null,

	/**
	* базовая анимация
	*/
	baseAnim:
	{
		duration: 580,
		translateY: ['80px', 0],
		easing: 'linear',
		opacity: [0, 1],
		autoplay: true,
	},

	firstAnims: 0,
	getDelayForFirstAnims()
	{
		let delay = 450;
		this.firstAnims++;

		if(!o2Anim.lastAnimation.completed)
			return this.firstAnims * delay;

		return 0;
	},
	/**
	* массив со сценами и их обработчиками
	*/
	scenesList: [
		/** объект с параметрами для сцены scroll magick
		* поддерживаются все свойства из scroll magick
		* отдельные обработчикиа типа setPin добавляются в методе createScene
		*/
		{
			element: '.header-r-content-percents',
			offset: '150',
			triggerHook: 0,
			reverse: true,
			onEnter: function (element) {
				$('.sticky-header-values').addClass('sticky-header-values_percents');
			},
			onLeave: function () {
				$('.sticky-header-values').removeClass('sticky-header-values_percents');
			}
		},
	],

	/**
	* создание и регистрация сцены
	*/
	createScene(element, options)
	{
		const scene = new ScrollMagic.Scene({
			triggerElement: element,
			triggerHook: 1,
			reverse: false,
			...options,
		})
		.on('enter', (e) => {
			if(options.onEnter)
				options.onEnter(e.target.triggerElement());
		})
		.on('leave', (e) => {
			if(options.onLeave)
				options.onLeave(e.target.triggerElement());
		})

		if(options.setPin)
			scene.setPin(options.setPin);

		scene.addTo(this.scrollMagicController);
	},
}