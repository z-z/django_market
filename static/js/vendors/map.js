// $(document).ready(
//    function()
//    {
//    		ymaps.ready(init);

// 		function init()
// 		{
// 			let placeOptions =
// 			{
// 				// Опции.
// 				// Необходимо указать данный тип макета.
// 				iconLayout: 'default#imageWithContent',
// 				// Своё изображение иконки метки.
// 				iconImageHref: '/front/img/svg-for-sprite/point-big.svg',
// 				// Размеры метки.
// 				iconImageSize: [28, 28],
// 				// Смещение левого верхнего угла иконки относительно
// 				// её "ножки" (точки привязки).
// 				iconImageOffset: [0, 0],
// 				// Смещение слоя с содержимым относительно слоя с картинкой.
// 				iconContentOffset: [15, 15],
// 				balloonPanelMaxMapArea:0
// 			}

// 			let center = [43.01944042552379,44.674822233135245];

// 			let myMap = new ymaps.Map('map',
// 			{
// 				center: center,
// 				zoom: 17
// 			}),
// 			objectManager = new ymaps.ObjectManager({
// 				clusterize: true,
// 				gridSize: 32
// 			});
// 			// objectManager.objects.options.set('preset', 'islands#greenDotIcon');
// 			// objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');
// 			myMap.geoObjects.add(objectManager);

// 			objectManager.add(
// 			{
// 				"type": "FeatureCollection",
// 				"features":
// 				[
// 					{
// 						"type": "Feature",
// 						"id": 4949,
// 						"geometry":
// 						{
// 							"type": "Point",
// 							"coordinates": [43.019462,44.674782]
// 						},

// 						"options":
// 						{
// 							...placeOptions
// 						}
// 					},
// 					{
// 						"type": "Feature",
// 						"id": 4947,
// 						"geometry":
// 						{
// 							"type": "Point",
// 							"coordinates": [43.048148,44.656645]
// 						},
// 						"options":
// 						{
// 							...placeOptions
// 						}
// 					},
// 					{
// 						"type": "Feature",
// 						"id": 4948,
// 						"geometry":
// 						{
// 							"type": "Point",
// 							"coordinates": [43.055852,44.64504]
// 						},

// 						"options":
// 						{
// 							...placeOptions
// 						}
// 					},
// 				]
// 			});

// 			//Функция, связывающая метку со списком адресов
// 			function viewObject(objectId)
// 			{
// 				// Удаляем со всего списка класс active затем добавляем к выранному
// 				$('[data-objectId]').removeClass('active');
// 				$('[data-objectId='+objectId+']').addClass('active');

// 				// Задаем маленькую иконку всем меткам
// 				objectManager.objects.each(function (item)
// 				{
// 					objectManager.objects.setObjectOptions(item.id,
// 					{
// 						iconImageHref: '/front/img/svg-for-sprite/point.svg',
// 						iconImageSize: [24, 24]
// 					});
// 				});

// 				// Задаем большую иконку выбранной метке
// 				objectManager.objects.setObjectOptions(objectId,
// 				{
// 					iconImageHref: '/front/img/svg-for-sprite/point-big.svg',
// 					iconImageSize: [63, 62],
// 					iconImageOffset: [-47	, -73]
// 				});

// 				// Центруем по метке
// 				myMap.panTo(objectManager.objects.getById(objectId).geometry.coordinates, 15,
// 				{
// 					checkZoomRange: true,
// 				});
// 			}

// 			//Клик в списке
// 			$(document).on('click', '[data-objectId]', function()
// 			{
// 				let objectId=$(this).attr('data-objectId');
// 				viewObject(objectId);
// 			});

// 			//Клик по метке в карте
// 			objectManager.objects.events.add('click', function (e)
// 			{
// 				var objectId = e.get('objectId');
// 				viewObject(objectId);
// 			});

// 			//Удаляем ненужные элементы с карты
// 			myMap.controls.remove('fullscreenControl)');
// 			myMap.controls.remove('rulerControl)');
// 			myMap.controls.remove('searchControl');
// 			myMap.controls.remove('trafficControl');
// 			myMap.controls.remove('typeSelector');
// 		}
//    }
// )