/**
 
 * Builds the site footer element.
 
 */
export function buildFooter() {
    const footerElement = document.querySelector("footer");

    footerElement.innerHTML = 
   `<nav>
		  <ul>
			  <li>
			    <a href="#">Mentions Légales</a>
			  </li>
		  </ul>
	  </nav>`
}