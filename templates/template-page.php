<?php
	namespace CRD\Core;

	$resources = $template->resources;
	$html = $template->html;
	$app = $template->view->app;

?><!doctype html>
<html lang="<?= $html->entities($resources->locale) ?>">
	<head>
		<meta charset="utf-8">
		<title><?= $html->entities(((!empty($template->title))? $template->title . ' — ' : '') . $app->name) ?></title>

		<!-- Handheld support -->
		<meta name="viewport" content="width=device-width, initial-scale=1">

		<!-- CSS includes -->
		<link href="/assets/css/base.css?cache=<?= urlencode($app->version) ?>" rel="stylesheet" media="all">
		
		<!-- Initialise advanced UI -->
		<script>document.documentElement.className = 'advanced wf-loading';</script>
	</head>
	<body class="<?= $html->entities($template->page) ?>">

<?= $template->content('navigation') ?>

		<div id="container">
<?= $template->content('main') ?>
		</div>
		
		<!-- Script includes -->
		<script src="/assets/js/launcher.js?cache=<?= urlencode($app->version) ?>"></script>
		
		<!-- Google Analytics -->
		<script>
		
			// set up account
			var _gaq = [['_setAccount', 'UA-2204911-2']];
			
			// track page view
			_gaq.push(['_trackPageview']);
			
			(function()
			{
				var ga = document.createElement('script');
				ga.async = true; ga.src = "//www.google-analytics.com/ga.js";
	
				var s = document.getElementsByTagName('script')[0];
				s.parentNode.insertBefore(ga, s);
			})();
		
		</script>
	</body>
</html>