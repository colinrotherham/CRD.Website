<?
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
				<p>Twitter: <a href="https://twitter.com/colinrotherham">@colinrotherham</a><br>
				GitHub: <a href="https://github.com/colinrotherham">@colinrotherham</a></p>
			</div>
<?
	$template->placeHolderEnd();
?>
