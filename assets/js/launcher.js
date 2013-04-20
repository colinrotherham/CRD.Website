/*
	Menu toggle
	----------------------------------- */

	(function()
	{
		function toggle()
		{
			menu.toggleClass('toggle');
		}

		var menu = $('#nav');
		var button = menu.children('button');

		// Toggle when clicked
		button.click(toggle);
	})();