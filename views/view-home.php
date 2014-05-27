<?php
	$template = $view->template;

	$template->title = 'Interaction design and web development';

	$template->placeHolderPartial('navigation', 'navigation');
	$template->placeHolder('main');
?>
			<h1>Colin Rotherham. Interaction Designer</h1>

			<div id="message">
				<h2>Get in touch</h2>

				<p>Telephone: 07792 348187<br>
				Email: <a id="email">#####@colinr.com</a></p>

				<p><a href="https://twitter.com/colinrotherham">Twitter</a> /
				<a href="https://github.com/colinrotherham">GitHub</a> /
				<a href="https://dribbble.com/colinrotherham">Dribbble</a></p>
			</div>
<?php
	$template->placeHolderEnd();
?>
