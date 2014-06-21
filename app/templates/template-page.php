<?php
	global $app, $router;

	$resources = $template->resources;
	$html = $template->html;
	$bag = $template->bag;

?><!doctype html>
<html lang="<?= $html->entities($resources->locale) ?>">
	<head>
		<meta charset="utf-8">
		<title><?= $html->entities(((!empty($template->title))? $template->title . ' — ' : '') . $bag->name) ?></title>

		<!-- Handheld support -->
		<meta name="viewport" content="width=device-width, initial-scale=1">

		<!-- CSS include -->
		<style><?php require_once($app->path . '/assets/css/combined.min.css'); ?></style>

		<!-- Initialise advanced UI -->
		<script>document.documentElement.className = 'advanced wf-loading';</script>
	</head>
	<body class="<?= $html->entities($template->page) ?>">

<?= $template->content('navigation') ?>

		<div id="container">
<?= $template->content('main') ?>
		</div>

		<!-- Script include -->
		<script><?php require_once($app->path . '/assets/js/combined.min.js'); ?></script>
	</body>
</html>