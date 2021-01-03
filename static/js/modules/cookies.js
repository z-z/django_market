// работа с куками
const o2Cookie =
{
	/**
	* set cookie
	*/
	set(name, value, options)
	{
		options = options || {};
		let updatedCookie = name + "=" + value;
		for (const propName in options)
		{
			updatedCookie += "; " + propName;
			const propValue = options[propName];
			if (propValue !== true)
			{
				updatedCookie += "=" + propValue;
			}
		}
		document.cookie = updatedCookie;
	},
	/**
	* get cookie by name
	*/
	get(name)
	{
		const matches = document.cookie.match(new RegExp(
			"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	},

	/**
	* delete cookie
	*/
	delete:function(name)
	{
		document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}
};