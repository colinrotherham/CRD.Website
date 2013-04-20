<?
	namespace CRD\Core;

	$resources = $this->resources;
	$html = $this->html;
	$app = $this->view->app;

?><!doctype html>
<html lang="<?= $html->entities($resources->locale) ?>">
	<head>
		<meta charset="utf-8">
		<title><?= $html->entities(((!empty($this->title))? $this->title . ' — ' : '') . $app->name) ?></title>

		<!-- Handheld support -->
		<meta name="viewport" content="width=device-width, initial-scale=1">

		<!-- CSS includes -->
		<link href="/assets/css/base.css?cache=<?= urlencode($app->version) ?>" rel="stylesheet" media="all">
		
		<!-- Initialise advanced UI -->
		<script>document.documentElement.className = 'advanced';</script>
	</head>
	<body class="<?= $html->entities($this->name) ?>">

<?= $this->content('navigation') ?>

		<div id="container">
<?= $this->content('main') ?>
		</div>
		
		<!-- Script includes -->
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
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