/**
 
 * Builds the site header element.
 
 */
export function buildHeader() {
  const headerElement = document.querySelector("header");

  headerElement.innerHTML = 
 `<a href="./index.html"><h1>Sophie Bluel <span>Architecte d'intérieur</span></h1></a>
  <nav>
		<ul>
			<li>
			<a href="index.html#portfolio">projets</a>
			</li>
			<li>
			<a href="index.html#contact">contact</a>
			</li>
			<li>
			 <a class='login' href="/FrontEnd/login.html">login</a>
			</li>
			<li>
			<a href="#"><img src="./assets/icons/instagram.png" alt="Instagram"></a>
			</li>
		</ul>
	</nav>`;

	// Display the login link in semi-bold when active
	const aLoginElement = document.querySelector('nav .login');

	const aLoginhref = aLoginElement.getAttribute('href');
	const currentUrl = window.location.pathname

	if (currentUrl === aLoginhref) {
		aLoginElement.classList.add("selected");
	}
}
